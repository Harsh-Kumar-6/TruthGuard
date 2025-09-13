import React, { useState } from 'react';
import { CheckCircle, Search, Scale, Eye, AlertTriangle } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const TruthGuardApp = () => {
  const [flippedCards, setFlippedCards] = useState({});
  const navigate = useNavigate();
    const handleGetStarted = () => {
      navigate("/truthGuard");  // this changes the URL and opens new page
    };

  const toggleCard = (cardId) => {
    setFlippedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const checklistItems = [
    {
      icon: <CheckCircle className="w-6 h-6 text-green-400" />,
      title: "Verify the source",
      description: "Check the credibility of the website or author.",
    },
    {
      icon: <Search className="w-6 h-6 text-green-400" />,
      title: "Examine the evidence",
      description: "Look for supporting facts and data.",
    },
    {
      icon: <Scale className="w-6 h-6 text-green-400" />,
      title: "Consider the context",
      description: "Understand the situation and potential biases.",
    },
    {
      icon: <Eye className="w-6 h-6 text-green-400" />,
      title: "Cross-reference information",
      description: "Compare with other reliable sources.",
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-green-400" />,
      title: "Be wary of emotional appeals",
      description: "Misinformation often uses strong emotions to manipulate.",
    },
  ];

  const quizCards = [
    {
      id: 1,
      frontTitle: "Misleading Headline?",
      frontSubtitle: "Click to reveal the article.",
      backTitle: "Is this headline accurate?",
      backDescription: '"Scientists Discover All Junk Food is Now Healthy."',
      backgroundImage: "https://images.unsplash.com/photo-1586952518485-11b180e92764?w=400&h=600&fit=crop",
    },
    {
      id: 2,
      frontTitle: "Altered Image?",
      frontSubtitle: "Click to analyze.",
      backTitle: "Has this photo been edited?",
      backDescription: "A photo shows a famous landmark in a different color.",
      backgroundImage: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400&h=600&fit=crop",
    },
    {
      id: 3,
      frontTitle: "Check the Source",
      frontSubtitle: "Click to investigate.",
      backTitle: 'Is "news.randomblog.biz" a reliable source?',
      backDescription: "An article from this site makes a bold claim.",
      backgroundImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=600&fit=crop",
    },
  ];

  const suggestions = [
    '"Is this article biased?"',
    '"Fact-check this statement for me."',
  ];

  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden font-sans">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-gray-900 -z-10" />
      <div className="absolute w-1/2 h-1/2 -top-1/4 -left-1/4 rounded-full bg-green-400/5 blur-[150px] -z-10" />
      <div className="absolute w-1/2 h-1/2 -bottom-1/4 -right-1/4 rounded-full bg-green-400/5 blur-[150px] -z-10" />

      <main className="max-w-6xl mx-auto px-5 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
            Spot Misinformation Like a Pro
          </h2>
          <p className="text-green-200 text-lg md:text-xl max-w-2xl mx-auto">
            Learn to identify and combat misinformation with our comprehensive
            guide and interactive tools.
          </p>
        </section>

        {/* Checklist */}
        <section className="bg-black/20 border border-green-500/50 rounded-3xl p-8 mb-16 backdrop-blur-sm hover:border-green-400/70 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500">
          <h3 className="flex items-center text-2xl md:text-3xl font-bold mb-8">
            <CheckCircle className="w-8 h-8 text-green-400 mr-3" />
            Checklist: How to Spot Misinformation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {checklistItems.slice(0, 4).map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 group">
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                  <p className="text-green-200 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
            <div className="md:col-span-2 flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 group">
              <div className="group-hover:scale-110 transition-transform duration-300">
                {checklistItems[4].icon}
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">{checklistItems[4].title}</h4>
                <p className="text-green-200 text-sm">{checklistItems[4].description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-16">
          <h3 className="text-center text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
            Test Your Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizCards.map((card) => (
              <div
                key={card.id}
                className={`relative aspect-[3/4] cursor-pointer group transition-all duration-700 ${
                  flippedCards[card.id] ? '[transform-style:preserve-3d] [transform:rotateY(180deg)]' : '[transform-style:preserve-3d]'
                }`}
                onClick={() => toggleCard(card.id)}
              >
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-sm" />

                {/* Front */}
                <div
                  className="absolute inset-0 w-full h-full rounded-3xl p-6 flex flex-col justify-end [backface-visibility:hidden] transition-all duration-700 bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%), url(${card.backgroundImage})`,
                  }}
                >
                  <div className="text-white">
                    <h4 className="text-xl font-bold mb-2">{card.frontTitle}</h4>
                    <p className="text-green-200">{card.frontSubtitle}</p>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 w-full h-full bg-gray-900/95 border border-green-500/50 rounded-3xl p-6 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] transition-all duration-700">
                  <div>
                    <h5 className="text-lg font-bold mb-4 text-green-300">{card.backTitle}</h5>
                    <p className="text-gray-300 mb-6">{card.backDescription}</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 rounded-full text-sm font-medium bg-red-500/10 text-red-300 border border-red-500/30 hover:bg-red-500/20 transition-colors">
                      Likely False
                    </button>
                    <button className="flex-1 px-4 py-2 rounded-full text-sm font-medium bg-green-500/10 text-green-300 border border-green-500/30 hover:bg-green-500/20 transition-colors">
                      Likely True
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Assistant Section */}
        <section className="bg-black/20 border border-green-500/50 rounded-3xl p-8 flex flex-col lg:flex-row gap-8 items-center backdrop-blur-sm group hover:border-green-400/70 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500">
          {/* Enhanced Glow Effect on Hover */}
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl -z-10" />
          
          <div className="flex-1 lg:max-w-lg">
            <h4 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              Need a second opinion?
            </h4>
            <p className="text-green-200 mb-6 text-lg">
              I can help you analyze articles, check sources, and understand
              complex topics. Just ask!
            </p>
            <div className="space-y-3 mb-6">
              {suggestions.map((suggestion, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 px-4 py-3 rounded-full text-sm animate-pulse hover:bg-white/10 transition-colors cursor-pointer"
                  style={{ animationDelay: `${i * 0.5}s` }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
            <button onClick={handleGetStarted} className="group/btn px-8 py-4 rounded-full font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-black hover:from-white hover:to-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <span className="flex items-center gap-2">
                Chat Now
                <span className="transform group-hover/btn:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </span>
            </button>
          </div>
          <div className="flex-1 lg:max-w-md">
            <div
              className="min-h-[300px] bg-cover bg-center rounded-3xl shadow-2xl border border-green-500/30 hover:border-green-400/50 transition-all duration-500 group-hover:scale-105"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=500&fit=crop')",
              }}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default TruthGuardApp;