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
    <div className="fixed inset-0 bg-brand-bg z-[100] flex flex-col font-sans overflow-hidden transition-colors duration-700">
      {/* Header */}
      <div className="relative z-10 bg-brand-bg border-b border-black/5 dark:border-white/5 px-4 sm:px-8 py-4 flex justify-between items-center transition-colors duration-700">
        <div className="flex items-center gap-4 sm:gap-6">
          <button onClick={() => navigate(-1)} className="p-2 sm:p-2.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-brand-text rounded-xl transition-all border border-black/10 dark:border-white/10">
            <X className="w-5 h-5" />
          </button>
          <div className="hidden sm:block h-10 w-px bg-black/10 dark:bg-white/10"></div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-brand-text truncate max-w-[150px] sm:max-w-xs">{topic.title}</h1>
            <p className="text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Question {currentQuestionIndex + 1} of {totalQuestions}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center gap-2 px-6 py-2 bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 rounded-xl font-bold border border-emerald-600/20">
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </div>

      <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar Question Nav - Horizontal on mobile, vertical on desktop */}
        <div className="w-full md:w-24 bg-brand-bg border-b md:border-b-0 md:border-r border-black/5 dark:border-white/5 flex md:flex-col items-center py-4 md:py-10 px-4 md:px-0 gap-3 md:gap-5 overflow-x-auto md:overflow-y-auto transition-colors duration-700 flex-shrink-0">
          {topic.homework.map((_, i) => {
            const qParts = topic.homework[i].parts;
            const allMarked = qParts.every(p => markedStatus[p.id] && markedStatus[p.id] !== 'pending');
            const allCorrect = qParts.every(p => markedStatus[p.id] === 'correct');

            return (
              <button
                key={i}
                onClick={() => setCurrentQuestionIndex(i)}
                className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl flex flex-col items-center justify-center transition-all border-2 ${
                  currentQuestionIndex === i 
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-xl md:scale-110' 
                    : allMarked 
                      ? allCorrect ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/20 border-rose-500/40 text-rose-600 dark:text-rose-400'
                      : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-brand-muted'
                }`}
              >
                <span className="text-sm font-black">{i + 1}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="flex-grow flex flex-col bg-brand-bg relative overflow-hidden transition-colors duration-700">
          <div className="flex-grow flex items-start md:items-center justify-center p-4 sm:p-8 md:p-12 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full max-w-4xl"
              >
                <div className="ui-card p-6 sm:p-8 md:p-12 border-black/5 dark:border-white/5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-3xl shadow-2xl rounded-[2rem] sm:rounded-[3rem]">
                  <div className="mb-8 md:mb-10 flex flex-col md:flex-row justify-between items-start gap-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-brand-text mb-4 leading-tight">{currentQuestion.text}</h2>
                      <div className="h-1 w-16 bg-emerald-600 rounded-full"></div>
                    </div>
                    <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-xl border border-emerald-500/20 flex items-center gap-2 flex-shrink-0">
                       <HelpCircle className="w-4 h-4" />
                       <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest">Tutorial</span>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    {currentQuestion.parts.map((part) => (
                      <div key={part.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 p-6 sm:p-8 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-2xl group transition-all">
                        <div className="text-lg sm:text-xl font-bold text-brand-text">{part.question}</div>
                        <div className="flex items-center gap-4 self-end md:self-auto">
                          <input
                            type="text"
                            value={userAnswers[part.id] || ''}
                            onChange={(e) => handleInputChange(part.id, e.target.value)}
                            className={`w-32 sm:w-40 h-12 sm:h-14 bg-brand-bg rounded-xl border-2 text-center text-xl sm:text-2xl font-black outline-none transition-all ${
                              markedStatus[part.id] === 'correct' 
                                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' 
                                : markedStatus[part.id] === 'incorrect' 
                                  ? 'border-rose-500 text-rose-600 dark:text-rose-400' 
                                  : 'border-black/10 dark:border-white/10 focus:border-emerald-600 text-brand-text'
                            }`}
                            placeholder="?"
                          />
                          {markedStatus[part.id] === 'correct' && <CheckCircle2 className="text-emerald-500 w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />}
                          {markedStatus[part.id] === 'incorrect' && <AlertCircle className="text-rose-500 w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-black/5 dark:border-white/5 flex justify-end">
                    <button 
                      onClick={markQuestion}
                      disabled={isMarking}
                      className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 btn-primary text-lg sm:text-xl shadow-emerald-600/20 flex items-center justify-center gap-3"
                    >
                      {isMarking ? 'Checking...' : 'Mark It'} <Check className="w-5 h-5 sm:w-6 sm:h-6" />
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
          <div className="bg-brand-bg border-t border-black/5 dark:border-white/5 px-4 sm:px-12 py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-center gap-4 transition-colors duration-700">
            <div className="flex gap-4 w-full sm:w-auto justify-center sm:justify-start">
              <button 
                onClick={() => setShowCalculator(!showCalculator)}
                className={`p-3 sm:p-4 rounded-xl border transition-all ${showCalculator ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-black/5 dark:bg-white/5 text-brand-text border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10'}`}
              >
                <CalcIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button 
                onClick={() => setShowWritingBoard(!showWritingBoard)}
                className={`p-3 sm:p-4 rounded-xl border transition-all ${showWritingBoard ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-black/5 dark:bg-white/5 text-brand-text border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10'}`}
              >
                <PenTool className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button className="hidden sm:block p-4 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-brand-text rounded-xl border border-black/10 dark:border-white/10"><Info className="w-6 h-6" /></button>
            </div>
            
            <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end">
              <button 
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-6 py-3 font-bold text-brand-muted hover:text-brand-text disabled:opacity-0 transition-all text-sm sm:text-base"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" /> Prev
              </button>
              
              {!isLastQuestion ? (
                <button 
                  onClick={() => setCurrentQuestionIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
                  className="px-6 sm:px-10 py-3 sm:py-4 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-brand-text border border-black/10 dark:border-white/10 rounded-xl font-bold text-sm sm:text-lg flex items-center gap-2 sm:gap-3 transition-all"
                >
                  Next <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              ) : (
                <button 
                  onClick={() => {
                    const result = calculateScore();
                    alert(`Submission Successful! Score: ${result.score} / ${result.total}`);
                    navigate('/library');
                  }}
                  className="px-6 sm:px-12 py-3 sm:py-4 bg-emerald-600 text-white rounded-xl font-bold text-sm sm:text-lg flex items-center gap-2 sm:gap-3 hover:bg-emerald-700 transition-all shadow-xl"
                >
                  Submit <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 hidden sm:block" />
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
