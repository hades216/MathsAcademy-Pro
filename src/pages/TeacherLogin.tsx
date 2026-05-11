import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Mail, Lock, ArrowRight } from 'lucide-react';

const TeacherLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('teacher_user', JSON.stringify({ name: 'Mr. Thompson', role: 'Head of Maths' }));
      navigate('/dashboard/teacher');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
      >
        <div className="bg-mymaths-dark p-8 text-white text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LayoutDashboard className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-black">Teacher Dashboard</h2>
          <p className="text-mymaths-light mt-2">Manage your classes and track student progress</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="teacher@school.com"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mymaths-blue focus:border-transparent transition-all outline-none"
                required
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Password</label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mymaths-blue focus:border-transparent transition-all outline-none"
                required
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-mymaths-blue hover:bg-mymaths-dark text-white font-black py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            Log in to Dashboard <ArrowRight className="w-5 h-5" />
          </button>
          
          <div className="text-center pt-4 flex flex-col gap-2">
            <a href="#" className="text-sm font-bold text-mymaths-blue hover:underline">Forgotten your password?</a>
            <a href="#" className="text-sm text-gray-500">Don't have a teacher account? <span className="text-mymaths-blue font-bold">Contact Admin</span></a>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default TeacherLogin;
