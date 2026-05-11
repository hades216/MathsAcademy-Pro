import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2, Maximize2, X, RotateCcw, PenTool } from 'lucide-react';
import { mathTopics } from '../data/mathData';

const LessonPlayer: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const topic = mathTopics[id || 'p1'] || mathTopics['p1'];
  const slides = topic.lessons.slides;

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-[100] flex flex-col">
      {/* Player Header */}
      <div className="bg-mymaths-dark p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
          <div>
            <h2 className="font-bold text-lg leading-tight">{topic.title}</h2>
            <p className="text-xs text-mymaths-light">Lesson Slide {currentSlide + 1} of {slides.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <PlayerTool icon={<Volume2 className="w-5 h-5" />} />
          <PlayerTool icon={<PenTool className="w-5 h-5" />} />
          <PlayerTool icon={<RotateCcw className="w-5 h-5" />} />
          <PlayerTool icon={<Maximize2 className="w-5 h-5" />} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow relative flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full max-w-5xl aspect-video bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="bg-slate-50 border-b border-gray-100 p-6">
              <h3 className="text-2xl font-black text-mymaths-dark">{slides[currentSlide].title}</h3>
            </div>
            <div className="flex-grow p-12 flex flex-col items-center justify-center text-center">
              <p className="text-2xl text-gray-700 leading-relaxed max-w-2xl">
                {slides[currentSlide].content}
              </p>
              
              {/* Animation Placeholder */}
              <div className="mt-12 w-full max-w-md h-64 bg-slate-100 rounded-3xl border-4 border-dashed border-slate-200 flex items-center justify-center">
                <div className="text-slate-400 font-bold italic">Interactive animation content here</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Player Footer / Controls */}
      <div className="bg-mymaths-dark p-6 flex justify-between items-center">
        <div className="flex gap-4">
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-black transition-all ${currentSlide === 0 ? 'bg-white/5 text-white/20' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            <ChevronLeft className="w-6 h-6" /> Previous
          </button>
        </div>

        <div className="flex-grow flex justify-center gap-2 px-8">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-500 ${i === currentSlide ? 'bg-mymaths-blue w-12' : 'bg-white/20 w-4'}`}
            />
          ))}
        </div>

        <div className="flex gap-4">
          <button 
            onClick={nextSlide}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-black transition-all ${currentSlide === slides.length - 1 ? 'bg-mymaths-green text-white hover:brightness-110' : 'bg-mymaths-blue text-white hover:brightness-110'}`}
          >
            {currentSlide === slides.length - 1 ? 'Finish Lesson' : 'Next'} <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

const PlayerTool = ({ icon }: { icon: React.ReactNode }) => (
  <button className="p-3 hover:bg-white/10 rounded-xl transition-all text-white/70 hover:text-white">
    {icon}
  </button>
);

export default LessonPlayer;
