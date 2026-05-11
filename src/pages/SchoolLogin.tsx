import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { School, ArrowRight, Lock } from 'lucide-react';

const SchoolLogin: React.FC = () => {
  const [schoolId, setSchoolId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate school login
    if (schoolId && password) {
      localStorage.setItem('school_auth', 'true');
      navigate('/library');
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
            <School className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-black">School Login</h2>
          <p className="text-mymaths-light mt-2">Enter your school credentials to access MyMaths</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">School Username</label>
            <div className="relative">
              <input 
                type="text" 
                value={schoolId}
                onChange={(e) => setSchoolId(e.target.value)}
                placeholder="e.g. oxford123"
                className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mymaths-blue focus:border-transparent transition-all outline-none"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">School Password</label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-mymaths-blue focus:border-transparent transition-all outline-none"
                required
              />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-mymaths-blue hover:bg-mymaths-dark text-white font-black py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            Log in to school <ArrowRight className="w-5 h-5" />
          </button>
          
          <div className="text-center pt-4">
            <a href="#" className="text-sm font-bold text-mymaths-blue hover:underline">Forgotten your login?</a>
          </div>
        </form>
        
        <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Looking for <button onClick={() => navigate('/login/teacher')} className="text-mymaths-blue font-bold hover:underline">Teacher Dashboard</button>?
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SchoolLogin;
