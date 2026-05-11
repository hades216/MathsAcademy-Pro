import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, Calculator, HelpCircle, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { mathTopics } from '../data/mathData';

const HomeworkPlayer: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const topic = mathTopics[id || 'p1'] || mathTopics['p1'];
  
  const [questions, setQuestions] = useState<any[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, boolean | null>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Generate randomized questions on mount
  useEffect(() => {
    const generated = topic.homework.map(q => ({
      ...q,
      data: q.generate()
    }));
    setQuestions(generated);
  }, [topic]);

  const handleInputChange = (qId: string, val: string) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleSubmit = () => {
    const newResults: Record<string, boolean> = {};
    questions.forEach(q => {
      const isCorrect = String(userAnswers[q.id]) === String(q.data.answer);
      newResults[q.id] = isCorrect;
    });
    setResults(newResults);
    setIsSubmitted(true);
  };

  const getScore = () => {
    const correct = Object.values(results).filter(v => v === true).length;
    return Math.round((correct / questions.length) * 100);
  };

  return (
    <div className="fixed inset-0 bg-[#f0f4f8] z-[100] flex flex-col overflow-y-auto">
      {/* Homework Header */}
      <div className="bg-mymaths-blue p-6 text-white shadow-lg sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tight">Online Homework</h1>
              <p className="text-blue-100 font-bold">{topic.title}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl font-bold hover:bg-white/20">
              <Calculator className="w-5 h-5" /> Calculator
            </button>
            <button className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl font-bold hover:bg-white/20">
              <HelpCircle className="w-5 h-5" /> Help
            </button>
          </div>
        </div>
      </div>

      {/* Questions Container */}
      <div className="flex-grow p-8">
        <div className="max-w-4xl mx-auto space-y-8 pb-24">
          
          {questions.map((q, i) => (
            <motion.div 
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10 relative overflow-hidden"
            >
              {isSubmitted && (
                <div className={`absolute top-0 left-0 w-4 h-full ${results[q.id] ? 'bg-mymaths-green' : 'bg-red-500'}`} />
              )}
              
              <div className="flex justify-between items-start mb-8">
                <span className="text-mymaths-blue font-black text-xl uppercase tracking-widest">Question {i + 1}</span>
                {isSubmitted && (
                  results[q.id] ? 
                  <div className="flex items-center gap-2 text-mymaths-green font-black"><CheckCircle2 /> Correct</div> :
                  <div className="flex items-center gap-2 text-red-500 font-black"><AlertCircle /> Incorrect (Answer: {q.data.answer})</div>
                )}
              </div>

              <div className="space-y-6">
                <p className="text-2xl font-bold text-gray-800 leading-relaxed">{q.text}</p>
                
                <div className="flex items-center gap-12 bg-slate-50 p-10 rounded-3xl border-2 border-slate-100">
                  <div className="text-4xl font-black text-mymaths-dark tracking-widest">
                    {q.data.question} = ?
                  </div>
                  <input 
                    type="text" 
                    value={userAnswers[q.id] || ''}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                    disabled={isSubmitted}
                    placeholder="Enter answer"
                    className={`w-48 px-6 py-4 rounded-2xl text-2xl font-black outline-none border-4 transition-all ${
                      isSubmitted 
                        ? (results[q.id] ? 'border-mymaths-green bg-green-50 text-mymaths-green' : 'border-red-500 bg-red-50 text-red-500')
                        : 'border-gray-200 focus:border-mymaths-blue focus:ring-8 focus:ring-mymaths-blue/10 bg-white'
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          ))}

          {/* Submission Area */}
          {!isSubmitted ? (
            <div className="flex justify-center pt-8">
              <button 
                onClick={handleSubmit}
                className="bg-mymaths-orange hover:bg-orange-500 text-white font-black px-12 py-5 rounded-[2rem] text-2xl shadow-xl hover:shadow-orange-200 hover:scale-105 active:scale-95 transition-all flex items-center gap-4"
              >
                Mark my homework <CheckCircle2 className="w-8 h-8" />
              </button>
            </div>
          ) : (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-[3rem] p-12 text-center shadow-2xl border-8 border-mymaths-blue/5"
            >
              <h2 className="text-4xl font-black text-mymaths-dark mb-4">Well Done!</h2>
              <div className="text-8xl font-black text-mymaths-blue mb-6">{getScore()}%</div>
              <p className="text-xl text-gray-500 font-bold mb-10">Your results have been sent to your teacher.</p>
              <div className="flex justify-center gap-6">
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-black px-10 py-4 rounded-2xl transition-all"
                >
                  Try again (new numbers)
                </button>
                <button 
                  onClick={() => navigate('/dashboard/student')}
                  className="bg-mymaths-blue hover:bg-mymaths-dark text-white font-black px-10 py-4 rounded-2xl shadow-lg transition-all"
                >
                  Back to Portal
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Floating Action Bar */}
      {!isSubmitted && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-full px-8 py-4 flex items-center gap-8">
          <div className="text-sm font-black text-gray-400 uppercase tracking-widest">Progress</div>
          <div className="flex gap-2">
            {questions.map((q, i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${userAnswers[q.id] ? 'bg-mymaths-blue' : 'bg-gray-200'}`} />
            ))}
          </div>
          <div className="w-px h-6 bg-gray-200" />
          <button className="text-mymaths-blue font-black flex items-center gap-2 hover:underline">
            <Save className="w-4 h-4" /> Save progress
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeworkPlayer;
