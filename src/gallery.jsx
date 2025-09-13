import React from 'react';

const ParallaxGallery = () => {
  const images = [
    {
      src: "../photos/case1.png",
      alt: "a mob killed five people Sunday after rumors spread on social media that they were trafficking children.",
      href: "https://www.washingtonpost.com/world/asia_pacific/as-mob-lynchings-fueled-by-whatsapp-sweep-india-authorities-struggle-to-combat-fake-news/2018/07/02/683a1578-7bba-11e8-ac4e-421ef7165923_story.html?utm_source=chatgpt.com",
      className: "slower"
    },
    {
      src: "../photos/case2.png",
      alt: "Ramu Violence",
      href: "https://en.wikipedia.org/wiki/2012_Ramu_violence?utm_source=chatgpt.com",
      className: "faster"
    },
    {
      src: "../photos/case3.png",
      alt: "Clocks shop exposition window reflecting the streets",
      href: "https://en.wikipedia.org/wiki/Indian_WhatsApp_lynchings?utm_source=chatgpt.com",
      className: "slower vertical"
    },
    {
      src: "../photos/case4.png",
      alt: "Swans and ducks swimming in a river",
      href: "https://en.wikipedia.org/wiki/2020_Bangalore_riots?utm_source=chatgpt.com",
      className: "slower slower-down"
    },
    {
      src: "../photos/case5.png",
      alt: "Sidewalk terrace of a blue facade cafe",
      href: "https://en.wikipedia.org/wiki/2020_Minneapolis_false_rumors_riot?utm_source=chatgpt.com",
      className: ""
    },
    {
      src: "../photos/case6.png",
      alt: "Paris waterfront at sunset",
      href: "https://en.wikipedia.org/wiki/2017_Baduria_riots?utm_source=chatgpt.com/",
      className: "slower"
    },
    {
      src: "../photos/case7.png",
      alt: "Old man leaning over the barrier looking at the river",
      href: "https://sabrangindia.in/fake-news-and-social-media-deadly-combination/?utm_source=chatgpt.com",
      className: "faster1"
    },
    {
      src: "../photos/case8.png",
      alt: "Cafe terrace with a row of retro tables",
      href: "https://www.thehindu.com/news/national/nothing-but-lies-fake-videos-rumour-set-off-the-lynch-mobs/article61516458.ece?utm_source=chatgpt.com",
      className: "slower slower2"
    },
    {
      src: "../photos/case9.png",
      alt: "Street scene with pedestrians and dogs",
      href: "https://en.wikipedia.org/wiki/2017_Baduria_riots?utm_source=chatgpt.com/",
      className: ""
    },
    {
      src: "../photos/case10.png",
      alt: "Tourist barge on the river seine near notre dame",
      href: "https://en.wikipedia.org/wiki/Direct_Action_Day?utm_source=chatgpt.com",
      className: "slower"
    },
    {
      src: "../photos/case11.png",
      alt: "Skulls decoration in a shop window",
      href: "https://en.wikipedia.org/wiki/2018_anti-Muslim_riots_in_Sri_Lanka",
      className: "slower last"
    }
  ];

  const ScrollIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-12 h-12 fill-current">
      <path d="M50,67.1c-0.6,0-1.2-0.2-1.8-0.7c-3.8-3.8-7.7-7.7-11.5-11.5c-2.3-2.3,1.2-5.8,3.5-3.5c2.5,2.5,4.9,4.9,7.4,7.4      c0-13.7,0-27.4,0-41.2c0-0.6,0.2-1.2,0.5-1.5c0,0,0,0,0,0c0.4-0.6,1.1-1,2-0.9c13.7,0.3,26.4,7.2,33.5,19.1      C96.5,55.9,84.7,85,60.2,91.6C35.5,98.2,11.6,79.1,11.1,54c-0.1-3.2,4.9-3.2,5,0c0.3,13.8,8.4,26.4,21.3,31.5      c12.5,5,27.1,1.9,36.6-7.5c9.5-9.5,12.5-24.1,7.5-36.6c-4.8-12.1-16.3-20.1-29-21.2c0,12.8,0,25.5,0,38.3      c2.5-2.5,4.9-4.9,7.4-7.4c2.3-2.3,5.8,1.3,3.5,3.5c-3.9,3.9-7.8,7.8-11.8,11.8C51.2,66.9,50.6,67.1,50,67.1z"/>
    </svg>
  );

  return (
   <div className="font-sans font-medium bg-gradient-to-r from-[#00FFFF]/30 via-[#0D1B2A]/60 to-[#00FFFF]/30 text-[#FFD700] backdrop-blur-md overflow-hidden relative h-[30rem] flex items-start">
      <style jsx>{`
        ::-webkit-scrollbar {
          width: 1px;
          height: 1px;
        }
        ::-webkit-scrollbar-button {
          width: 1px;
          height: 1px;
        }
        
        .horizontal-scroll-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100vh;
          transform: rotate(-90deg) translate3d(0,-100vh,0);
          transform-origin: right top;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 0;
          height: 100vw;
          perspective: 1px;
          transform-style: preserve-3d;
          padding-bottom: 10rem;
          // margin: 0 2rem 0 0 ;
        }
        
        .img-wrapper {
          transform: rotate(90deg);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 40vh;
          transform-origin: 50% 50%;
          transform: rotate(90deg) translateZ(.1px) scale(0.9) translateX(0px) translateY(-3vh);
          transition: 1s;
        }
        
        .img-wrapper:hover {
          min-height: 65vh;
        }
        
        .slower {
          transform: rotate(90deg) translateZ(-.2px) scale(1.1) translateX(0%) translateY(-10vh);
        }
        
        .faster1 {
          transform: rotate(90deg) translateZ(-.25px) scale(1.05) translateX(0%) translateY(8vh);
        }
        
        .slower2 {
          transform: rotate(90deg) translateZ(-.3px) scale(1.3) translateX(0%) translateY(2vh);
        }
        
        .slower-down {
          transform: rotate(90deg) translateZ(-.2px) scale(1.1) translateX(0%) translateY(16vh);
        }
        
        .faster {
          transform: rotate(90deg) translateZ(.15px) scale(0.8) translateX(0%) translateY(14vh);
        }
        
        .faster1 {
          transform: rotate(90deg) translateZ(.05px) scale(0.8) translateX(0%) translateY(10vh);
        }
        
        .vertical {
          transform: rotate(90deg) translateZ(-.15px) scale(1.15) translateX(0%) translateY(0%);
        }
        
        .last {
          transform: rotate(90deg) translateZ(-.2px) scale(1.1) translateX(25vh) translateY(-8vh);
        }
        
        .img-wrapper a {
          overflow: hidden;
          display: block;
          padding: 1vh;
          background: #efecdb;
          box-shadow: 0 10px 50px rgba(95, 47, 17, 0.5);
        }
        
        .img-wrapper img {
          max-width: 45vh;
          max-height: 50vh;
          transition: .5s;
          vertical-align: top;
          filter: saturate(40%) sepia(30%) hue-rotate(5deg);
        }
        
        .img-wrapper a:hover img {
          filter: none;
        }
      `}</style>
      
      <div className="horizontal-scroll-wrapper -mt-44">
        {images.map((image, index) => (
          <div key={index} className={`img-wrapper ${image.className}`}>
            <a href={image.href} target="_blank" rel="noopener noreferrer">
              <img src={image.src} alt={image.alt} />
            </a>
          </div>
        ))}
      </div>
      
      {/* <div className="absolute top-4 left-4 flex items-center text-[#5D4037]"> */}
        {/* <ScrollIcon /> */}
        {/* <span className="ml-2"></span> */}
      {/* </div> */}
      
      <header className="absolute bottom-4 left-4">
        {/* <p className="m-0">Postcards from Paris.</p> */}
        {/* <h1 className="font-light text-base m-0">CSS-only parallax horizontal gallery</h1> */}
        {/* <p className="m-0">
          Grab (these and more) photos from -{" "}
          <a 
            href="https://altphotos.com/free/paris/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#5D4037] font-medium hover:underline"
          >
            altphotos.
          </a>
        </p> */}
      </header>
    </div>
  );
};

export default ParallaxGallery;