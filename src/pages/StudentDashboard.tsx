import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Play, Star, Trophy, MessageSquare, ChevronRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem('student_user') || '{"name":"Alex"}');

  const homework = [
    { id: 'hw1', title: 'Adding fractions', dueDate: '15 May 2026', status: 'pending', topic: 'Fractions' },
    { id: 'hw2', title: 'Long multiplication', dueDate: '18 May 2026', status: 'in-progress', topic: 'Number' },
    { id: 'hw3', title: 'Properties of shapes', dueDate: '22 May 2026', status: 'pending', topic: 'Geometry' },
  ];

  const results = [
    { id: 'r1', title: 'Number bonds to 100', score: 100, date: '10 May', color: 'bg-mymaths-green' },
    { id: 'r2', title: 'Telling the time', score: 85, date: '08 May', color: 'bg-mymaths-green' },
    { id: 'r3', title: 'Money problems', score: 65, date: '05 May', color: 'bg-mymaths-orange' },
  ];

  return (
    <div className="bg-sky-50 min-h-screen pb-20">
      {/* Student Welcome Header */}
      <div className="bg-white border-b-4 border-mymaths-blue/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 bg-gradient-to-br from-mymaths-blue to-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl">
              <span className="text-4xl font-black">{student.name.charAt(0)}</span>
            </div>
            <div className="text-center md:text-left flex-grow">
              <h1 className="text-4xl font-black text-mymaths-dark">Hi {student.name.split(' ')[0]}!</h1>
              <p className="text-xl text-gray-500 font-medium mt-1">Ready for some maths fun today?</p>
            </div>
            <div className="flex gap-4">
              <StatCard icon={<Star className="text-yellow-400" />} label="Stars" value="12" />
              <StatCard icon={<Trophy className="text-orange-400" />} label="Medals" value="3" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Column - Homework */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-mymaths-dark flex items-center gap-3">
                <div className="p-2 bg-mymaths-blue rounded-xl text-white">
                  <Calendar className="w-6 h-6" />
                </div>
                My Homework
              </h2>
              <button className="text-mymaths-blue font-bold hover:underline">See all</button>
            </div>

            <div className="space-y-4">
              {homework.map((item, i) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-[2rem] border-2 border-gray-100 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.status === 'in-progress' ? 'bg-orange-100 text-orange-500' : 'bg-slate-100 text-slate-400'}`}>
                        <Play className="w-7 h-7 fill-current" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-mymaths-dark group-hover:text-mymaths-blue transition-colors">{item.title}</h3>
                        <p className="text-gray-500 font-medium">{item.topic} • Due {item.dueDate}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => navigate(`/lesson/${item.id}`)}
                        className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold transition-all flex items-center gap-2"
                      >
                        Lesson
                      </button>
                      <button 
                        onClick={() => navigate(`/homework/${item.id}`)}
                        className="px-6 py-3 bg-mymaths-blue/10 hover:bg-mymaths-blue/20 text-mymaths-blue rounded-xl font-bold transition-all flex items-center gap-2"
                      >
                        Homework
                      </button>
                      <button 
                        onClick={() => navigate(`/exam/${item.id}`)}
                        className="px-6 py-3 bg-mymaths-blue hover:bg-mymaths-dark text-white rounded-xl font-black shadow-lg hover:shadow-blue-200 transition-all flex items-center gap-2"
                      >
                        Assessment <Zap className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Games Section Snippet */}
            <div className="bg-gradient-to-r from-mymaths-green to-green-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-3xl font-black mb-2">Maths Games!</h3>
                <p className="text-green-50 font-medium mb-6 max-w-md">Practice your speed and accuracy with our collection of fun maths games.</p>
                <button className="bg-white text-mymaths-green px-8 py-3 rounded-xl font-black shadow-xl hover:scale-105 transition-all">
                  Play Now
                </button>
              </div>
              <div className="absolute right-[-20px] top-[-20px] opacity-20">
                <Trophy className="w-64 h-64 rotate-12" />
              </div>
            </div>
          </div>

          {/* Right Column - Results & Feedback */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-black text-mymaths-dark mb-6 flex items-center gap-3">
                <div className="p-2 bg-mymaths-green rounded-xl text-white">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                My Results
              </h2>
              <div className="bg-white rounded-[2rem] border-2 border-gray-100 shadow-sm p-6 space-y-6">
                {results.map((result) => (
                  <div key={result.id} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800">{result.title}</h4>
                      <p className="text-sm text-gray-400">{result.date}</p>
                    </div>
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-lg ${result.color} shadow-lg ring-4 ring-white`}>
                      {result.score}%
                    </div>
                  </div>
                ))}
                <button className="w-full py-4 bg-slate-50 hover:bg-slate-100 text-gray-500 font-bold rounded-2xl transition-all">
                  View full history
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black text-mymaths-dark mb-6 flex items-center gap-3">
                <div className="p-2 bg-mymaths-orange rounded-xl text-white">
                  <MessageSquare className="w-6 h-6" />
                </div>
                Teacher Says
              </h2>
              <div className="bg-orange-50 border-2 border-orange-100 rounded-[2rem] p-6">
                <p className="text-orange-900 font-medium italic">
                  "Great work on the fractions lesson, Alex! Try the homework again to see if you can get 100%."
                </p>
                <p className="text-orange-600 text-sm mt-4 font-bold">— Mr. Thompson</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="bg-white px-6 py-4 rounded-2xl border-2 border-gray-100 shadow-sm flex items-center gap-4">
    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
      {icon}
    </div>
    <div>
      <p className="text-xs font-black text-gray-400 uppercase tracking-wider">{label}</p>
      <p className="text-xl font-black text-mymaths-dark">{value}</p>
    </div>
  </div>
);

export default StudentDashboard;
