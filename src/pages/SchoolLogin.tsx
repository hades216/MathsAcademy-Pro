import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SchoolLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('school_auth', 'true');
    navigate('/library');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 relative">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl galaxy-card p-16 shadow-[0_0_100px_rgba(99,102,241,0.2)]"
      >
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl border-4 border-white/10 group">
             <Shield className="w-12 h-12 text-white group-hover:rotate-12 transition-transform" />
          </div>
          <h2 className="text-5xl font-black text-white mb-4">Mission Entrance</h2>
          <p className="text-xl text-indigo-100/40 font-bold uppercase tracking-widest">School Fleet Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-6">
            <div className="relative group">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Fleet ID (Username)"
                className="w-full pl-14 pr-8 py-5 bg-white/5 border-2 border-white/10 rounded-2xl text-white text-lg font-bold focus:border-indigo-500 focus:ring-8 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-white/10"
                required
              />
              <User className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-indigo-400 group-focus-within:scale-110 transition-transform" />
            </div>

            <div className="relative group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Access Key (Password)"
                className="w-full pl-14 pr-8 py-5 bg-white/5 border-2 border-white/10 rounded-2xl text-white text-lg font-bold focus:border-indigo-500 focus:ring-8 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-white/10"
                required
              />
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-indigo-400 group-focus-within:scale-110 transition-transform" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-primary text-2xl py-6 flex items-center justify-center gap-4 shadow-2xl"
          >
            Launch to Library <ArrowRight className="w-6 h-6" />
          </button>
        </form>

        <div className="mt-12 pt-12 border-t border-white/5 text-center">
          <p className="text-indigo-100/30 font-bold text-lg">
            Forgot your keys? <button className="text-indigo-400 hover:underline">Contact Fleet Command</button>
          </p>
        </div>
      </motion.div>
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-10 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/10 blur-3xl rounded-full animate-pulse"></div>
    </div>
  );
};

export default SchoolLogin;
