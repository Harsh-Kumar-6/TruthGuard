import React, { useEffect, useRef } from "react";
import "./StarsBackground.css";

export default function StarsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Stars
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      delta: Math.random() * 0.02 + 0.005,
    }));

    // Meteors
    const meteors = [];

    function createMeteor() {
      const startX = Math.random() * canvas.width;
      const startY = Math.random() * canvas.height / 2; // top half
      const speed = Math.random() * 5 + 5;
      const length = Math.random() * 80 + 50;
      meteors.push({ x: startX, y: startY, speed, length });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animate stars
      stars.forEach((star) => {
        star.alpha += star.delta;
        if (star.alpha <= 0 || star.alpha >= 1) star.delta *= -1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
        ctx.fill();
      });

      // Animate meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const meteor = meteors[i];
        meteor.x += meteor.speed;
        meteor.y += meteor.speed;

        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(meteor.x - meteor.length, meteor.y - meteor.length);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Remove meteor if out of screen
        if (meteor.x - meteor.length > canvas.width || meteor.y - meteor.length > canvas.height) {
          meteors.splice(i, 1);
        }
      }

      // Randomly create meteors
      if (Math.random() < 0.01) {
        createMeteor();
      }

      requestAnimationFrame(animate);
    }

    animate();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return <canvas ref={canvasRef} className="stars-canvas"></canvas>;
}
