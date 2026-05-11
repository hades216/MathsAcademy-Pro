import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, BarChart3, Settings, Plus, Search, 
  Filter, MoreVertical, Download, 
  CheckCircle2, AlertCircle, Zap, Star, Shield
} from 'lucide-react';

const TeacherDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'allocation' | 'results' | 'admin'>('results');

  const students = [
    { id: 1, name: 'Alex Johnson', status: 'Passed', lastActive: '2h ago', average: 92 },
    { id: 2, name: 'Sarah Williams', status: 'In Progress', lastActive: '10m ago', average: 78 },
    { id: 3, name: 'Michael Brown', status: 'Revision', lastActive: '1d ago', average: 64 },
    { id: 4, name: 'Emily Davis', status: 'Passed', lastActive: '5h ago', average: 88 },
  ];

  return (
    <div className="min-h-screen pb-32">
      {/* Teacher Header */}
      <div className="relative pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1.5 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-black uppercase tracking-widest border border-indigo-500/30">Fleet Admiral View</span>
                <span className="text-white/30 font-bold text-sm">Sector: Year 6 Gamma</span>
              </div>
              <h1 className="text-6xl font-black text-white">Command Center</h1>
            </div>
            
            <div className="flex bg-white/5 p-2 rounded-[2.5rem] border border-white/10 backdrop-blur-xl shadow-2xl">
              <TabButton active={activeTab === 'allocation'} onClick={() => setActiveTab('allocation')} icon={<Zap className="w-5 h-5" />} label="Allocation" />
              <TabButton active={activeTab === 'results'} onClick={() => setActiveTab('results')} icon={<BarChart3 className="w-5 h-5" />} label="Mission Results" />
              <TabButton active={activeTab === 'admin'} onClick={() => setActiveTab('admin')} icon={<Settings className="w-5 h-5" />} label="Fleet Admin" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {activeTab === 'results' && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <StatBox icon={<Users className="text-indigo-400" />} label="Total Crew" value="32" />
                <StatBox icon={<CheckCircle2 className="text-emerald-400" />} label="Mission Passed" value="24" />
                <StatBox icon={<AlertCircle className="text-pink-400" />} label="Needs Support" value="5" />
                <StatBox icon={<Star className="text-yellow-400" />} label="Fleet Average" value="84%" />
              </div>

              {/* Students Table */}
              <div className="galaxy-card overflow-hidden">
                <div className="p-10 border-b border-white/10 flex justify-between items-center">
                  <h3 className="text-3xl font-black text-white">Crew Performance</h3>
                  <div className="flex gap-4">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Scan crew ID..." 
                        className="pl-12 pr-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-white font-bold focus:ring-4 focus:ring-indigo-500/20 outline-none w-64"
                      />
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
                    </div>
                    <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-white transition-all border border-white/10">
                      <Filter className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-white transition-all border border-white/10">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-white/5">
                        <th className="px-10 py-6 text-sm font-black text-white/30 uppercase tracking-[0.2em]">Commander</th>
                        <th className="px-10 py-6 text-sm font-black text-white/30 uppercase tracking-[0.2em]">Mission Status</th>
                        <th className="px-10 py-6 text-sm font-black text-white/30 uppercase tracking-[0.2em]">Last Active</th>
                        <th className="px-10 py-6 text-sm font-black text-white/30 uppercase tracking-[0.2em]">Average Accuracy</th>
                        <th className="px-10 py-6 text-sm font-black text-white/30 uppercase tracking-[0.2em]"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {students.map((student) => (
                        <tr key={student.id} className="hover:bg-white/5 transition-colors group">
                          <td className="px-10 py-8">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-black">
                                {student.name.charAt(0)}
                              </div>
                              <span className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors">{student.name}</span>
                            </div>
                          </td>
                          <td className="px-10 py-8">
                            <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${
                              student.status === 'Passed' 
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                                : student.status === 'In Progress'
                                  ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                                  : 'bg-pink-500/10 text-pink-400 border-pink-500/30'
                            }`}>
                              {student.status}
                            </span>
                          </td>
                          <td className="px-10 py-8 text-indigo-200/50 font-bold">{student.lastActive}</td>
                          <td className="px-10 py-8">
                            <div className="flex items-center gap-4">
                              <div className="flex-grow h-3 bg-white/5 rounded-full overflow-hidden border border-white/5 w-32">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${student.average}%` }}
                                  className={`h-full ${student.average >= 90 ? 'bg-emerald-500' : student.average >= 75 ? 'bg-indigo-500' : 'bg-pink-500'}`}
                                />
                              </div>
                              <span className="font-black text-white">{student.average}%</span>
                            </div>
                          </td>
                          <td className="px-10 py-8 text-right">
                            <button className="p-2 hover:bg-white/10 rounded-xl transition-all text-white/30 hover:text-white">
                              <MoreVertical className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'allocation' && (
            <motion.div 
              key="allocation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="galaxy-card p-20 text-center"
            >
              <Shield className="w-24 h-24 text-indigo-500 mx-auto mb-8 opacity-20" />
              <h2 className="text-4xl font-black text-white mb-6">Mission Allocation System</h2>
              <p className="text-xl text-indigo-100/50 font-bold max-w-xl mx-auto mb-10">Assign new missions to your crew. Set clearance thresholds and navigation deadlines.</p>
              <button className="btn-primary text-xl px-12 py-5 flex items-center gap-3 mx-auto">
                <Plus className="w-6 h-6" /> Create New Mission
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`px-10 py-4 rounded-[2rem] font-black text-lg transition-all flex items-center gap-3 ${active ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl' : 'text-indigo-200/40 hover:text-white'}`}
  >
    {icon}
    {label}
  </button>
);

const StatBox = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="galaxy-card p-10 group">
    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
      {icon}
    </div>
    <p className="text-xs font-black text-indigo-200/30 uppercase tracking-[0.3em] mb-2">{label}</p>
    <p className="text-4xl font-black text-white">{value}</p>
  </div>
);

export default TeacherDashboard;
