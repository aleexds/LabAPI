import { useEffect, useRef } from 'react';

export const PortalBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Partículas concentradas para la espiral del portal
    const numParticles = 120;
    const particles = Array.from({ length: numParticles }, (_, i) => ({
      angle: (i / numParticles) * Math.PI * 8,
      distance: (i / numParticles) * 180, // Radio máximo del portal central
      speed: 0.015 + Math.random() * 0.01,
      size: 2 + Math.random() * 3,
      color: i % 2 === 0 ? '#00ff88' : '#a6ff00'
    }));

    let rotation = 0;

    const render = () => {
      // Limpia la pantalla completa manteniendo el fondo oscuro
      ctx.clearRect(0, 0, width, height);

      // Centro exacto de la pantalla
      const centerX = width / 2;
      const centerY = height / 2;

      rotation += 0.02;

      // 1. Resplandor verdoso central
      const radialGlow = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 220);
      radialGlow.addColorStop(0, 'rgba(166, 255, 0, 0.35)');
      radialGlow.addColorStop(0.4, 'rgba(0, 255, 136, 0.2)');
      radialGlow.addColorStop(1, 'rgba(11, 3, 20, 0)');

      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 220, 0, Math.PI * 2);
      ctx.fill();

      // 2. Anillos de energía del portal en el centro
      ctx.lineWidth = 2;
      for (let r = 40; r <= 160; r += 40) {
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.15)';
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 3. Partículas giratorias en forma de vortice/espiral centrado
      particles.forEach((p) => {
        p.angle += p.speed;
        
        // Coordenadas polares a cartesianas centradas
        const currentAngle = p.angle + rotation;
        const x = centerX + Math.cos(currentAngle) * p.distance;
        const y = centerY + Math.sin(currentAngle) * (p.distance * 0.85); // Forma ligeramente ovalada

        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: -1
      }}
    />
  );
};