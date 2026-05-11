import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Timer, ChevronRight, CheckCircle2, 
  AlertCircle, Trophy, BarChart, ArrowLeft,
  ChevronLeft, Award, Zap
} from 'lucide-react';
import { mathTopics } from '../data/mathData';

const ExamPlayer: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const topic = mathTopics[id || 'p1'] || mathTopics['p1'];
  
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(true);

  // Generate assessment questions
  useEffect(() => {
    // For exams, we generate more questions (e.g. 6 questions)
    const baseQuestions = [...topic.homework];
    const examQuestions = Array.from({ length: 6 }).map((_, i) => {
      const template = baseQuestions[i % baseQuestions.length];
      return {
        ...template,
        examId: `eq_${i}`,
        data: template.generate()
      };
    });
    setQuestions(examQuestions);
  }, [topic]);

  // Timer logic
  useEffect(() => {
    let interval: any = null;
    if (isActive && !isSubmitted) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isSubmitted]);

  // Pause timer on tab switch (simulated)
  useEffect(() => {
    const handleVisibilityChange = () => setIsActive(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (val: string) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [questions[currentQuestionIdx].examId]: val }));
  };

  const calculateResults = () => {
    const results = questions.map(q => ({
      ...q,
      isCorrect: String(userAnswers[q.examId]) === String(q.data.answer),
      userAnswer: userAnswers[q.examId]
    }));
    return results;
  };

  const getScore = (results: any[]) => {
    const correct = results.filter(r => r.isCorrect).length;
    return Math.round((correct / questions.length) * 100);
  };

  if (questions.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-[#F8FAFC] z-[100] flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <X className="w-6 h-6" />
          </button>
          <div>
            <span className="text-xs font-black text-mymaths-blue uppercase tracking-widest">Assessment Mode</span>
            <h1 className="text-xl font-black text-slate-800 leading-none">{topic.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
            <Timer className={`w-5 h-5 ${isActive ? 'text-mymaths-blue animate-pulse' : 'text-slate-300'}`} />
            <span className="text-lg font-black text-slate-700 tabular-nums">{formatTime(time)}</span>
          </div>
          {!isSubmitted && (
            <button 
              onClick={() => setIsSubmitted(true)}
              className="bg-mymaths-green hover:bg-green-600 text-white font-black px-6 py-2 rounded-xl shadow-lg shadow-green-100 transition-all active:scale-95"
            >
              Finish Assessment
            </button>
          )}
        </div>
      </div>

      <div className="flex-grow flex overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
          <div className="p-6 border-b border-slate-50">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Questions</h3>
            <div className="grid grid-cols-3 gap-3">
              {questions.map((q, i) => {
                const isAnswered = !!userAnswers[q.examId];
                const isCurrent = currentQuestionIdx === i;
                return (
                  <button
                    key={q.examId}
                    onClick={() => setCurrentQuestionIdx(i)}
                    className={`h-12 rounded-xl font-black transition-all flex items-center justify-center border-2 ${
                      isCurrent 
                        ? 'border-mymaths-blue bg-mymaths-blue text-white shadow-lg shadow-blue-100' 
                        : isAnswered 
                          ? 'border-mymaths-blue/20 bg-mymaths-blue/5 text-mymaths-blue' 
                          : 'border-slate-100 text-slate-300 hover:border-slate-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="flex-grow p-6 flex flex-col justify-end">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500">Progress</span>
                <span className="text-xs font-black text-mymaths-blue">{Object.keys(userAnswers).length}/{questions.length}</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-mymaths-blue"
                  initial={{ width: 0 }}
                  animate={{ width: `${(Object.keys(userAnswers).length / questions.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow overflow-y-auto p-12 bg-slate-50/50">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div 
                key={currentQuestionIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-3xl mx-auto"
              >
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-12">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-mymaths-blue/10 rounded-xl flex items-center justify-center text-mymaths-blue font-black">
                      {currentQuestionIdx + 1}
                    </div>
                    <span className="text-slate-400 font-bold">Question {currentQuestionIdx + 1} of {questions.length}</span>
                  </div>

                  <h2 className="text-3xl font-black text-slate-800 mb-10 leading-relaxed">
                    {questions[currentQuestionIdx].text}
                  </h2>

                  <div className="bg-slate-50 rounded-3xl p-12 border-2 border-slate-100 flex flex-col items-center gap-8">
                    <div className="text-5xl font-black text-slate-700 tracking-tighter">
                      {questions[currentQuestionIdx].data.question} <span className="text-slate-300 mx-4">=</span> ?
                    </div>
                    
                    <input 
                      type="text" 
                      value={userAnswers[questions[currentQuestionIdx].examId] || ''}
                      onChange={(e) => handleAnswer(e.target.value)}
                      placeholder="Type answer..."
                      autoFocus
                      className="w-full max-w-sm px-8 py-5 rounded-2xl text-3xl font-black text-center border-4 border-slate-200 focus:border-mymaths-blue focus:ring-8 focus:ring-blue-50 outline-none transition-all placeholder:text-slate-200"
                    />
                  </div>

                  <div className="flex justify-between mt-12">
                    <button 
                      onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
                      disabled={currentQuestionIdx === 0}
                      className="flex items-center gap-2 px-6 py-3 font-bold text-slate-400 hover:text-slate-600 disabled:opacity-0 transition-all"
                    >
                      <ChevronLeft /> Previous
                    </button>
                    
                    {currentQuestionIdx < questions.length - 1 ? (
                      <button 
                        onClick={() => setCurrentQuestionIdx(prev => prev + 1)}
                        className="bg-slate-800 text-white px-8 py-3 rounded-xl font-black flex items-center gap-2 hover:bg-slate-900 transition-all active:scale-95"
                      >
                        Next Question <ChevronRight />
                      </button>
                    ) : (
                      <button 
                        onClick={() => setIsSubmitted(true)}
                        className="bg-mymaths-green text-white px-8 py-3 rounded-xl font-black flex items-center gap-2 hover:brightness-110 transition-all active:scale-95"
                      >
                        Finish Assessment <CheckCircle2 />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <AssessmentSummary 
                results={calculateResults()} 
                score={getScore(calculateResults())} 
                time={time}
                topic={topic}
                onRetry={() => window.location.reload()}
                onExit={() => navigate('/dashboard/student')}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const AssessmentSummary = ({ results, score, time, topic, onRetry, onExit }: any) => {
  const isPassed = score >= 80;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header Ribbon */}
        <div className={`py-12 text-center text-white ${isPassed ? 'bg-mymaths-green' : 'bg-mymaths-blue'}`}>
          <div className="w-24 h-24 bg-white/20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
            {isPassed ? <Award className="w-12 h-12" /> : <BarChart className="w-12 h-12" />}
          </div>
          <h2 className="text-4xl font-black mb-2">{isPassed ? 'Fantastic Result!' : 'Assessment Complete'}</h2>
          <p className="text-white/80 font-bold uppercase tracking-widest">{topic.title}</p>
        </div>

        <div className="p-12">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6 mb-12">
            <SummaryStat icon={<Zap className="text-yellow-400" />} label="Final Score" value={`${score}%`} />
            <SummaryStat icon={<Timer className="text-blue-400" />} label="Total Time" value={`${Math.floor(time / 60)}m ${time % 60}s`} />
            <SummaryStat icon={<CheckCircle2 className="text-green-400" />} label="Status" value={isPassed ? 'PASSED' : 'REVISION'} />
          </div>

          {/* Detailed Results Table */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 px-2">Question Breakdown</h3>
            <div className="space-y-3">
              {results.map((r: any, i: number) => (
                <div key={i} className="bg-white p-4 rounded-2xl flex items-center justify-between border border-slate-100">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 flex items-center justify-center font-black text-slate-300">{i + 1}</span>
                    <span className="font-bold text-slate-600">{r.data.question}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-slate-400">Answer: {r.data.answer}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${r.isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {r.isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <X className="w-5 h-5" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex justify-center gap-6">
            <button 
              onClick={onRetry}
              className="px-10 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black rounded-2xl transition-all"
            >
              Retry Assessment
            </button>
            <button 
              onClick={onExit}
              className="px-10 py-4 bg-slate-800 hover:bg-slate-900 text-white font-black rounded-2xl shadow-xl transition-all active:scale-95"
            >
              Return to Portal
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SummaryStat = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="bg-white p-6 rounded-[2rem] border-2 border-slate-50 shadow-sm text-center">
    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-3">
      {icon}
    </div>
    <p className="text-xs font-black text-slate-300 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-2xl font-black text-slate-800">{value}</p>
  </div>
);

export default ExamPlayer;
