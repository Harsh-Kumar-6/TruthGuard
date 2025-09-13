import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const CardStackComponent = () => {
  const cardsRef = useRef([]);
  const containerRef = useRef(null);

  const cardData = [
    {
      id: 1,
      tagline: "Amon The Sign",
      title: "Zzor / Bass",
      excerpt: "Zzor es el bajista de la banda de Darkwave española: Amon The sign",
      image: "../photos/case1.png",
      alt: "Zzor"
    },
    {
      id: 2,
      tagline: "Amon The Sign",
      title: "Amón Lopez / Vocals",
      excerpt: "Amon Lopez es la voz masculina de la banda de Darkwave española: Amon The sign",
      // image: "https://www.ats.hugo-salazar.com/wp-content/uploads/2023/04/pincho.jpeg",
      alt: "Amon Lopez"
    },
    {
      id: 3,
      tagline: "Amon The Sign",
      title: "Marisa / Vocals",
      excerpt: "Marisa es la voz femenina de la banda de Darkwave española: Amon The sign",
      image: "https://www.ats.hugo-salazar.com/wp-content/uploads/2023/04/marisa.jpeg",
      alt: "Marisa"
    },
    {
      id: 4,
      tagline: "Amon The Sign",
      title: "Vicente / Guitars",
      excerpt: "Vicente es el guitarrista de la banda de Darkwave española: Amon The sign",
      image: "https://www.ats.hugo-salazar.com/wp-content/uploads/2023/04/vicente.jpeg",
      alt: "Vicente Payá"
    },
    {
      id: 5,
      tagline: "Amon The Sign",
      title: "Leoben Conoy / Synths",
      excerpt: "Leoben Conoy es el teclista de la banda de Darkwave española: Amon The sign",
      image: "https://www.ats.hugo-salazar.com/wp-content/uploads/2023/04/leoben.jpeg",
      alt: "Leoben Conoy"
    }
  ];

  useEffect(() => {
    // Clean up previous ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const cards = cardsRef.current.filter(card => card !== null);
    if (cards.length === 0) return;

    const lastCardIndex = cards.length - 1;

    // Create ScrollTrigger for the first and last card
    const firstCardST = ScrollTrigger.create({
      trigger: cards[1],
      start: "center center"
    });

    const lastCardST = ScrollTrigger.create({
      trigger: cards[lastCardIndex],
      start: "center center"
    });

    // Iterate over each card
    cards.forEach((card, index) => {
      const scale = index === lastCardIndex ? 1 : 0.5;
      const scaleDown = gsap.to(card, {
        scale: scale,
      });

      ScrollTrigger.create({
        trigger: card,
        start: "top-=150 top",
        end: () => lastCardST.start,
        pin: true,
        pinSpacing: false,
        scrub: 0.5,
        ease: "none",
        animation: scaleDown,
        toggleActions: "restart none none reverse"
      });
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-transaprent" ref={containerRef}>
      <style jsx>{`
        .card-container {
          font-family: sans-serif;
          max-width: 80vh;
        }
        
        .header-section {
        //   max-width: 1024px;
          margin: 0 auto;
          padding: 64px 20px;
          color: white;
          text-align: center;
        }
        
        .header-section p {
          margin-bottom: 16px;
        }
        
        .header-section h1 {
          margin-bottom: 24px;
          font-size: 44px;
          font-weight: bold;
        }
        
        .header-section .description {
          margin-bottom: 24px;
          font-size: 18px;
          line-height: 32px;
        }
        
        .header-section a {
          font-size: 24px;
          color: white;
          opacity: 1;
          transition: opacity 0.3s linear;
        }
        
        .header-section a:hover {
          opacity: 0.8;
        }
        
        .cards-layout {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .card {
          display: grid;
          grid-template-columns: 1fr 1fr; /* left: text, right: image */
           background: linear-gradient(to bottom, #0a0a0a, rgba(30, 58, 138, 3), #000000);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.4);
          color: #fff;
          height: 40rem;
          margin-bottom: 6rem;
        }

        
        .card-description {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px;
        }
        
        .card-tagline {
          font-size: 16px;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        
        .card-title {
          font-size: 36px;
          font-weight: bold;
          margin-bottom: 16px;
        }
        
        .card-excerpt {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 32px;
        }
        
        .card-cta {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .card-cta a {
          width: max-content;
          padding: 12px 24px;
          border: 1px solid black;
          color: black;
          font-size: 16px;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .card-cta a:hover {
          background-color: black;
          color: white;
        }
        
        .card-figure {
          position: relative;
          overflow: hidden;
        }
        
        .card-figure img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .spacer {
          width: 100%;
          height: 100vh;
        }
        
        @media (max-width: 768px) {
          .card {
            grid-template-columns: 1fr;
            height: auto;
            min-height: 500px;
          }
          
          .card-description {
            padding: 24px;
          }
          
          .card-title {
            font-size: 24px;
          }
          
          .header-section h1 {
            font-size: 32px;
          }
        }
      `}</style>
      
      <header className="header-section">
        <p></p>
        <h1>Shielding You From Misinformation.</h1>
        <div className="description">
          Get instant fact verification with AI that scans multiple sources in seconds.
        </div>
        
        <a 
          href="https://codepen.io/HugoSalazar/pen/dyBzOdj?editors=1100" 
          target="_blank" 
          rel="noopener noreferrer"
        >
        </a>
      </header>
      
      <div className="cards-layout">
        {cardData.map((card, index) => (
          <div 
            key={card.id} 
            className="card"
            ref={el => cardsRef.current[index] = el}
          >
            <div className="card-description">
              <div className="card-tagline">
                {card.tagline}
              </div>
              
              <h1 className="card-title">
                {card.title}
              </h1>
              
              <div className="card-excerpt">
                {card.excerpt}
              </div>
              
              <div className="card-cta">
                <a 
                  href="https://www.youtube.com/watch?v=aqacOQpfbxc&ab_channel=AmonTheSign" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Escuchar en Youtube
                </a>
              </div>
            </div>

            <figure className="card-figure">
              <img src={card.image} alt={card.alt} />
            </figure>
          </div>
        ))}
      </div>

      {/* <div className="spacer"></div> */}
    </div>
  );
};

export default CardStackComponent;