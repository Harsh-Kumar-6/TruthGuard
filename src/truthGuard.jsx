// import React, { useState } from 'react';
// import { CheckCircle, AlertTriangle, Shield, Search, BookOpen, TrendingUp } from 'lucide-react';

// const TruthGuard = () => {
//   const [inputText, setInputText] = useState('');
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [analysisResults, setAnalysisResults] = useState(null);

//   const handleAnalyze = async () => {
//     if (!inputText.trim()) return;

//     setIsAnalyzing(true);
//     setProgress(0);
//     setAnalysisResults(null);

//     // Progress bar animation
//     const progressInterval = setInterval(() => {
//       setProgress(prev => {
//         if (prev >= 100) {
//           clearInterval(progressInterval);
//           return 100;
//         }
//         return prev + Math.random() * 15;
//       });
//     }, 200);

//     try {
//       const formData = new FormData();
//       formData.append("text", inputText);

//       const response = await fetch("http://localhost:8000/analyze/", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();

//       // Add credibility_score manually (0–100)
//       const credibility_score = Math.round((data.gemma?.confidence || 0.5) * 100);
//       setAnalysisResults({ ...data, credibility_score });
//     } catch (error) {
//       console.error("Error analyzing:", error);
//       setAnalysisResults({ error: "Failed to connect to API" });
//     } finally {
//       setIsAnalyzing(false);
//       setProgress(0);
//     }
//   };

//   return (
//     <div className="relative flex min-h-screen flex-col bg-gray-950 overflow-x-hidden" style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}>
//       <style jsx>{`
//         .progress-bar { transition: width 0.3s ease-out; }
//         @keyframes pulse-dots {
//           0%, 80%, 100% { transform: scale(0); }
//           40% { transform: scale(1); }
//         }
//         .pulse-dot-1 { animation: pulse-dots 1.4s infinite ease-in-out both; animation-delay: -0.32s; }
//         .pulse-dot-2 { animation: pulse-dots 1.4s infinite ease-in-out both; animation-delay: -0.16s; }
//         .pulse-dot-3 { animation: pulse-dots 1.4s infinite ease-in-out both; }
//       `}</style>

//       {/* Header */}
//       <header className="flex items-center justify-between border-b border-gray-800 px-10 py-5">
//         <div className="flex items-center gap-3 text-white">
//           <CheckCircle className="w-6 h-6 text-green-400" />
//           <h2 className="text-xl font-bold">TruthGuard</h2>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-1">
//         <section className="py-20">
//           <div className="container relative mx-auto px-4 max-w-3xl text-center">
//             <h1 className="text-4xl font-black text-white">Unmask the Truth</h1>
//             <p className="mt-6 text-lg text-gray-400">
//               Paste any headline, tweet, or article. Our AI will analyze it for misinformation.
//             </p>
//           </div>

//           {/* Input Section */}
//           <div className="mx-auto mt-12 max-w-2xl">
//             <div className="relative">
//               <textarea
//                 className="w-full resize-none rounded-2xl border-2 border-gray-800 bg-gray-900/80 p-6 pr-40 text-base text-white shadow-lg"
//                 placeholder="Paste headline, tweet, or article here…"
//                 rows="4"
//                 value={inputText}
//                 onChange={(e) => setInputText(e.target.value)}
//               />
//               <button
//                 onClick={handleAnalyze}
//                 disabled={!inputText.trim() || isAnalyzing}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-32 items-center justify-center rounded-full text-gray-950 font-bold hover:scale-105 disabled:opacity-50"
//                 style={{ backgroundColor: '#38e07b' }}
//               >
//                 {isAnalyzing ? 'Analyzing' : 'Analyze'}
//               </button>
//             </div>
//           </div>

//           {/* Analysis Status */}
//           {isAnalyzing && (
//             <div className="mt-16 flex flex-col items-center gap-4 text-center">
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center space-x-2">
//                   <div className="h-3 w-3 rounded-full pulse-dot-1 bg-green-400"></div>
//                   <div className="h-3 w-3 rounded-full pulse-dot-2 bg-green-400"></div>
//                   <div className="h-3 w-3 rounded-full pulse-dot-3 bg-green-400"></div>
//                 </div>
//                 <p className="font-mono text-lg text-white">AI is analyzing...</p>
//               </div>
//               <div className="w-full max-w-md overflow-hidden rounded-full bg-gray-800">
//                 <div className="h-2 rounded-full progress-bar bg-green-400" style={{ width: `${Math.min(progress, 100)}%` }}></div>
//               </div>
//             </div>
//           )}

//           {/* Analysis Results */}
//           {analysisResults && !isAnalyzing && (
//             <div className="mt-16 mx-auto max-w-4xl">
//               {analysisResults.error ? (
//                 <p className="text-red-400">{analysisResults.error}</p>
//               ) : (
//                 <>
//                   {/* Main Score Card */}
//                   <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900/80 p-8">
//                     <div className="flex items-center justify-between mb-6">
//                       <div className="flex items-center gap-4">
//                         {analysisResults.label === 'trustworthy'
//                           ? <Shield className="w-8 h-8 text-green-400" />
//                           : <AlertTriangle className="w-8 h-8 text-yellow-400" />}
//                         <div>
//                           <h3 className="text-2xl font-bold text-white capitalize">
//                             {analysisResults.label}
//                           </h3>
//                           <p className="text-gray-400">AI Analysis Complete</p>
//                         </div>
//                       </div>
//                       {/* Credibility Score Circle */}
//                       <div className="text-center">
//                         <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-gray-700">
//                           <div
//                             className="absolute inset-0 rounded-full"
//                             style={{
//                               background: `conic-gradient(#38e07b ${analysisResults.credibility_score * 3.6}deg, transparent 0deg)`
//                             }}
//                           ></div>
//                           <div className="absolute inset-2 bg-gray-900 rounded-full flex items-center justify-center">
//                             <span className="text-xl font-bold text-white">{analysisResults.credibility_score}</span>
//                           </div>
//                         </div>
//                         <p className="mt-2 text-sm text-gray-400">Credibility Score</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Detailed Analysis */}
//                   <div className="grid gap-6 md:grid-cols-2">
//                     {/* Reason Analysis */}
//                     <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-6">
//                       <div className="flex items-center gap-3 mb-4">
//                         <BookOpen className="w-5 h-5 text-green-400" />
//                         <h4 className="text-lg font-semibold text-white">Detailed Analysis</h4>
//                       </div>
//                       <div className="text-gray-300 text-sm whitespace-pre-line">
//                         {analysisResults.gemma?.reason || "No explanation available."}
//                       </div>
//                     </div>
//                     {/* Suggestions */}
//                     <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-6">
//                       <div className="flex items-center gap-3 mb-4">
//                         <Search className="w-5 h-5 text-green-400" />
//                         <h4 className="text-lg font-semibold text-white">Verification Steps</h4>
//                       </div>
//                       {analysisResults.gemma?.suggested_checks?.length ? (
//                         <div className="space-y-3">
//                           {analysisResults.gemma.suggested_checks.map((check, idx) => (
//                             <div key={idx} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
//                               <TrendingUp className="w-4 h-4 text-gray-400" />
//                               <span className="text-gray-300 text-sm">{check}</span>
//                             </div>
//                           ))}
//                         </div>
//                       ) : (
//                         <p className="text-gray-400 text-sm">No verification checks suggested.</p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Reset */}
//                   <div className="mt-8 text-center">
//                     <button
//                       onClick={() => {
//                         setInputText('');
//                         setAnalysisResults(null);
//                       }}
//                       className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-all hover:scale-105"
//                     >
//                       Analyze Another
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           )}
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="border-t border-gray-800 py-6 px-10">
//         <div className="text-center text-sm text-gray-500">
//           © 2025 TruthGuard. Fighting misinformation with technology.
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default TruthGuard;


import React, { useState, useRef } from 'react';
import { CheckCircle, AlertTriangle, Shield, BookOpen, FileText, Upload, X, Camera, Type, Clock, ExternalLink, AlertCircle, TrendingUp } from 'lucide-react';

const TruthGuard = () => {
  const [inputText, setInputText] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [activeTab, setActiveTab] = useState('text');
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage({
          file: file,
          url: e.target.result,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!inputText.trim() && !uploadedImage) return;

    setIsAnalyzing(true);
    setAnalysisResults(null);

    try {
      const formData = new FormData();
      
      if (inputText.trim()) {
        formData.append("text", inputText);
      }
      
      if (uploadedImage) {
        formData.append("image", uploadedImage.file);
      }

      // Replace with your actual backend URL
      const response = await fetch("http://localhost:8000/analyze/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAnalysisResults(data);
    } catch (error) {
      console.error("Error analyzing:", error);
      setAnalysisResults({ 
        error: "Unable to connect to the analysis service. Please check your connection and try again.",
        errorType: "connection_error"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 0.8) return 'text-green-400';
    if (score >= 0.6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGradient = (score) => {
    if (score >= 0.8) return '#10b981';
    if (score >= 0.6) return '#f59e0b';
    return '#ef4444';
  };

  const getLabelStyle = (label) => {
    switch (label) {
      case 'trustworthy':
        return { bg: 'bg-green-900/30', border: 'border-green-500/50', text: 'text-green-400', icon: Shield };
      case 'misinformation':
        return { bg: 'bg-red-900/30', border: 'border-red-500/50', text: 'text-red-400', icon: AlertTriangle };
      case 'needs_review':
        return { bg: 'bg-yellow-900/30', border: 'border-yellow-500/50', text: 'text-yellow-400', icon: AlertTriangle };
      default:
        return { bg: 'bg-gray-900/30', border: 'border-gray-500/50', text: 'text-gray-400', icon: AlertCircle };
    }
  };

  const formatTimestamp = () => {
    return new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCredibilityScore = (results) => {
    // Convert various confidence scores to a 0-100 scale
    if (results.model?.confidence) {
      return Math.round(results.model.confidence * 100);
    }
    if (results.gemma?.confidence) {
      return Math.round(results.gemma.confidence * 100);
    }
    return 50; // default
  };

  const canAnalyze = inputText.trim() || uploadedImage;

  return (
    <div className="w-screen min-h-screen bg-gray-950 text-white overflow-x-hidden" style={{ fontFamily: '"Inter", "Segoe UI", sans-serif', margin: 0, padding: 0, width: '100vw' }}>
      {/* Header */}
      <header className="w-full border-b border-gray-800 px-6 py-4 bg-gray-950/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold">TruthGuard</h1>
              <p className="text-xs text-gray-400">AI-Powered Fact Verification</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            Advanced ML Analysis
          </div>
        </div>
      </header>

      <main className="w-full px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4" />
            Multi-Model AI Verification
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Verify Claims with <span className="text-green-400">AI Precision</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-4xl mx-auto">
            Upload images or paste text to analyze for misinformation using advanced ML models, 
            fact-checking APIs, and real-time news verification.
          </p>
        </div>

        {/* Input Section */}
        <div className="w-full mb-12 max-w-4xl mx-auto">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-800">
              <button
                onClick={() => setActiveTab('text')}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'text' 
                    ? 'bg-green-500/20 text-green-400 border-b-2 border-green-400' 
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                <Type className="w-4 h-4" />
                Text Analysis
              </button>
              <button
                onClick={() => setActiveTab('image')}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'image' 
                    ? 'bg-green-500/20 text-green-400 border-b-2 border-green-400' 
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                <Camera className="w-4 h-4" />
                Image Analysis
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === 'text' ? (
                <div className="space-y-4">
                  <textarea
                    className="w-full h-32 bg-transparent border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 resize-none focus:border-green-500/50 focus:outline-none transition-colors"
                    placeholder="Paste your text, claim, or article here for fact verification..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {inputText.length > 0 && `${inputText.trim().split(/\s+/).length} words`}
                    </span>
                    <button
                      onClick={handleAnalyze}
                      disabled={!canAnalyze || isAnalyzing}
                      className="px-6 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-700 disabled:text-gray-400 text-black font-medium rounded-lg transition-colors"
                    >
                      {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {!uploadedImage ? (
                    <div
                      className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-green-500/50 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                      <p className="text-gray-400 mb-2">Drop an image here or click to upload</p>
                      <p className="text-sm text-gray-500">Supports JPG, PNG, WebP formats</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative bg-gray-800/50 rounded-lg p-4">
                        <button
                          onClick={removeImage}
                          className="absolute top-2 right-2 p-1 bg-red-500/20 hover:bg-red-500/40 rounded-full text-red-400"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-4">
                          <img 
                            src={uploadedImage.url} 
                            alt="Upload preview" 
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">{uploadedImage.name}</p>
                            <p className="text-sm text-gray-400">Ready for analysis</p>
                          </div>
                        </div>
                      </div>
                      
                      <textarea
                        className="w-full h-20 bg-gray-800/50 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 resize-none focus:border-green-500/50 focus:outline-none transition-colors"
                        placeholder="Add context or description (optional)..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                      />
                      
                      <div className="flex justify-end">
                        <button
                          onClick={handleAnalyze}
                          disabled={!canAnalyze || isAnalyzing}
                          className="px-6 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-700 disabled:text-gray-400 text-black font-medium rounded-lg transition-colors"
                        >
                          {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isAnalyzing && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-8 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
              <span className="text-lg">Running multi-model analysis...</span>
            </div>
            <p className="text-gray-400 text-sm">
              Processing with ML models, fact-checking APIs, and news verification
            </p>
          </div>
        )}

        {/* Results */}
        {analysisResults && !isAnalyzing && (
          <div className="w-full space-y-8">
            {analysisResults.error ? (
              <div className="w-full text-center">
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />
                  <h3 className="text-lg font-semibold text-red-400 mb-2">Analysis Failed</h3>
                  <p className="text-red-300">{analysisResults.error}</p>
                </div>
              </div>
            ) : (
              <>
                {/* Main Result Card */}
                <div className={`w-full ${getLabelStyle(analysisResults.label).bg} ${getLabelStyle(analysisResults.label).border} border rounded-2xl p-6 lg:p-8`}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gray-900/50 rounded-full">
                        {React.createElement(getLabelStyle(analysisResults.label).icon, {
                          className: `w-8 h-8 ${getLabelStyle(analysisResults.label).text}`
                        })}
                      </div>
                      <div>
                        <h3 className={`text-2xl font-bold capitalize ${getLabelStyle(analysisResults.label).text}`}>
                          {analysisResults.label.replace('_', ' ')}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-400 mt-1">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">Analyzed {formatTimestamp()}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Confidence Score */}
                    <div className="text-center">
                      <div className="relative w-20 h-20">
                        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-gray-700"
                            fill="none"
                            strokeWidth="3"
                            stroke="currentColor"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className={getScoreColor(getCredibilityScore(analysisResults) / 100)}
                            fill="none"
                            strokeWidth="3"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeDasharray={`${getCredibilityScore(analysisResults)}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-lg font-bold ${getScoreColor(getCredibilityScore(analysisResults) / 100)}`}>
                            {getCredibilityScore(analysisResults)}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Confidence</p>
                    </div>
                  </div>
                </div>

                {/* Two Column Analysis */}
                <div className="w-full grid lg:grid-cols-2 gap-8">
                  {/* Analysis Reasoning */}
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <BookOpen className="w-5 h-5 text-blue-400" />
                      </div>
                      <h4 className="text-lg font-semibold">AI Analysis</h4>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                        Multi-Model
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Concise Summary */}
                      <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/20 border border-blue-500/30 rounded-lg p-4">
                        <h5 className="text-sm font-medium text-blue-300 mb-2 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Quick Summary
                        </h5>
                        <p className="text-white font-medium leading-relaxed">
                          {(() => {
                            if (analysisResults.gemma?.reason) {
                              const sentences = analysisResults.gemma.reason.split('.').filter(s => s.trim().length > 0);
                              const summary = sentences.slice(0, Math.min(6, sentences.length)).join('. ');
                              return summary + (sentences.length > 6 ? '...' : '.');
                            }
                            return `This content appears to be ${analysisResults.label.replace('_', ' ')} based on comprehensive multi-model analysis including machine learning classification, fact-checking verification, and news source cross-referencing.`;
                          })()}
                        </p>
                      </div>

                      {/* Detailed Reason */}
                      <div className="bg-gray-900/50 rounded-lg p-4">
                        <h5 className="text-sm font-medium text-gray-300 mb-2">Detailed Analysis</h5>
                        <p className="text-gray-300 leading-relaxed">
                          {analysisResults.reason || "Analysis completed using multiple verification methods including ML classification, fact-checking APIs, and news source verification."}
                        </p>
                      </div>

                      {/* Model Predictions */}
                      <div className="space-y-3">
                        {analysisResults.model && (
                          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                            <div>
                              <span className="text-sm font-medium">ML Model</span>
                              <p className="text-xs text-gray-400">Sentence Transformer + Classifier</p>
                            </div>
                            <div className="text-right">
                              <span className={`text-sm font-medium ${analysisResults.model.label === 'trustworthy' ? 'text-green-400' : 'text-red-400'}`}>
                                {analysisResults.model.label}
                              </span>
                              <p className="text-xs text-gray-400">
                                {Math.round(analysisResults.model.confidence * 100)}% conf.
                              </p>
                            </div>
                          </div>
                        )}

                        {analysisResults.gemma && (
                          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                            <div>
                              <span className="text-sm font-medium">Gemini Model</span>
                              <p className="text-xs text-gray-400">Large Language Model</p>
                            </div>
                            <div className="text-right">
                              <span className={`text-sm font-medium ${analysisResults.gemma.label === 'trustworthy' ? 'text-green-400' : 'text-red-400'}`}>
                                {analysisResults.gemma.label}
                              </span>
                              <p className="text-xs text-gray-400">
                                {Math.round((analysisResults.gemma.confidence || 0.5) * 100)}% conf.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* News Articles */}
                  <div className="bg-orange-900/20 border border-orange-500/30 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-orange-500/20 rounded-lg">
                        <FileText className="w-5 h-5 text-orange-400" />
                      </div>
                      <h4 className="text-lg font-semibold">Related News</h4>
                      <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full">
                        {analysisResults.news?.length || 0} found
                      </span>
                    </div>

                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {analysisResults.news?.length > 0 ? (
                        analysisResults.news.map((article, idx) => (
                          <div key={idx} className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800/70 transition-colors">
                            <h5 className="font-medium text-white text-sm mb-2 leading-snug">
                              {article.title}
                            </h5>
                            <div className="flex items-center justify-between">
                              <span className="text-xs px-2 py-1 bg-orange-500/20 text-orange-300 rounded">
                                {article.source}
                              </span>
                              {article.url && (
                                <a 
                                  href={article.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1"
                                >
                                  Read <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <FileText className="w-12 h-12 mx-auto mb-3 text-gray-600 opacity-50" />
                          <p className="text-gray-400 text-sm">No recent news articles found</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Fact Check Results */}
                {analysisResults.fact_checks?.length > 0 && (
                  <div className="w-full bg-purple-900/20 border border-purple-500/30 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Shield className="w-5 h-5 text-purple-400" />
                      </div>
                      <h4 className="text-lg font-semibold">Fact Check Results</h4>
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                        {analysisResults.fact_checks.length} checks
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                      {analysisResults.fact_checks.map((check, idx) => (
                        <div key={idx} className="bg-gray-800/50 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              check.rating?.toLowerCase().includes('true') ? 'bg-green-500/20 text-green-300' :
                              check.rating?.toLowerCase().includes('false') ? 'bg-red-500/20 text-red-300' :
                              'bg-yellow-500/20 text-yellow-300'
                            }`}>
                              {check.rating || 'Unrated'}
                            </span>
                            <span className="text-xs text-gray-500">{check.publisher}</span>
                          </div>
                          <h5 className="font-medium text-sm mb-2 line-clamp-2">{check.title}</h5>
                          {check.url && (
                            <a 
                              href={check.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                            >
                              View Check <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="text-center">
                  <button
                    onClick={() => {
                      setInputText('');
                      setUploadedImage(null);
                      setAnalysisResults(null);
                    }}
                    className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full font-medium transition-colors"
                  >
                    Analyze Another
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    Results based on AI analysis • Verify with multiple sources
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-800 py-6 px-6 mt-16">
        <div className="w-full text-center text-gray-500 text-sm">
          <p>© 2025 TruthGuard • Advanced AI Fact Verification Platform</p>
        </div>
      </footer>
    </div>
  );
};

export default TruthGuard;