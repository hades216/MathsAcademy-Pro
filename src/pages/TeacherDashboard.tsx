import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, BarChart3, Settings, Plus, Download, Filter, Search, ChevronRight, UserPlus } from 'lucide-react';

const TeacherDashboard: React.FC = () => {
  const location = useLocation();
  const activeTab = location.pathname.split('/').pop() || 'allocation';

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Teacher Header */}
      <div className="bg-mymaths-dark text-white pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-black">Teacher Dashboard</h1>
              <p className="text-mymaths-light mt-1">Oxford Academy • Maths Department</p>
            </div>
            <div className="flex bg-white/10 p-1 rounded-xl">
              <TabLink to="allocation" active={activeTab === 'allocation' || activeTab === 'teacher'} icon={<Plus className="w-4 h-4" />} label="Allocation" />
              <TabLink to="results" active={activeTab === 'results'} icon={<BarChart3 className="w-4 h-4" />} label="Results" />
              <TabLink to="admin" active={activeTab === 'admin'} icon={<Settings className="w-4 h-4" />} label="Admin" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Routes>
          <Route index element={<AllocationTab />} />
          <Route path="allocation" element={<AllocationTab />} />
          <Route path="results" element={<ResultsTab />} />
          <Route path="admin" element={<AdminTab />} />
        </Routes>
      </div>
    </div>
  );
};

const TabLink = ({ to, active, icon, label }: { to: string, active: boolean, icon: React.ReactNode, label: string }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all ${active ? 'bg-white text-mymaths-dark' : 'text-white/70 hover:text-white'}`}
  >
    {icon}
    {label}
  </Link>
);

// --- TAB COMPONENTS ---

const AllocationTab = () => {
  const [selectedClass, setSelectedClass] = useState('7A/Ma1');
  
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <select 
            value={selectedClass} 
            onChange={(e) => setSelectedClass(e.target.value)}
            className="bg-white border-2 border-gray-100 rounded-xl px-4 py-2 font-bold text-mymaths-dark outline-none focus:border-mymaths-blue"
          >
            <option>7A/Ma1</option>
            <option>8B/Ma2</option>
            <option>9C/Ma1</option>
          </select>
          <span className="text-gray-400 font-medium">32 students</span>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" /> New Allocation
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-black text-mymaths-dark text-lg">Current Allocations</h3>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-mymaths-blue"><Filter className="w-5 h-5" /></button>
            <button className="p-2 text-gray-400 hover:text-mymaths-blue"><Search className="w-5 h-5" /></button>
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-gray-500 text-sm font-black uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Topic / Task</th>
              <th className="px-6 py-4">Assigned</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4">Completed</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { task: 'Adding Fractions', date: '10 May 2026', due: '15 May 2026', comp: '18/32' },
              { task: 'Long Multiplication', date: '12 May 2026', due: '18 May 2026', comp: '12/32' },
              { task: 'Properties of Shapes', date: '08 May 2026', due: '22 May 2026', comp: '24/32' },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-mymaths-dark">{row.task}</td>
                <td className="px-6 py-4 text-gray-500 text-sm">{row.date}</td>
                <td className="px-6 py-4 text-gray-500 text-sm">{row.due}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-grow bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-mymaths-blue h-full" style={{ width: `${(parseInt(row.comp)/32)*100}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-gray-600">{row.comp}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="text-mymaths-blue font-bold text-sm hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

const ResultsTab = () => {
  const students = ['Alex Smith', 'Ben Jones', 'Charlie Brown', 'Daisy Miller', 'Ethan Hunt', 'Fiona May'];
  const tasks = ['Fractions', 'Decimals', 'Percentages', 'Algebra', 'Geometry'];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-mymaths-dark">Class Results: 7A/Ma1</h2>
        <button className="flex items-center gap-2 text-mymaths-blue font-bold">
          <Download className="w-5 h-5" /> Export Report
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead className="bg-slate-50 text-gray-500 text-xs font-black uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 sticky left-0 bg-slate-50 z-10 border-r border-gray-200">Student Name</th>
              {tasks.map((task) => (
                <th key={task} className="px-6 py-4 text-center">{task}</th>
              ))}
              <th className="px-6 py-4 text-center">Avg %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((student, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-mymaths-dark sticky left-0 bg-white z-10 border-r border-gray-100">{student}</td>
                {tasks.map((_task, j) => {
                  const score = Math.floor(Math.random() * 101);
                  let color = 'bg-mymaths-green';
                  if (score < 40) color = 'bg-red-500';
                  else if (score < 70) color = 'bg-mymaths-orange';
                  
                  return (
                    <td key={j} className="px-6 py-4">
                      <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm ${color}`}>
                        {score}
                      </div>
                    </td>
                  );
                })}
                <td className="px-6 py-4 text-center font-black text-mymaths-dark">82%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Legend */}
      <div className="flex gap-8 justify-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-mymaths-green"></div> <span className="text-sm font-bold">70% - 100%</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-mymaths-orange"></div> <span className="text-sm font-bold">40% - 69%</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> <span className="text-sm font-bold">0% - 39%</span></div>
      </div>
    </motion.div>
  );
};

const AdminTab = () => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
      <h3 className="text-xl font-black text-mymaths-dark flex items-center gap-3">
        <Users className="text-mymaths-blue" /> Class Management
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed">
        Create new classes, import student lists from CSV, and manage existing class groups.
      </p>
      <div className="space-y-3">
        <AdminAction icon={<UserPlus className="w-4 h-4" />} label="Create New Class" />
        <AdminAction icon={<Download className="w-4 h-4" />} label="Import Students (CSV)" />
        <AdminAction icon={<ChevronRight className="w-4 h-4" />} label="Manage 7A/Ma1" />
      </div>
    </div>
    
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
      <h3 className="text-xl font-black text-mymaths-dark flex items-center gap-3">
        <Settings className="text-mymaths-orange" /> Account Settings
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed">
        Update your personal details, change your password, and manage school notification settings.
      </p>
      <div className="space-y-3">
        <AdminAction icon={<ChevronRight className="w-4 h-4" />} label="Edit Profile" />
        <AdminAction icon={<ChevronRight className="w-4 h-4" />} label="Security & Password" />
        <AdminAction icon={<ChevronRight className="w-4 h-4" />} label="School Admin Settings" />
      </div>
    </div>
  </motion.div>
);

const AdminAction = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all group">
    <span className="font-bold text-gray-700">{label}</span>
    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gray-400 group-hover:text-mymaths-blue transition-colors">
      {icon}
    </div>
  </button>
);

export default TeacherDashboard;
