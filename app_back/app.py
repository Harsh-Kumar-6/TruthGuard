from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, Union
from pathlib import Path
import shutil, os
from app_back.pipeline import analyze_text_image  # your pipeline function

app = FastAPI(title="Misinformation Detection API")

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins= ["http://localhost:5173", "http://localhost:3000", "https://your-netlify-site.netlify.app"], # your React dev URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze/")
async def analyze(
    text: Optional[str] = Form(None),
    image: Optional[Union[UploadFile, str]] = File(None)  # Accept string too
):
    if not text and not image:
        return JSONResponse(
            content={"error": "Please provide at least text or an image."},
            status_code=400
        )

    image_path = None

    # Only save if a real file was uploaded
    if isinstance(image, UploadFile):
        image_path = UPLOAD_DIR / image.filename
        with open(image_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

    # Call the analysis pipeline
    result = await analyze_text_image(
        text=text or "",
        image_path=str(image_path) if image_path else None
    )

    # Clean up uploaded image
    if image_path and os.path.exists(image_path):
        os.remove(image_path)

    return JSONResponse(content=result)

