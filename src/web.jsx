import React, { useState, useEffect } from "react";
import { ArrowRight, Image, Upload, Mic, Settings, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";


const AIFiestaLanding = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/truthGuard");  // this changes the URL and opens new page
  };

  const [chatInput, setChatInput] = useState("What's the best way to brew coffee at home? Give me the simple answer");
  const [currentChat, setCurrentChat] = useState(0);
  const [displayText, setDisplayText] = useState("Chat");
  const [isDeleting, setIsDeleting] = useState(false);
  
  const chatExamples = [
    {
      question: "What's the best way to brew coffee at home?",
      answer: "For the best home brew, I'd recommend starting with freshly ground beans and a French press or pour-over method...",
      model: "Claude-4"
    },
    {
      question: "Write a Python function to sort a list",
      answer: "Here's a clean Python function that sorts a list using the built-in sorted() method...",
      model: "GPT-4"
    },
    {
      question: "Explain quantum computing simply",
      answer: "Think of quantum computing like having a coin that can be heads, tails, or both at the same time...",
      model: "Gemini Pro"
    },
    {
      question: "Create a marketing strategy for my startup",
      answer: "Let's build a comprehensive marketing strategy starting with your target audience analysis...",
      model: "Claude-4"
    }
  ];

  // Rotate chats for a while, then swap with subscription
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentChat((prev) => (prev + 1) % chatExamples.length);
    }, 3000);

    // After 12 seconds, show subscription
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 12000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [chatExamples.length]);

  // Typing animation effect
  useEffect(() => {
    const words = ["Fact", "Click"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentWord = words[wordIndex];
    
    const typeInterval = setInterval(() => {
      if (!isDeleting) {
        // Typing characters
        charIndex++;
      setDisplayText(currentWord.slice(0, charIndex));
      
      if (charIndex === currentWord.length) {
        // Wait before starting to delete
        setTimeout(() => {
          isDeleting = true;
        }, 1000); // Pause for 2 seconds at full word
      }
      } else {
        // Deleting characters
        charIndex--;
        setDisplayText(currentWord.slice(0, charIndex));
        
        if (charIndex === 0) {
          // Move to next word
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          currentWord = words[wordIndex];
        }
      }
    }, isDeleting ? 100 : 200); // Faster deletion, slower typing
    
    return () => clearInterval(typeInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-emerald-900/20 to-black text-white relative overflow-hidden">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 5px, transparent 5px),
            linear-gradient(to bottom, rgba(43, 49, 43, 0.3) 3px, transparent 0px),
            radial-gradient(circle at 20% 30%, rgba(0, 255, 200, 0.2), transparent 60%),
            radial-gradient(circle at 70% 60%, rgba(0, 200, 255, 0.15), transparent 70%),
            radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.1), transparent 80%)
          `,
          backgroundSize: '80px 80px, 80px 80px, 100% 100%, 100% 100%, 100% 100%',
          backgroundBlendMode: 'screen'
        }}
      />
      
      {/* Header */}
      <header className="fixed top-0 left-0 z-50 w-full px-4 lg:px-12">
        <div className="flex justify-between items-center px-6 lg:px-20 py-6 mt-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
                src="../photos/image.png" 
                alt="TruthGuard Logo" 
                className="w-[400px] h-[400px] md:w-[150px] md:h-[60px] lg:w-[200px] lg:h-[80px] object-contain fill-white invert brightness-0 scale-150"
            />
            {/* <span className="text-xl font-bold">TruthGuard</span> */}
          </div>
          
          {/* Centered Navigation */}
          <nav className="absolute left-1/2 transform -translate-x-1/2 hidden lg:block">
            <div className="bg-gray-800/60 backdrop-blur-xl rounded-full px-6 py-2 flex gap-6">
              <button className="text-gray-300 hover:text-white transition-colors">Features</button>
              <button className="text-gray-300 hover:text-white transition-colors">Pricing</button>
              <button className="text-gray-300 hover:text-white transition-colors">FAQs</button>
            </div>
          </nav>
          
          {/* Login Button */}
          <button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 px-6 py-2 rounded-full flex items-center gap-2 transition-all hover:scale-105">
            <span>Log In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative z-10 w-screen pt-32 px-4 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center justify-between py-12 w-full min-h-[80vh]">
          {/* Left Side - Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8 lg:text-left text-center px-6 lg:px-16">
            <div className="bg-gray-800/40 backdrop-blur-xl rounded-full px-4 py-2 inline-block w-fit mx-auto lg:mx-0">
              <span className="text-sm text-gray-300">Built by .............</span>
            </div>
            
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                AI Against<br />
                <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
                  Fake News
                </span><br />
                One {displayText}
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-md mx-auto lg:mx-0">
                Stop second-guessing headlines – our AI verifies facts across the web, filters out misinformation, and delivers the truth straight to your feed so you can stay confidently informed.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              {/* Replaced with Glowing Button */}
              <GlowingButton onClick={handleGetStarted}>GET STARTED NOW</GlowingButton>
              
              <p className="text-gray-400 mx-auto lg:mx-0">Experience smarter & more accurate answers</p>
            </div>
          </div>

          {/* Right Side - Animated Chat Interface */}
          <div className="w-full lg:w-1/2 lg:pl-12 mt-12 lg:mt-0 relative px-6 lg:px-16">
            <div className="relative">
              {/* Chat Container with Animation */}
              <div className="bg-gray-800/60 backdrop-blur-2xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl transition-all duration-1000 ease-in-out">
                
                {/* Animated Chat Messages Area */}
                <div className="h-80 bg-gray-900/50 rounded-xl mb-4 p-4 overflow-hidden relative">
                  <div className="absolute inset-0 p-4">
                    {/* Current Chat */}
                    <div 
                      key={currentChat}
                      className="flex flex-col gap-4 animate-in slide-in-from-bottom-4 duration-700"
                    >
                      <div className="flex justify-end">
                        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl rounded-br-sm px-4 py-3 max-w-80 animate-in slide-in-from-right-4 duration-500">
                          <p className="text-sm text-gray-100">{chatExamples[currentChat].question}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-start">
                        <div className="bg-gray-600 rounded-2xl rounded-bl-sm px-4 py-3 max-w-80 animate-in slide-in-from-left-4 duration-500 delay-300">
                          <p className="text-sm text-gray-200">{chatExamples[currentChat].answer}</p>
                          
                          {/* Model Badge - Slides up from bottom */}
                          <div className="mt-3 animate-in slide-in-from-bottom-4 duration-500 delay-1000">
                            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 px-3 py-1 rounded-full text-xs font-medium inline-block">
                              {chatExamples[currentChat].model}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="relative">
                  <div className="bg-gray-700/50 rounded-full p-3 flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-600 rounded-full transition-colors text-gray-400">
                        <Image className="w-4 h-4" />
                      </button>
                      <span className="text-xs text-gray-400 hidden sm:block">Generate Image</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-600 rounded-full transition-colors text-gray-400">
                        <Upload className="w-4 h-4" />
                      </button>
                      <span className="text-xs text-gray-400 hidden sm:block">Upload Image</span>
                    </div>
                    
                    <div className="flex-1"></div>
                    
                    <button className="p-2 hover:bg-gray-600 rounded-full transition-colors text-gray-400">
                      <Mic className="w-4 h-4" />
                    </button>
                    
                    <button className="p-2 hover:bg-gray-600 rounded-full transition-colors text-gray-400">
                      <Settings className="w-4 h-4" />
                    </button>
                    
                    <button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 p-2 rounded-full transition-all hover:scale-105">
                      <Send className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  
                  <div className="absolute top-3 left-20 right-20">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="w-full bg-transparent text-sm text-gray-300 border-none outline-none placeholder-gray-500"
                      placeholder="Ask me anything..."
                    />
                  </div>
                </div>
              </div>

              {/* Floating Animation Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {chatExamples.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded transition-all duration-300 ${
                    index === currentChat 
                      ? 'w-8 bg-gradient-to-r from-emerald-500 to-blue-500' 
                      : 'w-2 bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000 pointer-events-none"></div>
    </div>
  );
};

// Added GlowingButton component
const GlowingButton = ({ children = "Hover Me!", className = "", ...props }) => {
  return (
    <div className="flex items-center justify-start w-full" 
         style={{
           background: 'transparent',
         }}>
      <style jsx>{`
        @keyframes glowing {
          0% { background-position: 0 0; }
          50% { background-position: 400% 0; }
          100% { background-position: 0 0; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .glow-before {
          content: "";
          background: linear-gradient(
            45deg,
            #ff006e, #8338ec, #3a86ff, #06ffa5, 
            #ffbe0b, #fb5607, #ff006e, #8338ec
          );
          position: absolute;
          top: -3px;
          left: -3px;
          background-size: 800%;
          z-index: -1;
          width: calc(100% + 6px);
          height: calc(100% + 6px);
          filter: blur(12px);
          animation: glowing 15s linear infinite;
          transition: opacity 0.3s ease-in-out;
          border-radius: 16px;
          opacity: 0;
        }
        .glow-after {
          background: linear-gradient(
            45deg,
            rgba(255,0,110,0.3), rgba(131,56,236,0.3), 
            rgba(58,134,255,0.3), rgba(6,255,165,0.3)
          );
          filter: blur(20px);
        }
        .btn-glow:hover .glow-before {
          opacity: 1;
        }
        .btn-glow:hover .glow-after {
          opacity: 0.6;
        }
        .btn-glow:hover {
          animation: pulse 2s infinite;
        }
      `}</style>
      
      <button

        className={`
          btn-glow relative z-10 px-12 py-5 border-none outline-none text-white cursor-pointer
          rounded-2xl transition-all duration-300 font-semibold text-lg tracking-wide
          active:text-cyan-300 active:font-bold hover:text-white
          shadow-2xl transform transition-transform
          ${className}
        `}
        style={{
          textShadow: '0 0 10px rgba(255,255,255,0.5)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
        }}
        {...props}
      >
        {/* Primary glow effect */}
        <div className="glow-before absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300" />
        
        {/* Secondary outer glow */}
        <div className="glow-after absolute inset-0 -m-2 rounded-2xl opacity-0 transition-opacity duration-500" />
        
        {/* Button background with space theme */}
        <div className="absolute inset-0 rounded-2xl -z-10 transition-all duration-300"
             style={{
               background: 'linear-gradient(145deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95))',
               border: '1px solid rgba(100,116,139,0.3)'
             }} />
        
        {/* Inner highlight */}
        <div className="absolute inset-0 rounded-2xl -z-10"
             style={{
               background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, transparent 50%)'
             }} />
        
        {children}
      </button>
    </div>
  );
};

export default AIFiestaLanding;