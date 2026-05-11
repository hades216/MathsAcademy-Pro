import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, CheckCircle2, Volume2, Info, Layout } from 'lucide-react';
import { mathTopics } from '../data/mathData';

// --- Interactive Modules ---

const BeadsModule = ({ target }: { target: number }) => {
  const [h, setH] = useState(0);
  const [t, setT] = useState(0);
  const [o, setO] = useState(0);
  const val = h * 100 + t * 10 + o;

  return (
    <div className="flex flex-col items-center gap-12 w-full max-w-2xl mx-auto py-8">
      <div className="flex gap-12 h-64">
        {[ {label: 'H', val: h, set: setH}, {label: 'T', val: t, set: setT}, {label: 'O', val: o, set: setO} ].map((col, i) => (
          <div key={i} className="flex flex-col-reverse items-center gap-2 w-16 relative">
            <div className="absolute inset-x-1/2 -translate-x-1/2 w-1 h-full bg-white/20 rounded-full"></div>
            {[...Array(10)].map((_, bi) => (
              <button
                key={bi}
                onClick={() => col.set(bi + 1 === col.val ? bi : bi + 1)}
                className={`w-12 h-6 rounded-full z-10 transition-all ${bi < col.val ? 'bg-indigo-600 shadow-lg' : 'bg-white/10 hover:bg-white/20'}`}
              />
            ))}
            <div className="text-2xl font-black text-indigo-400 mt-4">{col.label}</div>
          </div>
        ))}
      </div>
      <div className="text-6xl font-black text-white tracking-tighter bg-white/5 px-12 py-6 rounded-2xl border border-white/10">
        {val}
      </div>
      {val === target && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2 text-emerald-400 font-black text-2xl">
          <CheckCircle2 /> Goal Achieved
        </motion.div>
      )}
    </div>
  );
};

const GridInputModule = ({ number }: { number: number }) => {
  const [val, setVal] = useState('');
  const isCorrect = parseInt(val) === number;

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="text-3xl font-bold text-slate-400 uppercase tracking-widest">Input Result: {number}</div>
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className={`w-64 h-24 bg-slate-900 rounded-2xl text-center text-6xl font-black border-4 outline-none transition-all ${isCorrect ? 'border-emerald-500 text-emerald-400' : 'border-white/10 focus:border-indigo-600 text-white'}`}
        placeholder="???"
      />
      {isCorrect && <div className="text-emerald-400 font-bold text-xl">Verification Successful</div>}
    </div>
  );
};

const MultipleChoiceModule = ({ data }: { data: any }) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {data.options.map((opt: string) => (
        <button
          key={opt}
          onClick={() => setSelected(opt)}
          className={`p-10 rounded-3xl border-4 transition-all text-4xl font-black ${
            selected === opt
              ? opt === data.answer
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                : 'bg-rose-500/10 border-rose-500 text-rose-400'
              : 'bg-white/5 border-white/5 hover:border-white/20 text-white'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};

// --- Lesson Player Component ---

const LessonPlayer: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const topic = mathTopics[id || 'p1'] || mathTopics['p1'];
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = topic.lesson.length;
  const slide = topic.lesson[currentSlide];

  const renderModule = () => {
    switch (slide.interactiveType) {
      case 'beads': return <BeadsModule target={slide.interactiveData?.target} />;
      case 'grid-input': return <GridInputModule number={slide.interactiveData?.number || slide.interactiveData?.answer} />;
      case 'multiple-choice': return <MultipleChoiceModule data={slide.interactiveData} />;
      default: return (
        <div className="flex flex-col items-center justify-center py-20 text-center opacity-30">
          <Info className="w-16 h-16 text-white mb-8" />
          <p className="text-2xl font-black text-white uppercase tracking-[0.2em]">Curriculum Resource</p>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col font-sans overflow-hidden">
      <div className="relative z-10 bg-slate-900 border-b border-white/5 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate(-1)} className="p-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all border border-white/10">
            <X className="w-5 h-5" />
          </button>
          <div className="h-10 w-px bg-white/10"></div>
          <div>
            <h1 className="text-xl font-bold text-white">{topic.title}</h1>
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Section {currentSlide + 1} of {totalSlides}</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-white/5 text-white rounded-xl font-bold border border-white/10 hover:bg-white/10 transition-all">
          <Layout className="w-4 h-4" /> Index
        </button>
      </div>

      <div className="flex-grow flex overflow-hidden relative z-10">
        <div className="w-20 bg-slate-900 border-r border-white/5 flex flex-col items-center py-10 gap-5 overflow-y-auto">
          {topic.lesson.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-all border-2 ${
                currentSlide === i 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl' 
                  : i < currentSlide ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-white/5 border-white/10 text-white/20'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="flex-grow flex flex-col bg-slate-950">
          <div className="flex-grow flex items-center justify-center p-12 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full max-w-5xl"
              >
                <div className="ui-card p-16 border-white/5">
                  <div className="mb-12">
                    <h2 className="text-4xl font-black text-white mb-6">{slide.title}</h2>
                    <div className="h-1 w-20 bg-indigo-600 rounded-full mb-8"></div>
                    <p className="text-2xl text-slate-400 font-bold leading-relaxed">{slide.content}</p>
                  </div>
                  <div className="bg-white/[0.02] rounded-3xl p-12 border border-white/5 min-h-[400px] flex items-center justify-center">
                    {renderModule()}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="bg-slate-900 border-t border-white/5 px-12 py-6 flex justify-between items-center">
            <div className="flex gap-4">
              <button className="p-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10"><Volume2 className="w-5 h-5" /></button>
              <button className="p-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10"><Info className="w-5 h-5" /></button>
            </div>
            <div className="flex items-center gap-8">
              <button 
                onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
                disabled={currentSlide === 0}
                className="flex items-center gap-3 px-8 py-4 font-bold text-lg text-slate-500 hover:text-white disabled:opacity-0 transition-all"
              >
                <ChevronLeft className="w-5 h-5" /> Previous
              </button>
              {currentSlide < totalSlides - 1 ? (
                <button 
                  onClick={() => setCurrentSlide(prev => Math.min(totalSlides - 1, prev + 1))}
                  className="px-10 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg flex items-center gap-3 hover:bg-indigo-700 transition-all shadow-xl"
                >
                  Continue <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button 
                  onClick={() => navigate('/library')}
                  className="px-10 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg flex items-center gap-3 hover:bg-emerald-700 transition-all shadow-xl"
                >
                  Complete Module <CheckCircle2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPlayer;
