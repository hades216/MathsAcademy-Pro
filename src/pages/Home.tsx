import React from 'react';
import { motion } from 'framer-motion';
import { LogIn, TrendingUp, ShieldCheck, Award, MessageSquareQuote, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="relative z-10 text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              {/* 3D Floating Decorative Element */}
              <motion.div
                animate={{ 
                  y: [0, -30, 0],
                  rotateX: [10, -10, 10],
                  rotateY: [10, -10, 10]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-500/5 rounded-[4rem] border border-white/5 preserve-3d -z-10 blur-sm hidden md:block"
              />
              
              <h1 className="text-7xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
                Advanced Maths. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-400">Simplified Results.</span>
              </h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-3xl text-slate-400 font-bold mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                The UK's most trusted mathematics platform, designed for modern schools and high-performing students.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6"
              >
                <button 
                  onClick={() => navigate('/get-started')}
                  className="w-full sm:w-auto btn-primary text-2xl px-12 py-6 flex items-center justify-center gap-4"
                >
                  Get Started <Play className="w-7 h-7" />
                </button>
                <button 
                  onClick={() => navigate('/login/school')}
                  className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 px-12 py-6 rounded-2xl font-bold text-2xl backdrop-blur-xl transition-all flex items-center justify-center gap-4"
                >
                  School Login <LogIn className="w-7 h-7" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact & Evidence Section */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-24">
             <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">Academic <span className="text-gradient">Excellence</span></h2>
             <p className="text-2xl text-slate-400 font-bold max-w-3xl mx-auto">Empowering over 80% of UK secondary schools with data-driven learning tools.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <ImpactCard 
                icon={<TrendingUp className="w-10 h-10 text-blue-400" />}
                title="Performance"
                stat="23%"
                description="Average increase in attainment after just one term of active platform use."
              />
              <ImpactCard 
                icon={<ShieldCheck className="w-10 h-10 text-indigo-400" />}
                title="Efficiency"
                stat="4hrs"
                description="Weekly time saved by teachers through automated marking and reporting."
              />
              <ImpactCard 
                icon={<Award className="w-10 h-10 text-blue-500" />}
                title="Compliance"
                stat="100%"
                description="Strictly aligned with the National Curriculum and latest Ofsted requirements."
              />
           </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-slate-900/50 backdrop-blur-3xl border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-5xl font-black text-white text-center mb-24 tracking-tighter">Trusted by <span className="text-gradient">Educators</span></h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Testimonial 
                quote="The platform has completely transformed how we manage homework. The clean interface and robust data sets are invaluable."
                author="Sarah Jenkins"
                role="Head of Maths, St. Peters Academy"
              />
              <Testimonial 
                quote="The automated feedback loop is exceptional. It allows for immediate intervention and personalized learning at scale."
                author="David Chen"
                role="KS2 Coordinator, Lincoln Primary"
              />
           </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">Choose Your <span className="text-gradient">Tier</span></h2>
          <p className="text-2xl text-slate-400 font-bold max-w-3xl mx-auto">Scalable solutions for individual schools and large trusts.</p>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
             <PricingCard title="Primary" price="£640" features={["Full Primary Curriculum", "Home Access", "Central Reporting"]} />
             <PricingCard title="Secondary" price="£895" features={["KS3, GCSE & A-Level", "Exam Practice", "Detailed Analytics"]} featured />
             <PricingCard title="Trust" price="Custom" features={["Multi-School Dashboard", "Dedicated Support", "Strategic Insights"]} />
          </div>
          <div className="mt-16 text-center">
            <button onClick={() => navigate('/pricing')} className="btn-outline px-12 py-5 text-xl">View Full Pricing Schedule</button>
          </div>
        </div>
      </section>
    </div>
  );
};

const ImpactCard = ({ icon, title, stat, description }: any) => (
  <div className="ui-card p-12 group">
    <div className="flex items-center justify-between mb-8">
      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-indigo-500/10 transition-all">
        {icon}
      </div>
      <div className="text-5xl font-black text-white tracking-tighter">{stat}</div>
    </div>
    <h3 className="text-2xl font-black text-white mb-4">{title}</h3>
    <p className="text-lg text-slate-400 font-bold leading-relaxed">{description}</p>
  </div>
);

const Testimonial = ({ quote, author, role }: any) => (
  <div className="ui-card p-12 relative">
    <MessageSquareQuote className="absolute top-8 right-8 w-12 h-12 text-white/5" />
    <p className="text-2xl text-white font-bold italic mb-8 leading-relaxed">"{quote}"</p>
    <div>
      <div className="font-black text-indigo-400 text-xl">{author}</div>
      <div className="text-slate-500 font-bold">{role}</div>
    </div>
  </div>
);

const PricingCard = ({ title, price, features, featured }: any) => (
  <div className={`ui-card p-10 flex flex-col text-center ${featured ? 'border-indigo-500/50 shadow-2xl' : ''}`}>
    <h3 className="text-2xl font-black text-white mb-4">{title}</h3>
    <div className="text-5xl font-black text-white mb-8">{price} <span className="text-sm text-slate-500">/ yr</span></div>
    <ul className="space-y-4 mb-10 flex-grow">
      {features.map((f: string) => (
        <li key={f} className="text-slate-400 font-bold">{f}</li>
      ))}
    </ul>
    <button className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${featured ? 'bg-indigo-600 text-white' : 'bg-white/5 text-white border border-white/10'}`}>Get Started</button>
  </div>
);

export default Home;
