import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Play, ChevronRight } from 'lucide-react';
import { mathTopics, type Topic } from '../data/mathData';

const Library: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLevel, setActiveLevel] = useState<'all' | 'primary' | 'secondary'>('all');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const navigate = useNavigate();

  const categories = ['All', 'Number', 'Algebra', 'Shape', 'Data', 'Ratio'];

  const filteredTopics = Object.values(mathTopics).filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         topic.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = activeLevel === 'all' || topic.level === activeLevel;
    const matchesCategory = activeCategory === 'All' || topic.category === activeCategory;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-brand-text mb-8 tracking-tighter"
          >
            Digital <span className="text-gradient">Curriculum</span>
          </motion.h1>
          
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
            <div className="relative w-full lg:max-w-xl">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-text/20 w-6 h-6" />
              <input 
                type="text"
                placeholder="Search modules, keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-5 pl-16 pr-8 text-xl text-brand-text outline-none focus:border-emerald-500 transition-all"
              />
            </div>

            <div className="bg-white/5 p-1 rounded-xl border border-white/10 flex">
              {(['all', 'primary', 'secondary'] as const).map(level => (
                <button
                  key={level}
                  onClick={() => setActiveLevel(level)}
                  className={`px-8 py-2.5 rounded-lg font-bold text-lg transition-all capitalize ${activeLevel === level ? 'bg-emerald-600 text-white' : 'text-brand-text/40 hover:text-brand-text'}`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-lg font-bold transition-all border ${activeCategory === cat ? 'bg-brand-text text-brand-deep border-brand-text' : 'bg-white/5 text-brand-text/40 border-white/10 hover:border-white/30'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTopics.map((topic, i) => (
              <TopicCard 
                key={topic.id} 
                topic={topic} 
                index={i}
                onLesson={() => navigate(`/lesson/${topic.id}`)}
                onHomework={() => navigate(`/homework/${topic.id}`)}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredTopics.length === 0 && (
          <div className="text-center py-32 opacity-20">
            <p className="text-3xl font-black text-brand-text uppercase tracking-widest">No modules matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

const TopicCard = ({ topic, index, onLesson, onHomework }: { topic: Topic, index: number, onLesson: () => void, onHomework: () => void }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ delay: index * 0.05 }}
    className="ui-card p-10 flex flex-col group h-full"
  >
    <div className="flex justify-between items-start mb-8">
      <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center text-3xl border border-white/10">
        {topic.icon}
      </div>
      <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${topic.level === 'primary' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
        {topic.level}
      </div>
    </div>

    <h3 className="text-2xl font-black text-brand-text mb-3">{topic.title}</h3>
    <p className="text-brand-muted font-bold mb-10 flex-grow leading-relaxed">{topic.description}</p>

    <div className="space-y-4">
      <button 
        onClick={onLesson}
        className="w-full flex items-center justify-between px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold transition-all hover:bg-emerald-700 active:scale-95 group/btn"
      >
        Open Lesson <Play className="w-4 h-4" />
      </button>
      <button 
        onClick={onHomework}
        className="w-full flex items-center justify-between px-8 py-4 bg-white/5 hover:bg-white/10 text-brand-text rounded-xl font-bold border border-white/10 transition-all active:scale-95"
      >
        View Homework <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </motion.div>
);

export default Library;
