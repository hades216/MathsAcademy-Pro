import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator as CalcIcon, X } from 'lucide-react';

interface ToolProps {
  onClose: () => void;
}

export const Calculator: React.FC<ToolProps> = ({ onClose }) => {
  const [display, setDisplay] = useState('0');

  const btn = (label: string, action?: () => void) => (
    <button 
      onClick={action || (() => setDisplay(prev => prev === '0' ? label : prev + label))}
      className="p-4 bg-white/5 hover:bg-white/10 rounded-xl font-bold text-xl transition-all active:scale-95 border border-white/10"
    >
      {label}
    </button>
  );

  const calculate = () => {
    try {
      // Basic safety: only allow numbers and operators
      const result = eval(display.replace(/[^-+*/.0-9]/g, ''));
      setDisplay(result.toString());
    } catch {
      setDisplay('Error');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed bottom-32 right-10 w-80 ui-card p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-[200]"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-indigo-400">
          <CalcIcon className="w-5 h-5" />
          <span className="font-bold uppercase tracking-widest text-xs">Calculator</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-all"><X className="w-4 h-4" /></button>
      </div>

      <div className="bg-slate-950 p-6 rounded-2xl mb-6 text-right border border-white/5 overflow-hidden">
        <div className="text-4xl font-black text-white truncate tabular-nums">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {['7', '8', '9', '/'].map(l => btn(l))}
        {['4', '5', '6', '*'].map(l => btn(l))}
        {['1', '2', '3', '-'].map(l => btn(l))}
        {btn('0')}
        {btn('.', () => setDisplay(prev => prev.includes('.') ? prev : prev + '.'))}
        {btn('C', () => setDisplay('0'))}
        {btn('+', () => setDisplay(prev => prev + '+'))}
        <button 
          onClick={calculate}
          className="col-span-4 p-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-black text-xl transition-all"
        >
          =
        </button>
      </div>
    </motion.div>
  );
};

export const WritingBoard: React.FC<ToolProps> = ({ onClose }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="fixed inset-y-32 right-10 w-[500px] ui-card p-6 shadow-3xl z-[200] flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-indigo-400">
          <PenTool className="w-5 h-5" />
          <span className="font-bold uppercase tracking-widest text-xs">Writing Board</span>
        </div>
        <div className="flex gap-4">
          <button onClick={clear} className="p-2 hover:bg-white/10 rounded-lg transition-all text-xs font-bold uppercase tracking-widest text-white/40">Clear</button>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-all"><X className="w-4 h-4" /></button>
        </div>
      </div>
      <canvas 
        ref={canvasRef}
        width={450}
        height={600}
        className="flex-grow bg-slate-950 rounded-2xl cursor-crosshair border border-white/5"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={() => setIsDrawing(false)}
        onMouseLeave={() => setIsDrawing(false)}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={() => setIsDrawing(false)}
      />
    </motion.div>
  );
};

const PenTool = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l5 5"></path><path d="M11 11l5 5"></path></svg>
);
