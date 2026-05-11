import React from 'react';
import { motion } from 'framer-motion';

const FloatingBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-brand-bg transition-colors duration-1000">
      {/* Animated Aurora Gradients */}
      <div className="absolute inset-0 opacity-50 dark:opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-indigo-500/30 to-transparent blur-[150px] animate-aurora"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-gradient-to-tl from-purple-500/20 to-transparent blur-[150px] animate-aurora [animation-delay:2s]"></div>
        <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-bl from-blue-500/20 to-transparent blur-[120px] animate-aurora [animation-delay:4s]"></div>
      </div>

      {/* Floating 3D-ish Shapes */}
      <div className="absolute inset-0 perspective-[1000px]">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-sm rounded-3xl preserve-3d shadow-2xl"
            style={{
              width: Math.random() * 150 + 50,
              height: Math.random() * 150 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              rotateX: [0, 360],
              rotateY: [0, 360],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: Math.random() * 25 + 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Surface Patterns */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
    </div>
  );
};

export default FloatingBackground;
