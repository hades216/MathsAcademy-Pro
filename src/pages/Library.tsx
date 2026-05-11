import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronRight, BookOpen, Star, Clock, Trophy, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Library: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'primary' | 'secondary'>('primary');
  const navigate = useNavigate();

  const topics = {
    primary: [
      { id: 'p1', title: 'Number & Place Value', level: 'KS1/2', items: 45 },
      { id: 'p2', title: 'Addition & Subtraction', level: 'KS1/2', items: 38 },
      { id: 'p3', title: 'Multiplication & Division', level: 'KS1/2', items: 42 },
      { id: 'p4', title: 'Fractions, Decimals & %', level: 'KS2', items: 56 },
      { id: 'p5', title: 'Measurement', level: 'KS1/2', items: 29 },
      { id: 'p6', title: 'Geometry', level: 'KS1/2', items: 31 },
    ],
    secondary: [
      { id: 's1', title: 'Algebra Foundations', level: 'KS3', items: 64 },
      { id: 's2', title: 'Equations & Inequalities', level: 'GCSE', items: 48 },
      { id: 's3', title: 'Trigonometry', level: 'GCSE', items: 32 },
      { id: 's4', title: 'Probability & Stats', level: 'KS3/4', items: 51 },
      { id: 's5', title: 'Calculus Introduction', level: 'A Level', items: 24 },
      { id: 's6', title: 'Coordinate Geometry', level: 'GCSE', items: 39 },
    ]
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Sub Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-black text-mymaths-dark">Content Library</h1>
              <p className="text-gray-500 mt-1">Browse hundreds of interactive lessons and homework tasks.</p>
            </div>
            
            <div className="flex gap-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search topics..." 
                  className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full w-64 focus:ring-2 focus:ring-mymaths-blue transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <button 
                onClick={() => navigate('/login/student')}
                className="btn-secondary flex items-center gap-2"
              >
                My Portal <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Level Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-200 p-1 rounded-2xl flex">
            <button 
              onClick={() => setActiveTab('primary')}
              className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'primary' ? 'bg-white text-mymaths-dark shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Primary
            </button>
            <button 
              onClick={() => setActiveTab('secondary')}
              className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'secondary' ? 'bg-white text-mymaths-dark shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Secondary
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics[activeTab].map((topic) => (
            <TopicCard 
              key={topic.id} 
              topic={topic} 
              onSelect={() => navigate(`/lesson/${topic.id}`)}
            />
          ))}
        </div>

        {/* Sidebar Style Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <InfoBox 
            icon={<Clock className="text-mymaths-blue" />}
            title="Recent"
            items={['Rounding decimals', 'Column addition', 'Fractions of amounts']}
          />
          <InfoBox 
            icon={<Star className="text-mymaths-orange" />}
            title="Favorites"
            items={['Multiplication tables', 'Shape names', 'Telling the time']}
          />
          <InfoBox 
            icon={<Trophy className="text-mymaths-green" />}
            title="Popular"
            items={['Division with remainders', 'Equivalent fractions', 'Number bonds']}
          />
        </div>
      </div>
    </div>
  );
};

const TopicCard = ({ topic, onSelect }: { topic: any, onSelect: () => void }) => (
  <motion.div 
    whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
    onClick={onSelect}
    className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm cursor-pointer group"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-mymaths-blue/10 transition-colors">
        <BookOpen className="w-6 h-6 text-mymaths-blue" />
      </div>
      <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-bold uppercase tracking-wider">
        {topic.level}
      </span>
    </div>
    <h3 className="text-xl font-black text-mymaths-dark mb-2 group-hover:text-mymaths-blue transition-colors">
      {topic.title}
    </h3>
    <p className="text-gray-500 text-sm mb-6">{topic.items} interactive activities</p>
    <div className="flex items-center gap-4 text-mymaths-blue font-bold text-sm">
      <button onClick={(e) => { e.stopPropagation(); onSelect(); }} className="hover:underline flex items-center gap-1">
        Open topic <ChevronRight className="w-4 h-4" />
      </button>
      <div className="w-1 h-1 bg-gray-300 rounded-full" />
      <button onClick={(e) => { e.stopPropagation(); navigate(`/exam/${topic.id}`); }} className="text-mymaths-green hover:underline flex items-center gap-1">
        Start Assessment <Zap className="w-4 h-4" />
      </button>
    </div>
  </motion.div>
);

const InfoBox = ({ icon, title, items }: { icon: React.ReactNode, title: string, items: string[] }) => (
  <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <h4 className="font-black text-mymaths-dark">{title}</h4>
    </div>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-2 text-sm text-gray-600 hover:text-mymaths-blue cursor-pointer transition-colors">
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default Library;
