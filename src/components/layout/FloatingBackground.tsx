import React from 'react';
import { motion } from 'framer-motion';

const FloatingBackground: React.FC = () => {
  // Planet Data: [name, distance, size, color, speed]
  const planets = [
    { name: 'Mercury', dist: 80, size: 4, color: '#9ca3af', speed: 10 },
    { name: 'Venus', dist: 120, size: 8, color: '#fbbf24', speed: 15 },
    { name: 'Earth', dist: 170, size: 9, color: '#3b82f6', speed: 20 },
    { name: 'Mars', dist: 220, size: 7, color: '#ef4444', speed: 25 },
    { name: 'Jupiter', dist: 300, size: 20, color: '#f59e0b', speed: 40 },
    { name: 'Saturn', dist: 380, size: 18, color: '#d97706', speed: 50 },
    { name: 'Uranus', dist: 450, size: 12, color: '#67e8f9', speed: 60 },
    { name: 'Neptune', dist: 510, size: 11, color: '#4f46e5', speed: 70 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020617]">
      {/* Professional Architectural Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:100px_100px] opacity-[0.1]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:20px_20px] opacity-[0.05]"></div>

      {/* Star Field */}
      <div className="absolute inset-0">
        {[...Array(200)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 'px',
              height: Math.random() * 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.2
            }}
          />
        ))}
      </div>

      {/* Solar System Container */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 perspective-[2000px]">
        {/* The Sun */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 50px #fbbf24',
              '0 0 100px #f59e0b',
              '0 0 50px #fbbf24'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 bg-yellow-400 rounded-full z-10 relative shadow-[0_0_80px_#fbbf24]"
        />

        {/* Orbits and Planets */}
        {planets.map((planet, i) => (
          <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* Orbit Path */}
            <div 
              className="rounded-full border border-white/5"
              style={{
                width: planet.dist * 2,
                height: planet.dist * 2,
              }}
            />
            
            {/* Revolving Planet Wrapper */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: planet.speed,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                width: planet.dist * 2,
                height: planet.dist * 2,
              }}
              className="absolute top-0 left-0"
            >
              {/* The Planet */}
              <div 
                className="absolute rounded-full shadow-lg"
                style={{
                  width: planet.size,
                  height: planet.size,
                  backgroundColor: planet.color,
                  left: '50%',
                  top: -planet.size / 2,
                  boxShadow: `0 0 15px ${planet.color}`
                }}
              />
            </motion.div>
          </div>
        ))}
      </div>

      {/* Atmospheric Space Haze */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/10 via-transparent to-emerald-900/10 mix-blend-overlay"></div>
      
      {/* Noise Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
    </div>
  );
};

export default FloatingBackground;
