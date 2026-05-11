import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Trophy, MessageSquare, Zap, Rocket, Target, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem('student_user') || '{"name":"Explorer Alex"}');

  const homework = [
    { id: 'hw1', title: 'Adding fractions', dueDate: '15 May 2026', status: 'pending', topic: 'Fractions', icon: Rocket },
    { id: 'hw2', title: 'Long multiplication', dueDate: '18 May 2026', status: 'in-progress', topic: 'Number', icon: Target },
    { id: 'hw3', title: 'Properties of shapes', dueDate: '22 May 2026', status: 'pending', topic: 'Geometry', icon: Shield },
  ];

  const results = [
    { id: 'r1', title: 'Number bonds to 100', score: 100, date: '10 May', color: 'bg-green-500' },
    { id: 'r2', title: 'Telling the time', score: 85, date: '08 May', color: 'bg-indigo-500' },
    { id: 'r3', title: 'Money problems', score: 65, date: '05 May', color: 'bg-pink-500' },
  ];

  return (
    <div className="pb-32">
      {/* Student Welcome Header */}
      <div className="relative pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-32 h-32 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl border-4 border-white/10"
            >
              <span className="text-5xl font-black">{student.name.charAt(0)}</span>
            </motion.div>
            <div className="text-center md:text-left flex-grow">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl font-black text-white"
              >
                Welcome back, {student.name.split(' ')[0]}!
              </motion.h1>
              <p className="text-2xl text-indigo-200/50 font-bold mt-2">Ready for your next mission?</p>
            </div>
            <div className="flex gap-6">
              <StatCard icon={<Trophy className="text-orange-400" />} label="Rank" value="Commander" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Main Column - Missions (Homework) */}
          <div className="lg:col-span-2 space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black text-white flex items-center gap-4">
                <div className="p-3 bg-indigo-500 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
                  <Rocket className="w-7 h-7" />
                </div>
                Active Missions
              </h2>
              <button className="text-indigo-400 font-black hover:text-indigo-300 transition-colors">See all logs</button>
            </div>

            <div className="space-y-6">
              {homework.map((item, i) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="galaxy-card p-8 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.status === 'in-progress' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/5 text-white/30'} group-hover:scale-110 transition-transform`}>
                        <item.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors">{item.title}</h3>
                        <p className="text-indigo-200/40 font-bold mt-1 uppercase tracking-widest text-sm">{item.topic} • ETA: {item.dueDate}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => navigate(`/lesson/${item.id}`)}
                        className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black transition-all border border-white/5"
                      >
                        Briefing
                      </button>
                      <button 
                        onClick={() => navigate(`/homework/${item.id}`)}
                        className="btn-primary"
                      >
                        Launch
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Galaxy Exploration Block */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl group">
              <div className="relative z-10">
                <h3 className="text-4xl font-black mb-4">Interstellar Arena</h3>
                <p className="text-indigo-100/70 text-xl font-bold mb-10 max-w-lg leading-relaxed">Battle with other commanders in real-time maths challenges. Climb the galactic leaderboard!</p>
                <button className="bg-white text-indigo-700 px-10 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition-all flex items-center gap-3">
                  Enter Arena <Zap className="w-5 h-5 fill-current" />
                </button>
              </div>
              <div className="absolute right-[-40px] bottom-[-40px] opacity-10 group-hover:rotate-12 transition-transform duration-700">
                <Rocket className="w-80 h-80" />
              </div>
            </div>
          </div>

          {/* Right Column - Logs & Transmission */}
          <div className="space-y-16">
            <div>
              <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-4">
                <div className="p-3 bg-pink-500 rounded-2xl text-white shadow-lg shadow-pink-500/20">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                Mission Logs
              </h2>
              <div className="galaxy-card p-8 space-y-8">
                {results.map((result) => (
                  <div key={result.id} className="flex items-center justify-between group">
                    <div>
                      <h4 className="font-black text-white group-hover:text-pink-400 transition-colors">{result.title}</h4>
                      <p className="text-sm font-bold text-indigo-200/30 uppercase tracking-widest">{result.date}</p>
                    </div>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg ring-4 ring-white/10 ${result.color} group-hover:scale-110 transition-transform`}>
                      {result.score}%
                    </div>
                  </div>
                ))}
                <button className="w-full py-5 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white font-black rounded-2xl transition-all border border-white/5">
                  Full Transmission History
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-4">
                <div className="p-3 bg-orange-500 rounded-2xl text-white shadow-lg shadow-orange-500/20">
                  <MessageSquare className="w-7 h-7" />
                </div>
                Comms Link
              </h2>
              <div className="bg-orange-500/10 border-2 border-orange-500/20 rounded-[2.5rem] p-8 relative">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <p className="text-orange-100 text-xl font-bold italic leading-relaxed">
                  "Commander {student.name.split(' ')[0]}, your calculations on the last mission were light-years ahead! Keep up the stellar work."
                </p>
                <p className="text-orange-400 font-black mt-6 uppercase tracking-widest">— Fleet Admiral Thompson</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="bg-white/5 backdrop-blur-xl px-8 py-5 rounded-3xl border border-white/10 shadow-2xl flex items-center gap-6">
    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shadow-inner">
      {icon}
    </div>
    <div>
      <p className="text-xs font-black text-indigo-200/30 uppercase tracking-widest">{label}</p>
      <p className="text-2xl font-black text-white">{value}</p>
    </div>
  </div>
);

export default StudentDashboard;
