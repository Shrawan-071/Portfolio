import { useState, useEffect, useRef } from 'react';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
  timestamp: number;
}

export function useMousePosition() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 }); // Normalized -1 to +1
  const [pixelPos, setPixelPos] = useState({ x: 0, y: 0 }); // Absolute pixel coordinates
  const [speed, setSpeed] = useState(0); // Mouse velocity/speed
  const [ripples, setRipples] = useState<ClickRipple[]>([]); // Click ripples queue
  
  const lastPos = useRef({ x: 0, y: 0, time: Date.now() });
  const speedTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      // Normalized coordinates (-1 to 1)
      const nx = (clientX / innerWidth) * 2 - 1;
      const ny = -(clientY / innerHeight) * 2 + 1; // Standard WebGL/Y-up orientation

      setMouse({ x: nx, y: ny });
      setPixelPos({ x: clientX, y: clientY });

      // Calculate speed
      const now = Date.now();
      const dt = now - lastPos.current.time;
      if (dt > 10) {
        const dx = clientX - lastPos.current.x;
        const dy = clientY - lastPos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const currentSpeed = Math.min(dist / dt, 10); // Clamp speed at 10 max
        setSpeed(currentSpeed);

        lastPos.current = { x: clientX, y: clientY, time: now };

        // Decay speed when mouse stops moving
        if (speedTimeoutRef.current) clearTimeout(speedTimeoutRef.current);
        speedTimeoutRef.current = setTimeout(() => {
          setSpeed(0);
        }, 150);
      }
    };

    const handleMouseClick = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      const nx = (clientX / innerWidth) * 2 - 1;
      const ny = -(clientY / innerHeight) * 2 + 1;

      const newRipple: ClickRipple = {
        id: Date.now() + Math.random(),
        x: clientX,
        y: clientY,
        normalizedX: nx,
        normalizedY: ny,
        timestamp: Date.now()
      };

      setRipples((prev) => [...prev, newRipple]);

      // Remove after 1 second (fade animation duration)
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
      if (speedTimeoutRef.current) clearTimeout(speedTimeoutRef.current);
    };
  }, []);

  return { mouse, pixelPos, speed, ripples };
}
