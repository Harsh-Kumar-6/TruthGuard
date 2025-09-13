import React, { useState } from 'react';

const CompleteFightMisinformationSection = () => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isSubscribeHovered, setIsSubscribeHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#00FFFF]/30 via-[#0D1B2A]/60 to-[#00FFFF]/30 text-[#FFD700] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-cyan-900/20 to-blue-900/20"></div>
      
      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'transparent',
          backgroundSize: '50px 50px'
        }}
      ></div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10">
        {/* Main CTA Section */}
        <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-visible">
          <div className="max-w-4xl mx-auto overflow-visible">
          {/* Main Title */}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tighter mb-6"
            style={{ fontFamily: "Montserrat, Poppins, Inter, sans-serif" }}
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
              Ready to Fight Misinformation?
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-lg md:text-xl font-light leading-normal max-w-3xl mx-auto mb-12">
            Join TruthGuard today and empower yourself with the tools to stay informed and make better decisions.
          </p>

          {/* Main CTA Button with Glow Effect */}
          <div className="relative mb-16 overflow-visible">
            {/* Outer glow ring */}
            <div 
              className={`absolute inset-0 rounded-full transition-all duration-500 ease-out pointer-events-none ${
                isButtonHovered 
                  ? 'opacity-100 scale-150' 
                  : 'opacity-0 scale-100'
              }`}
              style={{
                background: 'radial-gradient(circle, rgba(25, 230, 196, 0.3) 0%, transparent 70%)',
                filter: 'blur(20px)',
                zIndex: -1
              }}
            ></div>
            
            {/* Middle glow ring */}
            <div 
              className={`absolute inset-0 rounded-full transition-all duration-300 ease-out pointer-events-none ${
                isButtonHovered 
                  ? 'opacity-100 scale-125' 
                  : 'opacity-0 scale-100'
              }`}
              style={{
                background: 'radial-gradient(circle, rgba(25, 230, 196, 0.4) 0%, transparent 70%)',
                filter: 'blur(15px)',
                zIndex: -1
              }}
            ></div>
            
            {/* Inner glow ring */}
            <div 
              className={`absolute inset-0 rounded-full transition-all duration-200 ease-out pointer-events-none ${
                isButtonHovered 
                  ? 'opacity-100 scale-110' 
                  : 'opacity-0 scale-100'
              }`}
              style={{
                background: 'radial-gradient(circle, rgba(25, 230, 196, 0.5) 0%, transparent 70%)',
                filter: 'blur(10px)',
                zIndex: -1
              }}
            ></div>

            <button
              className="relative px-8 py-4 md:px-10 md:py-5 rounded-full text-black font-bold text-base md:text-lg transition-all duration-300 ease-out hover:scale-105 active:scale-95"
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              style={{
                background: 'linear-gradient(90deg, #19e6c4 0%, #00d4d4 50%, #19e6c4 100%)',
                boxShadow: isButtonHovered 
                  ? '0 0 20px 0px rgba(25, 230, 196, 0.6), 0 0 40px 0px rgba(25, 230, 196, 0.3)' 
                  : '0 0 10px 0px rgba(25, 230, 196, 0.3)',
                zIndex: 10
              }}
            >
              <span className="truncate">Get Started for Free</span>
            </button>
          </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="border-t border-gray-800 bg-black/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-6">
            {/* Newsletter Section */}
            <div className="flex flex-col items-center justify-center gap-6 py-10 md:flex-row md:justify-between">
              <div className="flex flex-col gap-2 text-center md:text-left">
                <p 
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: "Montserrat, Poppins, Inter, sans-serif" }}
                >
                  Stay Updated
                </p>
                <p className="text-sm text-gray-400">
                  Subscribe to our newsletter for the latest updates.
                </p>
              </div>
              
              {/* Email Form */}
              <form className="flex w-full max-w-md items-center gap-2">
                <input 
                  className="flex-grow rounded-full border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-colors" 
                  placeholder="Enter your email" 
                  type="email"
                />
                
                {/* Subscribe Button with Glow */}
                <div className="relative">
                  <div 
                    className={`absolute inset-0 rounded-full transition-all duration-300 ease-out pointer-events-none ${
                      isSubscribeHovered 
                        ? 'opacity-100 scale-125' 
                        : 'opacity-0 scale-100'
                    }`}
                    style={{
                      background: 'radial-gradient(circle, rgba(25, 230, 196, 0.4) 0%, transparent 70%)',
                      filter: 'blur(15px)'
                    }}
                  ></div>
                  
                  <button
                    className="relative flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 text-black text-sm font-bold leading-normal tracking-wide transition-all duration-300 ease-in-out hover:scale-105"
                    type="submit"
                    onMouseEnter={() => setIsSubscribeHovered(true)}
                    onMouseLeave={() => setIsSubscribeHovered(false)}
                    style={{
                      background: '#19e6c4',
                      boxShadow: isSubscribeHovered 
                        ? '0 0 20px 0px rgba(25, 230, 196, 0.6)' 
                        : '0 0 5px 0px rgba(25, 230, 196, 0.2)'
                    }}
                  >
                    <span className="truncate">Subscribe</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Footer Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:justify-around pt-8 border-t border-gray-800">
              <a className="text-gray-400 hover:text-white text-sm font-normal leading-normal min-w-40 transition-colors text-center hover:text-teal-400" href="#">
                Privacy Policy
              </a>
              <a className="text-gray-400 hover:text-white text-sm font-normal leading-normal min-w-40 transition-colors text-center hover:text-teal-400" href="#">
                Terms of Service
              </a>
              <a className="text-gray-400 hover:text-white text-sm font-normal leading-normal min-w-40 transition-colors text-center hover:text-teal-400" href="#">
                Contact Us
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="flex flex-wrap justify-center gap-6 py-8">
              <a href="#" className="group">
                <div className="text-gray-400 hover:text-teal-400 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(25,230,196,0.7)]">
                  <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path>
                  </svg>
                </div>
              </a>
              
              <a href="#" className="group">
                <div className="text-gray-400 hover:text-teal-400 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(25,230,196,0.7)]">
                  <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path>
                  </svg>
                </div>
              </a>
              
              <a href="#" className="group">
                <div className="text-gray-400 hover:text-teal-400 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(25,230,196,0.7)]">
                  <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
                  </svg>
                </div>
              </a>
            </div>

            {/* Copyright */}
            <p className="text-gray-500 text-sm font-normal leading-normal text-center pb-8">
              © 2025 TruthGuard. All rights reserved.
            </p>
          </div>
        </footer>

        {/* Additional floating particles for ambiance */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-teal-400 rounded-full animate-ping delay-500"></div>
        <div className="absolute top-3/4 right-10 w-1 h-1 bg-cyan-400 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping delay-1500"></div>
      </div>
    </div>
  );
};

export default CompleteFightMisinformationSection;