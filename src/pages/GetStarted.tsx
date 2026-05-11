import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Rocket, Play, ChevronRight, Star, Target, Users } from 'lucide-react';

const GetStarted: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'primary' | 'secondary'>('primary');
  const navigate = useNavigate();

  const primarySamples = [
    { id: 'p1', title: 'Number & Place Value', description: 'Comprehensive understanding of numerical hierarchy.', icon: <Star className="text-blue-400" /> },
    { id: 'p2', title: 'Calculation Methods', description: 'Foundational arithmetic and mental strategies.', icon: <Target className="text-indigo-400" /> },
  ];

  const secondarySamples = [
    { id: 's1', title: 'Algebraic Foundations', description: 'Solving linear equations and variable manipulation.', icon: <Rocket className="text-emerald-400" /> },
  ];

  const samples = activeTab === 'primary' ? primarySamples : secondarySamples;

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-black text-white mb-8 tracking-tighter"
          >
            Experience <span className="text-gradient">The Platform</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-slate-400 font-bold max-w-3xl mx-auto"
          >
            Review our sample modules and homework tasks. Experience the interface used by millions.
          </motion.p>
        </div>

        <div className="flex justify-center mb-16">
          <div className="bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-xl flex">
            <button 
              onClick={() => setActiveTab('primary')}
              className={`px-10 py-3 rounded-xl font-bold text-xl transition-all ${activeTab === 'primary' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
            >
              Primary
            </button>
            <button 
              onClick={() => setActiveTab('secondary')}
              className={`px-10 py-3 rounded-xl font-bold text-xl transition-all ${activeTab === 'secondary' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
            >
              Secondary
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {samples.map((sample, i) => (
              <motion.div
                key={sample.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.1 }}
                className="ui-card p-10 group"
              >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10">
                  {sample.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-4">{sample.title}</h3>
                <p className="text-lg text-slate-400 font-bold mb-10 leading-relaxed">{sample.description}</p>
                
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => navigate(`/lesson/${sample.id}`)}
                    className="w-full flex items-center justify-between px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all group/btn"
                  >
                    Open Lesson <Play className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => navigate(`/homework/${sample.id}`)}
                    className="w-full flex items-center justify-between px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold border border-white/10 transition-all"
                  >
                    View Homework <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ui-card p-10 border-indigo-500/20 flex flex-col items-center justify-center text-center group"
          >
            <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 mb-8 border border-indigo-500/20">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4">Institutional Access</h3>
            <p className="text-lg text-slate-400 font-bold mb-10">Deploy the platform across your entire school or trust.</p>
            <button 
              onClick={() => navigate('/pricing')}
              className="btn-primary w-full"
            >
              Plans & Pricing
            </button>
          </motion.div>
        </div>

        <div className="mt-32 pt-32 border-t border-white/5">
           <h2 className="text-5xl font-black text-white text-center mb-20 tracking-tighter">Professional <span className="text-gradient">Ecosystem</span></h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <Step icon="01" title="Interactive Curriculum" text="Clear, structured lessons designed to build conceptual understanding and procedural fluency." />
              <Step icon="02" title="Standardized Assessments" text="Automated homework and tests provide standardized data points for tracking student attainment." />
              <Step icon="03" title="Advanced Analytics" text="Powerful reporting tools designed for teachers and senior leadership to monitor impact at scale." />
              <Step icon="04" title="Home-School Continuity" text="Seamless access from any device, ensuring consistent learning opportunities outside the classroom." />
           </div>
        </div>
      </div>
    </div>
  );
};

const Step = ({ icon, title, text }: any) => (
  <div className="flex gap-8 group">
    <div className="flex-shrink-0 w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center text-2xl font-black text-indigo-400 border border-white/10 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
      {icon}
    </div>
    <div>
      <h4 className="text-2xl font-black text-white mb-4">{title}</h4>
      <p className="text-xl text-slate-400 font-bold leading-relaxed">{text}</p>
    </div>
  </div>
);

export default GetStarted;
