
import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  animationDuration: string;
}

const AnimatedBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Create particles
    const colors = [
      'bg-fis-primary', 
      'bg-fis-secondary', 
      'bg-fis-accent', 
      'bg-fis-highlight'
    ];
    
    const newParticles = Array.from({ length: 20 }).map((_, index) => {
      return {
        id: index,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        animationDuration: `${Math.random() * 20 + 10}s`
      };
    });
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`particle ${particle.color}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: particle.animationDuration,
            opacity: 0.1
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
