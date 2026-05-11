import React from 'react';
import { motion } from 'framer-motion';
import { LogIn, TrendingUp, ShieldCheck, Award, MessageSquareQuote, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden selection:bg-emerald-500/30">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Large Scale Geometric Overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1"/>
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
            <motion.circle 
              animate={{ r: [20, 25, 20] }}
              transition={{ duration: 10, repeat: Infinity }}
              cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.05" 
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-7xl md:text-[10rem] font-black text-brand-text mb-8 tracking-tighter leading-[0.85] font-sans">
                Mastering <br />
                <span className="text-gradient-lime">Mathematics.</span>
              </h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-2xl md:text-4xl text-brand-muted font-medium mb-16 max-w-3xl mx-auto leading-tight"
              >
                The UK's premier digital curriculum, optimized for <br className="hidden md:block" /> exceptional student attainment.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-8"
              >
                <button 
                  onClick={() => navigate('/get-started')}
                  className="w-full sm:w-auto btn-primary text-2xl"
                >
                  Get Started <Play className="w-8 h-8 fill-current" />
                </button>
                <button 
                  onClick={() => navigate('/login/school')}
                  className="w-full sm:w-auto btn-outline text-2xl"
                >
                  School Login <LogIn className="w-8 h-8" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Grid with Glassmorphism */}
      <section className="py-40 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <ImpactCard 
                icon={<TrendingUp className="w-12 h-12 text-emerald-400" />}
                title="Attainment"
                stat="+23%"
                description="Proven increase in student results through adaptive data tracking."
              />
              <ImpactCard 
                icon={<ShieldCheck className="w-12 h-12 text-lime-400" />}
                title="Verified"
                stat="OFSTED"
                description="Fully aligned with latest inspection framework standards."
              />
              <ImpactCard 
                icon={<Award className="w-12 h-12 text-yellow-400" />}
                title="Coverage"
                stat="100%"
                description="Complete national curriculum coverage for Primary & Secondary."
              />
           </div>
        </div>
      </section>

      {/* Testimonial Banner */}
      <section className="py-40 bg-white/[0.02] border-y border-white/5 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
           <MessageSquareQuote className="w-20 h-20 text-emerald-500/20 mx-auto mb-12" />
           <p className="text-4xl md:text-6xl font-black text-brand-text mb-12 tracking-tighter max-w-5xl mx-auto italic leading-tight">
             "The most significant advancement in digital math delivery we've seen in a decade."
           </p>
           <div className="text-2xl font-bold text-emerald-500">Dr. Elizabeth Thorne — CEO, Academic Trust North</div>
        </div>
      </section>
    </div>
  );
};

const ImpactCard = ({ icon, title, stat, description }: any) => (
  <div className="ui-card p-16 group">
    <div className="flex items-center justify-between mb-12">
      <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/10 group-hover:bg-emerald-500/10 transition-all">
        {icon}
      </div>
      <div className="text-5xl font-black text-brand-text tracking-tighter">{stat}</div>
    </div>
    <h3 className="text-3xl font-black text-brand-text mb-6">{title}</h3>
    <p className="text-xl text-brand-muted font-medium leading-relaxed">{description}</p>
  </div>
);

export default Home;
