import { useEffect, useRef } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

interface TrailParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { pixelPos, speed } = useMousePosition();
  const particlesRef = useRef<TrailParticle[]>([]);
  const lastPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Disable on mobile/touch screens to ensure professional, readable layout
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Keep active list of colors
    const colors = ['#06b6d4', '#0891b2', '#8b5cf6', '#a78bfa', '#ec4899'];

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Generate particles if cursor has moved
      const dx = pixelPos.x - lastPosRef.current.x;
      const dy = pixelPos.y - lastPosRef.current.y;
      const moved = Math.sqrt(dx * dx + dy * dy);

      if (moved > 1 && pixelPos.x > 0 && pixelPos.y > 0) {
        // Emit more particles if mouse is moving fast
        const count = Math.min(Math.floor(speed * 1.5) + 1, 6);
        
        for (let i = 0; i < count; i++) {
          particlesRef.current.push({
            x: pixelPos.x + (Math.random() - 0.5) * 8,
            y: pixelPos.y + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 1.5 - dx * 0.1, // Add slight momentum opposite of motion
            vy: (Math.random() - 0.5) * 1.5 - dy * 0.1,
            alpha: 1,
            size: Math.random() * 5 + 3,
            color: colors[Math.floor(Math.random() * colors.length)]
          });
        }

        lastPosRef.current = { x: pixelPos.x, y: pixelPos.y };
      }

      // 2. Update and draw existing particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.025; // Decay alpha (fading)
        p.size *= 0.95;  // Shrink particle

        if (p.alpha <= 0 || p.size < 0.5) return false;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        // Add a soft glow behind each particle
        ctx.shadowBlur = p.size * 2;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();

        return true;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [pixelPos, speed]);

  return (
    <canvas
      ref={canvasRef}
      id="mouse-trail-canvas"
      className="fixed inset-0 w-full h-full z-40 pointer-events-none select-none opacity-80"
    />
  );
}
