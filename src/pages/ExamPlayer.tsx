import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, CheckCircle2, Timer, Calculator, PenTool, Info, Flag } from 'lucide-react';
import { mathTopics } from '../data/mathData';

const ExamPlayer: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const topic = mathTopics[id || 'p1'] || mathTopics['p1'];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [flags, setFlags] = useState<Record<number, boolean>>({});

  const currentQuestion = topic.homework[currentQuestionIndex];
  const totalQuestions = topic.homework.length;

  const toggleFlag = (index: number) => {
    setFlags(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleInputChange = (partId: string, value: string) => {
    setUserAnswers(prev => ({ ...prev, [partId]: value }));
  };

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col font-sans overflow-hidden">
      {/* Exam Header */}
      <div className="relative z-10 bg-slate-900 border-b-2 border-indigo-500 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate(-1)} className="p-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all">
            <X className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white uppercase tracking-tight">{topic.title} - Formal Assessment</h1>
            <p className="text-xs font-bold text-slate-500">EXAM MODE: ANSWERS ARE HIDDEN UNTIL SUBMISSION</p>
          </div>
        </div>
        
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3 px-6 py-2 bg-rose-500/10 text-rose-500 rounded-xl border border-rose-500/20">
            <Timer className="w-5 h-5 animate-pulse" />
            <span className="text-xl font-black tabular-nums">45:00</span>
          </div>
          <button className="px-8 py-2 bg-indigo-600 text-white rounded-xl font-black hover:bg-indigo-700 transition-all shadow-lg">
            Submit Paper
          </button>
        </div>
      </div>

      <div className="flex-grow flex overflow-hidden">
        {/* Exam Navigation Sidebar */}
        <div className="w-24 bg-slate-900 border-r border-white/10 flex flex-col items-center py-10 gap-4 overflow-y-auto">
          {topic.homework.map((_, i) => {
             const isAnswered = topic.homework[i].parts.every(p => userAnswers[p.id]);
             return (
              <button
                key={i}
                onClick={() => setCurrentQuestionIndex(i)}
                className={`w-12 h-12 rounded-lg flex items-center justify-center font-black transition-all border-2 relative ${
                  currentQuestionIndex === i 
                    ? 'bg-indigo-600 border-white text-white shadow-xl scale-110' 
                    : isAnswered ? 'bg-slate-700 border-slate-600 text-slate-300' : 'bg-white/5 border-white/10 text-white/20'
                }`}
              >
                {i + 1}
                {flags[i] && <Flag className="w-3 h-3 absolute -top-1 -right-1 text-yellow-400 fill-yellow-400" />}
              </button>
             );
          })}
        </div>

        {/* Exam Body */}
        <div className="flex-grow flex flex-col bg-slate-950">
          <div className="flex-grow flex items-center justify-center p-12 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="w-full max-w-4xl"
              >
                <div className="bg-slate-900 p-16 rounded-[2rem] border border-white/10 shadow-3xl">
                   <div className="flex justify-between items-start mb-12">
                     <div className="max-w-2xl">
                       <h2 className="text-3xl font-black text-white mb-4">Question {currentQuestionIndex + 1}</h2>
                       <p className="text-xl text-slate-400 font-bold leading-relaxed">{currentQuestion.text}</p>
                     </div>
                     <button 
                       onClick={() => toggleFlag(currentQuestionIndex)}
                       className={`p-4 rounded-xl border transition-all ${flags[currentQuestionIndex] ? 'bg-yellow-400/10 border-yellow-400 text-yellow-400' : 'bg-white/5 border-white/10 text-slate-500'}`}
                     >
                       <Flag className="w-6 h-6" />
                     </button>
                   </div>

                   <div className="space-y-6">
                      {currentQuestion.parts.map((part) => (
                        <div key={part.id} className="flex items-center justify-between p-8 bg-slate-950/50 rounded-2xl border border-white/5">
                           <span className="text-xl font-bold text-slate-200">{part.question}</span>
                           <input 
                             type="text"
                             value={userAnswers[part.id] || ''}
                             onChange={(e) => handleInputChange(part.id, e.target.value)}
                             className="w-48 h-14 bg-slate-950 rounded-xl border-2 border-white/10 focus:border-indigo-600 text-white text-center text-2xl font-black outline-none transition-all"
                             placeholder="Answer"
                           />
                        </div>
                      ))}
                   </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Exam Footer */}
          <div className="bg-slate-900 border-t border-white/10 px-12 py-6 flex justify-between items-center">
            <div className="flex gap-4">
              <button className="p-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10"><Calculator className="w-5 h-5" /></button>
              <button className="p-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10"><PenTool className="w-5 h-5" /></button>
              <button className="p-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10"><Info className="w-5 h-5" /></button>
            </div>
            
            <div className="flex items-center gap-8">
              <button 
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-2 px-6 py-3 font-bold text-slate-500 hover:text-white disabled:opacity-0 transition-all"
              >
                <ChevronLeft className="w-5 h-5" /> Previous
              </button>
              
              {!isLastQuestion ? (
                <button 
                  onClick={() => setCurrentQuestionIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
                  className="px-10 py-4 bg-indigo-600 text-white rounded-xl font-black text-lg flex items-center gap-3 hover:bg-indigo-700 transition-all"
                >
                  Next Question <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button 
                  onClick={() => {
                    alert('Exam Paper Submitted Successfully.');
                    navigate('/library');
                  }}
                  className="px-12 py-4 bg-emerald-600 text-white rounded-xl font-black text-lg flex items-center gap-3 hover:bg-emerald-700 transition-all shadow-xl"
                >
                  Finalize & Submit <CheckCircle2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPlayer;
