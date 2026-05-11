import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, ArrowRight, Lock, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('student_user', JSON.stringify({ name: username || 'Explorer Alex' }));
    navigate('/dashboard/student');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 relative">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl galaxy-card p-16 shadow-[0_0_150px_rgba(168,85,247,0.15)]"
      >
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-tr from-purple-500 to-pink-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl border-4 border-white/10 group">
             <Rocket className="w-12 h-12 text-white group-hover:rotate-45 transition-transform duration-500" />
          </div>
          <h2 className="text-5xl font-black text-white mb-4 tracking-tight">Mission Control</h2>
          <p className="text-xl text-indigo-100/40 font-bold uppercase tracking-widest">Personal Portal Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-6">
            <div className="relative group">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Explorer Name"
                className="w-full pl-14 pr-8 py-5 bg-white/5 border-2 border-white/10 rounded-2xl text-white text-lg font-bold focus:border-purple-500 focus:ring-8 focus:ring-purple-500/10 outline-none transition-all placeholder:text-white/10"
                required
              />
              <User className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-purple-400 group-focus-within:scale-110 transition-transform" />
            </div>

            <div className="relative group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Secret Passcode"
                className="w-full pl-14 pr-8 py-5 bg-white/5 border-2 border-white/10 rounded-2xl text-white text-lg font-bold focus:border-purple-500 focus:ring-8 focus:ring-purple-500/10 outline-none transition-all placeholder:text-white/10"
                required
              />
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-purple-400 group-focus-within:scale-110 transition-transform" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-2xl py-6 rounded-2xl font-black shadow-2xl hover:scale-[1.02] hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-4"
          >
            Launch Portal <ArrowRight className="w-6 h-6" />
          </button>
        </form>

        <div className="mt-12 text-center">
          <button className="text-purple-400 font-bold hover:underline">Forgot passcode? Consult with your teacher.</button>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentLogin;
