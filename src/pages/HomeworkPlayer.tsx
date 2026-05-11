import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ChevronLeft, ChevronRight, AlertCircle, Save, Info, Calculator as CalcIcon, PenTool, Check, HelpCircle } from 'lucide-react';
import { mathTopics } from '../data/mathData';
import { Calculator, WritingBoard } from '../components/tools/HelpingTools';

const HomeworkPlayer: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const topic = mathTopics[id || 'p1'] || mathTopics['p1'];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [markedStatus, setMarkedStatus] = useState<Record<string, 'correct' | 'incorrect' | 'pending'>>({});
  const [isMarking, setIsMarking] = useState(false);
  
  // Tool States
  const [showCalculator, setShowCalculator] = useState(false);
  const [showWritingBoard, setShowWritingBoard] = useState(false);

  const currentQuestion = topic.homework[currentQuestionIndex];
  const totalQuestions = topic.homework.length;

  const handleInputChange = (partId: string, value: string) => {
    setUserAnswers(prev => ({ ...prev, [partId]: value }));
    setMarkedStatus(prev => ({ ...prev, [partId]: 'pending' }));
  };

  const markQuestion = () => {
    setIsMarking(true);
    const newStatus = { ...markedStatus };
    currentQuestion.parts.forEach(part => {
      const isCorrect = userAnswers[part.id]?.toString().trim() === part.answer.toString();
      newStatus[part.id] = isCorrect ? 'correct' : 'incorrect';
    });
    setMarkedStatus(newStatus);
    setTimeout(() => setIsMarking(false), 500);
  };

  const calculateScore = () => {
    const totalParts = topic.homework.reduce((acc, q) => acc + q.parts.length, 0);
    const correctParts = Object.values(markedStatus).filter(s => s === 'correct').length;
    return { score: correctParts, total: totalParts };
  };

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <div className="relative z-10 bg-slate-900 border-b border-white/5 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate(-1)} className="p-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all border border-white/10">
            <X className="w-5 h-5" />
          </button>
          <div className="h-10 w-px bg-white/10"></div>
          <div>
            <h1 className="text-xl font-bold text-white">{topic.title}</h1>
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Question {currentQuestionIndex + 1} of {totalQuestions}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-6 py-2 bg-emerald-600/10 text-emerald-400 rounded-xl font-bold border border-emerald-600/20">
            <Save className="w-4 h-4" /> Save Progress
          </button>
        </div>
      </div>

      <div className="flex-grow flex overflow-hidden">
        {/* Sidebar Question Nav */}
        <div className="w-24 bg-slate-900 border-r border-white/5 flex flex-col items-center py-10 gap-5 overflow-y-auto">
          {topic.homework.map((_, i) => {
            const qParts = topic.homework[i].parts;
            const allMarked = qParts.every(p => markedStatus[p.id] && markedStatus[p.id] !== 'pending');
            const allCorrect = qParts.every(p => markedStatus[p.id] === 'correct');

            return (
              <button
                key={i}
                onClick={() => setCurrentQuestionIndex(i)}
                className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center transition-all border-2 ${
                  currentQuestionIndex === i 
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl scale-110' 
                    : allMarked 
                      ? allCorrect ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                      : 'bg-white/5 border-white/10 text-white/20'
                }`}
              >
                <span className="text-sm font-black">{i + 1}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="flex-grow flex flex-col bg-slate-950 relative">
          <div className="flex-grow flex items-center justify-center p-12 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full max-w-4xl"
              >
                <div className="ui-card p-12 border-white/5 bg-slate-900/50">
                  <div className="mb-10 flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">{currentQuestion.text}</h2>
                      <div className="h-1 w-16 bg-indigo-600 rounded-full"></div>
                    </div>
                    <div className="bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-xl border border-indigo-500/20 flex items-center gap-2">
                       <HelpCircle className="w-4 h-4" />
                       <span className="text-xs font-black uppercase tracking-widest">Tutorial Available</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {currentQuestion.parts.map((part) => (
                      <div key={part.id} className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-white/[0.02] border border-white/5 rounded-2xl group transition-all">
                        <div className="text-xl font-bold text-slate-300">{part.question}</div>
                        <div className="flex items-center gap-4">
                          <input
                            type="text"
                            value={userAnswers[part.id] || ''}
                            onChange={(e) => handleInputChange(part.id, e.target.value)}
                            className={`w-40 h-14 bg-slate-950 rounded-xl border-2 text-center text-2xl font-black outline-none transition-all ${
                              markedStatus[part.id] === 'correct' 
                                ? 'border-emerald-500 text-emerald-400' 
                                : markedStatus[part.id] === 'incorrect' 
                                  ? 'border-rose-500 text-rose-400' 
                                  : 'border-white/10 focus:border-indigo-600 text-white'
                            }`}
                            placeholder="?"
                          />
                          {markedStatus[part.id] === 'correct' && <CheckCircle2 className="text-emerald-500 w-8 h-8" />}
                          {markedStatus[part.id] === 'incorrect' && <AlertCircle className="text-rose-500 w-8 h-8" />}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 pt-12 border-t border-white/5 flex justify-end">
                    <button 
                      onClick={markQuestion}
                      disabled={isMarking}
                      className="px-12 py-5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-2xl font-black text-xl shadow-xl shadow-indigo-600/20 transition-all flex items-center gap-3"
                    >
                      {isMarking ? 'Checking...' : 'Mark It'} <Check className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Helper Tools Overlay */}
          <AnimatePresence>
            {showCalculator && <Calculator onClose={() => setShowCalculator(false)} />}
            {showWritingBoard && <WritingBoard onClose={() => setShowWritingBoard(false)} />}
          </AnimatePresence>

          {/* Footer Nav with Helping Tools */}
          <div className="bg-slate-900 border-t border-white/5 px-12 py-6 flex justify-between items-center">
            <div className="flex gap-4">
              <button 
                onClick={() => setShowCalculator(!showCalculator)}
                className={`p-4 rounded-xl border transition-all ${showCalculator ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}
              >
                <CalcIcon className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setShowWritingBoard(!showWritingBoard)}
                className={`p-4 rounded-xl border transition-all ${showWritingBoard ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}
              >
                <PenTool className="w-6 h-6" />
              </button>
              <button className="p-4 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10"><Info className="w-6 h-6" /></button>
            </div>
            
            <div className="flex items-center gap-6">
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
                  className="px-10 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold text-lg flex items-center gap-3 transition-all"
                >
                  Next <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button 
                  onClick={() => {
                    const result = calculateScore();
                    alert(`Submission Successful! Score: ${result.score} / ${result.total}`);
                    navigate('/library');
                  }}
                  className="px-12 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg flex items-center gap-3 hover:bg-emerald-700 transition-all shadow-xl"
                >
                  Submit Final Paper <CheckCircle2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeworkPlayer;
