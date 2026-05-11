import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Key, ArrowRight } from 'lucide-react';

const StudentLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      localStorage.setItem('student_user', JSON.stringify({ name: 'Alex Smith', id: 'stu_123' }));
      navigate('/dashboard/student');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-sky-50 px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-white"
      >
        <div className="bg-gradient-to-br from-mymaths-blue to-blue-700 p-10 text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-black mb-2">My Portal</h2>
          <p className="text-blue-100 font-medium">Log in to see your homework and results</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-10 space-y-8">
          <div className="space-y-3">
            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Username</label>
            <div className="relative">
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your portal username"
                className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-mymaths-blue/20 focus:border-mymaths-blue transition-all outline-none text-lg font-bold"
                required
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="block text-sm font-black text-gray-700 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your 3-digit password"
                className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-mymaths-blue/20 focus:border-mymaths-blue transition-all outline-none text-lg font-bold"
                required
              />
              <Key className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-300" />
            </div>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-mymaths-orange hover:bg-orange-500 text-white font-black py-5 rounded-2xl shadow-xl hover:shadow-orange-200 transition-all flex items-center justify-center gap-3 text-xl active:scale-95"
          >
            Go to My Portal <ArrowRight className="w-6 h-6" />
          </button>
        </form>
        
        <div className="bg-slate-50 p-6 text-center border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Forgot your details? Ask your teacher for your portal login.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentLogin;
