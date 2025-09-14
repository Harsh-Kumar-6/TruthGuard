import joblib
import re
import datetime
import logging
from PIL import Image
from urllib.parse import urlencode
import torch
import asyncio
import aiohttp
from transformers import BlipProcessor, BlipForConditionalGeneration
from sentence_transformers import SentenceTransformer
import google.generativeai as genai
import os

# -----------------------------
# === Load pretrained models ===
# -----------------------------
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
blip_model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")
sent_model = SentenceTransformer('all-MiniLM-L6-v2')
BASE_DIR = os.path.dirname(__file__)
clf = joblib.load(os.path.join(BASE_DIR, "classifier.pkl"))

# -----------------------------
# === API Keys / Config ===
# -----------------------------
FACTCHECK_API_KEY = "f44a6802b042c740517ec8ec1e4d6c58a60da2d4"
BASE_URL = "https://factchecktools.googleapis.com/v1alpha1/claims:search"

genai.configure(api_key="AIzaSyBsAmgmy6_IUKLpvgRUAZMpu0nZ9m9K3Wg")
gemma_model = genai.GenerativeModel("gemini-2.5-flash")

NEWS_API_KEY = "ebeab8b4f22149c385d35e05422788d0"
NEWS_URL = "https://newsapi.org/v2/everything"

logging.basicConfig(level=logging.INFO)

# -----------------------------
# === Helper Functions ===
# -----------------------------
def image_to_caption(img_path: str) -> str:
    try:
        raw_image = Image.open(img_path).convert("RGB").resize((384,384))
        inputs = processor(raw_image, return_tensors="pt")
        with torch.no_grad():
            out = blip_model.generate(**inputs)
        return processor.decode(out[0], skip_special_tokens=True)
    except Exception as e:
        logging.warning(f"Image captioning failed: {e}")
        return ""

def classify_with_model(text: str):
    emb = sent_model.encode([text])
    pred = clf.predict(emb)[0]
    conf = max(clf.predict_proba(emb)[0])
    label = "trustworthy" if pred == 1 else "misinformation"
    return {"label": label, "confidence": conf}

def classify_with_gemma(text: str, news_context=None):
    try:
        context_str = ""
        if news_context:
            context_str = "Recent news:\n" + "\n".join(f"- {n['title']} ({n['source']})" for n in news_context)

        prompt = f"""
        You are a misinformation detection AI.
        Analyze the following text and:
        1. Classify it as either "trustworthy" or "misinformation or need verification".
        2. Give a detailed reason for your classification in JSON format.
        3. If possible, do a web search to find news articles that support or refute the claim.

        {context_str}
        Claim: {text}
        """
        resp = gemma_model.generate_content(prompt)
        raw_text = resp.text.strip().lower()

        label = "needs_verification"
        conf = 0.5
        if "misinformation" in raw_text:
            label = "misinformation"
            conf = 0.9
        elif "trustworthy" in raw_text:
            label = "trustworthy"
            conf = 0.9

        reason_match = re.split(r"\btrustworthy\b|\bmisinformation\b", resp.text, flags=re.IGNORECASE)
        reason = reason_match[-1].strip() if len(reason_match) > 1 else "No detailed reason provided."

        return {"label": label, "confidence": conf, "reason": reason, "news_context": news_context or []}

    except Exception as e:
        logging.warning(f"Gemma classification failed: {e}")
        return {"label": "needs_verification", "confidence": 0.5, "reason": f"Gemma failed: {e}", "news_context": []}

async def async_factcheck_search(query: str, language_code="en", page_size=4):
    params = {
        "query": query,
        "languageCode": language_code,
        "pageSize": page_size,
        "key": FACTCHECK_API_KEY,
    }
    url = f"{BASE_URL}?{urlencode(params)}"
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as r:
                r.raise_for_status()
                data = await r.json()
    except Exception as e:
        logging.warning(f"FactCheck API failed: {e}")
        return []

    results = []
    for c in data.get("claims", []):
        for r_ in c.get("claimReview", []):
            results.append({
                "text": c.get("text"),
                "claimDate": c.get("claimDate"),
                "publisher": r_["publisher"]["name"],
                "url": r_["url"],
                "title": r_["title"],
                "rating": r_["textualRating"]
            })
    return results

async def async_live_news_lookup(query: str, page_size=5):
    params = {"q": query, "apiKey": NEWS_API_KEY, "pageSize": page_size, "language": "en"}
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(NEWS_URL, params=params) as r:
                r.raise_for_status()
                data = await r.json()
        return [{"title": a["title"], "url": a["url"], "source": a["source"]["name"]} for a in data.get("articles", [])]
    except Exception as e:
        logging.warning(f"News API failed: {e}")
        return []

def verdict_to_score(verdict: str) -> float:
    if not verdict: return 0.5
    v = verdict.lower()
    positive = ["true", "correct", "mostly true"]
    negative = ["false", "fake", "pants on fire", "misleading"]
    if any(p in v for p in positive): return 1.0
    if any(n in v for n in negative): return 0.0
    return 0.5

def aggregate_factcheck(factchecks):
    if not factchecks: return 0.5
    scores = [verdict_to_score(fc.get("rating")) for fc in factchecks]
    if any(s == 0.0 for s in scores): return 0.0
    if any(s == 1.0 for s in scores): return 1.0
    return sum(scores) / len(scores)

def is_time_sensitive(text: str) -> bool:
    current_year = datetime.datetime.now().year
    if re.search(rf"\b{current_year}\b|\b{current_year-1}\b", text):
        return True
    if re.search(r"\b(today|yesterday|last week|this month|recently)\b", text, re.I):
        return True
    return False

# -----------------------------
# === Main Pipeline (async) ===
# -----------------------------
async def analyze_text_image(text: str = "", image_path: str = None):
    caption = image_to_caption(image_path) if image_path else ""
    combined_text = (text + " " + caption).strip()
    recent_claim = is_time_sensitive(combined_text)

    # Run fact-check and news lookup concurrently
    fact_task = async_factcheck_search(combined_text)
    news_task = async_live_news_lookup(combined_text) if recent_claim else asyncio.sleep(0, result=[])
    fact_results, recent_news = await asyncio.gather(fact_task, news_task)

    fact_score = aggregate_factcheck(fact_results)
    model_out = classify_with_model(combined_text)
    gemma_out = classify_with_gemma(combined_text, news_context=recent_news[:3] if recent_news else None)

    # Weighted ensemble
    w_ml, w_gemma, w_news = 0.5, 0.3, 0.2
    if recent_claim and recent_news:
        w_news += 0.2
        w_ml -= 0.1
        w_gemma -= 0.1

    w_ml *= model_out["confidence"]
    w_gemma *= gemma_out.get("confidence", 0.5)
    total_weight = w_ml + w_gemma + w_news
    ensemble_score = ((1.0 if model_out["label"]=="trustworthy" else 0.0)*w_ml +
                      (1.0 if gemma_out["label"]=="trustworthy" else 0.0)*w_gemma +
                      (1.0 if recent_news else 0.5)*w_news) / total_weight if total_weight>0 else 0.5

    # Final label
    if fact_score == 1.0:
        final_label = "trustworthy"
        reason = "Verified by fact-check sources."
    elif fact_score == 0.0:
        final_label = "misinformation"
        reason = "Debunked by fact-check sources."
    elif recent_claim and recent_news:
        final_label = "trustworthy"
        reason = f"Recent claim verified by live news: {recent_news[0]['title']} ({recent_news[0]['source']})"
    else:
        if ensemble_score >= 0.7:
            final_label = "trustworthy"
        elif ensemble_score <= 0.3:
            final_label = "misinformation"
        else:
            final_label = "needs_review"
        reason = f"Weighted ensemble score={ensemble_score:.2f}"

    combined_news = recent_news.copy()
    for n in gemma_out.get("news_context", []):
        if n not in combined_news:
            combined_news.append(n)

    return {
        "label": final_label,
        "model": model_out,
        "gemma": gemma_out,
        "fact_checks": fact_results[:4],
        "news": combined_news[:5],
        "reason": reason
    }

# import joblib
# import re
# import datetime
# import logging
# from PIL import Image
# from urllib.parse import urlencode
# import torch
# import asyncio
# import aiohttp
# from transformers import BlipProcessor, BlipForConditionalGeneration
# from sentence_transformers import SentenceTransformer
# import google.generativeai as genai

# # -----------------------------
# # === Load pretrained models ===
# # -----------------------------
# processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
# blip_model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")
# sent_model = SentenceTransformer('all-MiniLM-L6-v2')
# clf = joblib.load("classifier.pkl")

# # -----------------------------
# # === API Keys / Config ===
# # -----------------------------
# FACTCHECK_API_KEY = "f44a6802b042c740517ec8ec1e4d6c58a60da2d4"
# BASE_URL = "https://factchecktools.googleapis.com/v1alpha1/claims:search"

# genai.configure(api_key="AIzaSyBsAmgmy6_IUKLpvgRUAZMpu0nZ9m9K3Wg")
# gemma_model = genai.GenerativeModel("gemini-2.5-flash")

# NEWS_API_KEY = "ebeab8b4f22149c385d35e05422788d0"
# NEWS_URL = "https://newsapi.org/v2/everything"

# logging.basicConfig(level=logging.INFO)

# # -----------------------------
# # === Helper Functions ===
# # -----------------------------
# def image_to_caption(img_path: str) -> str:
#     try:
#         raw_image = Image.open(img_path).convert("RGB").resize((384,384))
#         inputs = processor(raw_image, return_tensors="pt")
#         with torch.no_grad():
#             out = blip_model.generate(**inputs)
#         return processor.decode(out[0], skip_special_tokens=True)
#     except Exception as e:
#         logging.warning(f"Image captioning failed: {e}")
#         return ""

# def classify_with_model(text: str):
#     emb = sent_model.encode([text])
#     pred = clf.predict(emb)[0]
#     conf = max(clf.predict_proba(emb)[0])
#     label = "trustworthy" if pred == 1 else "misinformation"
#     return {"label": label, "confidence": conf}

# def classify_with_gemma(text: str, news_context=None):
#     try:
#         context_str = ""
#         if news_context:
#             context_str = "Recent news context:\n" + "\n".join(f"- {n['title']} ({n['source']})" for n in news_context)

#         prompt = f"""
#         You are an expert misinformation detection AI. Analyze the following text thoroughly and provide a detailed assessment.
        
#         {context_str}
        
#         Text to analyze: {text}
        
#         Please provide:
#         1. A clear classification (trustworthy, misinformation, or needs_verification)
#         2. A detailed explanation of your reasoning with specific points
#         3. Key factors that influenced your decision
#         4. Any red flags or supporting evidence you found
        
#         Structure your response to be clear and informative for users who want to understand why you reached this conclusion.
#         """
        
#         resp = gemma_model.generate_content(prompt)
#         response_text = resp.text.strip()
#         raw_text_lower = response_text.lower()

#         # Determine label based on response
#         label = "needs_verification"
#         conf = 0.5
        
#         if "misinformation" in raw_text_lower or "false" in raw_text_lower or "misleading" in raw_text_lower:
#             label = "misinformation"
#             conf = 0.85
#         elif "trustworthy" in raw_text_lower or "accurate" in raw_text_lower or "reliable" in raw_text_lower:
#             label = "trustworthy"
#             conf = 0.85
#         elif "needs verification" in raw_text_lower or "uncertain" in raw_text_lower:
#             label = "needs_verification"
#             conf = 0.6

#         # Clean up the reasoning text
#         reason = response_text.strip()
        
#         # Format the reasoning for better readability
#         if not reason.startswith("**") and not reason.startswith("Analysis"):
#             reason = f"**Analysis Summary**: {reason}"

#         return {
#             "label": label, 
#             "confidence": conf, 
#             "reason": reason,
#             "news_context": news_context or []
#         }

#     except Exception as e:
#         logging.warning(f"Gemma classification failed: {e}")
#         return {
#             "label": "needs_verification", 
#             "confidence": 0.5, 
#             "reason": f"**Analysis Error**: Unable to complete full analysis due to technical issues: {e}. Manual verification recommended.",
#             "news_context": []
#         }

# async def async_factcheck_search(query: str, language_code="en", page_size=4):
#     params = {
#         "query": query,
#         "languageCode": language_code,
#         "pageSize": page_size,
#         "key": FACTCHECK_API_KEY,
#     }
#     url = f"{BASE_URL}?{urlencode(params)}"
#     try:
#         async with aiohttp.ClientSession() as session:
#             async with session.get(url) as r:
#                 r.raise_for_status()
#                 data = await r.json()
#     except Exception as e:
#         logging.warning(f"FactCheck API failed: {e}")
#         return []

#     results = []
#     for c in data.get("claims", []):
#         for r_ in c.get("claimReview", []):
#             results.append({
#                 "text": c.get("text", ""),
#                 "claimDate": c.get("claimDate"),
#                 "publisher": r_["publisher"]["name"],
#                 "url": r_["url"],
#                 "title": r_["title"],
#                 "rating": r_["textualRating"]
#             })
#     return results

# async def async_live_news_lookup(query: str, page_size=5):
#     params = {
#         "q": query, 
#         "apiKey": NEWS_API_KEY, 
#         "pageSize": page_size, 
#         "language": "en",
#         "sortBy": "relevancy"
#     }
#     try:
#         async with aiohttp.ClientSession() as session:
#             async with session.get(NEWS_URL, params=params) as r:
#                 r.raise_for_status()
#                 data = await r.json()
        
#         articles = []
#         for article in data.get("articles", []):
#             if article.get("title") and article.get("source"):
#                 articles.append({
#                     "title": article["title"],
#                     "url": article.get("url", ""),
#                     "source": article["source"]["name"],
#                     "publishedAt": article.get("publishedAt"),
#                     "description": article.get("description", "")
#                 })
#         return articles
        
#     except Exception as e:
#         logging.warning(f"News API failed: {e}")
#         return []

# def verdict_to_score(verdict: str) -> float:
#     if not verdict: 
#         return 0.5
#     v = verdict.lower()
#     positive_terms = ["true", "correct", "mostly true", "accurate", "verified"]
#     negative_terms = ["false", "fake", "pants on fire", "misleading", "debunked", "incorrect"]
    
#     if any(p in v for p in positive_terms): 
#         return 1.0
#     if any(n in v for n in negative_terms): 
#         return 0.0
#     return 0.5

# def aggregate_factcheck(factchecks):
#     if not factchecks: 
#         return 0.5
#     scores = [verdict_to_score(fc.get("rating")) for fc in factchecks]
#     if any(s == 0.0 for s in scores): 
#         return 0.0
#     if any(s == 1.0 for s in scores): 
#         return 1.0
#     return sum(scores) / len(scores)

# def is_time_sensitive(text: str) -> bool:
#     current_year = datetime.datetime.now().year
#     if re.search(rf"\b{current_year}\b|\b{current_year-1}\b", text):
#         return True
#     if re.search(r"\b(today|yesterday|last week|this month|recently|breaking|latest)\b", text, re.I):
#         return True
#     return False

# def format_final_reason(label: str, fact_score: float, model_out: dict, gemma_out: dict, 
#                        fact_results: list, recent_news: list, ensemble_score: float, recent_claim: bool):
#     """
#     Create a comprehensive, well-formatted reason for the analysis result
#     """
#     reasons = []
    
#     # Start with the primary classification reason
#     if fact_score == 1.0:
#         reasons.append("**Verified by Fact-Checkers**: Multiple reputable fact-checking organizations have verified this information as accurate.")
#         if fact_results:
#             top_fact = fact_results[0]
#             reasons.append(f"Primary verification from {top_fact['publisher']}: \"{top_fact['rating']}\"")
            
#     elif fact_score == 0.0:
#         reasons.append("**Debunked by Fact-Checkers**: This information has been identified as false or misleading by established fact-checking organizations.")
#         if fact_results:
#             top_fact = fact_results[0]
#             reasons.append(f"Key debunking from {top_fact['publisher']}: \"{top_fact['rating']}\"")
            
#     elif recent_claim and recent_news:
#         reasons.append("**Current News Verification**: This appears to be a recent claim that has been covered by legitimate news sources.")
#         if recent_news:
#             reasons.append(f"Recent coverage includes: \"{recent_news[0]['title']}\" from {recent_news[0]['source']}")
            
#     # Add AI model insights
#     if gemma_out.get("reason") and not gemma_out["reason"].startswith("**Analysis Error**"):
#         ai_reason = gemma_out["reason"].strip()
#         if ai_reason and not any(existing in ai_reason for existing in reasons):
#             reasons.append("**AI Analysis**: " + ai_reason)
    
#     # Add ensemble scoring context
#     if label == "needs_review":
#         reasons.append(f"**Mixed Signals**: Our analysis shows conflicting indicators (confidence score: {ensemble_score:.0%}). This content requires additional human verification.")
        
#         # Add specific model disagreements
#         model_agrees = model_out["label"] == gemma_out.get("label", "")
#         if not model_agrees:
#             reasons.append(f"**Model Disagreement**: Machine learning model suggests '{model_out['label']}' while language analysis suggests '{gemma_out.get('label', 'uncertain')}'.")
    
#     # Add verification suggestions for uncertain cases
#     if label in ["needs_review", "needs_verification"]:
#         reasons.append("**Recommended Actions**: Cross-reference with multiple authoritative sources, check publication dates, and verify author credentials before sharing.")
    
#     return "\n\n".join(reasons) if reasons else "Analysis completed with standard verification protocols."

# # -----------------------------
# # === Main Pipeline (async) ===
# # -----------------------------
# async def analyze_text_image(text: str = "", image_path: str = None):
#     """
#     Enhanced analysis pipeline with structured output for frontend
#     """
#     # Process image if provided
#     caption = image_to_caption(image_path) if image_path else ""
#     combined_text = (text + " " + caption).strip()
    
#     if not combined_text:
#         return {
#             "error": "No text provided for analysis",
#             "errorType": "input_error"
#         }
    
#     # Determine if this is time-sensitive content
#     recent_claim = is_time_sensitive(combined_text)

#     # Run fact-check and news lookup concurrently
#     try:
#         fact_task = async_factcheck_search(combined_text)
#         news_task = async_live_news_lookup(combined_text) if recent_claim else asyncio.sleep(0, result=[])
#         fact_results, recent_news = await asyncio.gather(fact_task, news_task)
#     except Exception as e:
#         logging.error(f"API calls failed: {e}")
#         fact_results, recent_news = [], []

#     # Get AI model predictions
#     model_out = classify_with_model(combined_text)
#     gemma_out = classify_with_gemma(combined_text, news_context=recent_news[:3] if recent_news else None)

#     # Calculate fact-check score
#     fact_score = aggregate_factcheck(fact_results)

#     # Enhanced ensemble scoring
#     w_ml, w_gemma, w_fact = 0.4, 0.4, 0.2
    
#     # Adjust weights based on available information
#     if fact_results:
#         w_fact = 0.4
#         w_ml = 0.3
#         w_gemma = 0.3
    
#     if recent_claim and recent_news:
#         w_fact += 0.1
        
#     # Calculate weighted ensemble score
#     ml_score = 1.0 if model_out["label"] == "trustworthy" else 0.0
#     gemma_score = 1.0 if gemma_out["label"] == "trustworthy" else (0.0 if gemma_out["label"] == "misinformation" else 0.5)
    
#     ensemble_score = (ml_score * w_ml * model_out["confidence"] + 
#                      gemma_score * w_gemma * gemma_out["confidence"] + 
#                      fact_score * w_fact) / (w_ml * model_out["confidence"] + w_gemma * gemma_out["confidence"] + w_fact)

#     # Determine final label with enhanced logic
#     if fact_score == 1.0:
#         final_label = "trustworthy"
#     elif fact_score == 0.0:
#         final_label = "suspicious"
#     elif recent_claim and recent_news and len(recent_news) >= 2:
#         final_label = "trustworthy"
#     else:
#         if ensemble_score >= 0.75:
#             final_label = "trustworthy"
#         elif ensemble_score <= 0.3:
#             final_label = "suspicious"
#         else:
#             final_label = "needs_review"

#     # Create comprehensive reason
#     formatted_reason = format_final_reason(
#         final_label, fact_score, model_out, gemma_out, 
#         fact_results, recent_news, ensemble_score, recent_claim
#     )

#     # Structure the response for the frontend
#     return {
#         "label": final_label,
#         "confidence": ensemble_score,
#         "credibility_score": int(ensemble_score * 100),
#         "reason": formatted_reason,
#         "model": {
#             "label": model_out["label"],
#             "confidence": model_out["confidence"]
#         },
#         "gemma": {
#             "label": gemma_out["label"],
#             "confidence": gemma_out["confidence"],
#             "reason": gemma_out.get("reason", ""),
#             "suggested_checks": [
#                 "Cross-reference with multiple reputable news sources",
#                 "Check for scientific consensus on the topic", 
#                 "Verify with established fact-checking organizations",
#                 "Look for primary source documentation",
#                 "Consult expert opinions in the relevant field"
#             ] if final_label == "needs_review" else []
#         },
#         "fact_checks": fact_results[:4],  # Limit to 4 most relevant
#         "news": recent_news[:5],  # Limit to 5 most relevant
#         "analysis_timestamp": datetime.datetime.now().isoformat(),
#         "word_count": len(combined_text.split()),
#         "time_sensitive": recent_claim
#     }