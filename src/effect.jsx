import React from 'react';
import { ArrowRight } from 'lucide-react';

const MisinformationLanding = () => {
  return (
    <div className="relative flex flex-col bg-gradient-to-r from-[#00FFFF]/30 via-[#0D1B2A]/60 to-[#00FFFF]/30 text-[#FFD700] overflow-x-hidden">
      <style jsx>{`
        :root {
          --primary-color: #19e6c4;
        }
        
        .newspaper-tag {
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation: stagger-reveal 0.5s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        
        .newspaper-tag::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
          z-index: 1;
          transition: opacity 0.3s ease;
        }
        
        .newspaper-tag:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 0 15px var(--primary-color);
        }
        
        .newspaper-tag:hover::before {
          opacity: 0.8;
        }
        
        .newspaper-tag p {
          position: relative;
          z-index: 2;
          transition: color 0.3s ease;
        }
        
        .newspaper-tag:hover p {
          color: var(--primary-color);
        }
        
        @keyframes stagger-reveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .newspaper-tag:nth-child(1) {
          animation-delay: 0.2s;
        }
        
        .newspaper-tag:nth-child(2) {
          animation-delay: 0.4s;
        }
        
        .newspaper-tag:nth-child(3) {
          animation-delay: 0.6s;
        }
        
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 5px rgba(25, 230, 196, 0.4);
          }
          50% {
            box-shadow: 0 0 20px rgba(25, 230, 196, 0.8);
          }
        }
        
        .pulse-effect {
          animation: pulse 2.5s infinite;
        }
      `}</style>
      
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 lg:px-40 flex flex-1 justify-center py-10 lg:py-20">
          <div className="layout-content-container flex flex-col max-w-5xl flex-1 items-center">
            
            {/* Main Heading */}
            <h2 className="text-white tracking-wide text-4xl md:text-5xl font-bold leading-tight px-4 text-center pb-4">
              The Devastating Ripple Effect of{' '}
              <span style={{ color: 'var(--primary-color)' }}>False Information</span>
            </h2>
            
            {/* Subtitle */}
            <p className="text-gray-300 text-lg font-normal leading-relaxed pb-12 pt-2 px-4 text-center max-w-3xl">
              Misinformation spreads like a digital wildfire, leaving a trail of destruction in its wake. It erodes trust, incites division, and can have far-reaching, devastating real-world consequences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisinformationLanding;