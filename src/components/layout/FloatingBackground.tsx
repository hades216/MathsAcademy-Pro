import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const FloatingBackground: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 20, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 20, damping: 40 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-brand-bg transition-colors duration-1000">
      {/* Light-Friendly Aurora Gradients */}
      <div className="absolute inset-0 opacity-40 dark:opacity-30">
        <motion.div 
          style={{ x: springX, y: springY }}
          className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] rounded-full bg-emerald-400/20 dark:bg-emerald-500/20 blur-[140px] animate-aurora"
        />
        <motion.div 
          className="absolute -bottom-[10%] -right-[10%] w-[70%] h-[70%] rounded-full bg-yellow-400/10 dark:bg-yellow-500/10 blur-[160px] animate-aurora [animation-delay:5s]"
        />
        <motion.div 
          className="absolute top-[20%] right-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/5 dark:bg-blue-500/5 blur-[120px] animate-aurora [animation-delay:10s]"
        />
      </div>

      {/* Professional Structural Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      
      {/* Texture for Premium "Paper" Feel in Light Mode */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] dark:opacity-[0.03] mix-blend-overlay"></div>
    </div>
  );
};

export default FloatingBackground;
