import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Play, BookOpen, BarChart3, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
            >
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-mymaths-blue/10 text-mymaths-blue mb-4">
                Trusted by over 4 million students
              </span>
              <h1 className="text-4xl tracking-tight font-black text-mymaths-dark sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span className="block">Your experience,</span>
                <span className="block text-mymaths-blue">our expertise.</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                MyMaths provides a fully-randomised online homework system, interactive lessons, and automated marking for schools. Perfect for KS1 through to A Level.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0 flex flex-wrap gap-4">
                <button 
                  onClick={() => navigate('/login/school')}
                  className="btn-primary text-lg px-8 py-3"
                >
                  Get Started
                </button>
                <button className="btn-outline text-lg px-8 py-3 flex items-center gap-2">
                  <Play className="w-5 h-5 fill-current" />
                  Watch Demo
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
            >
              <div className="relative mx-auto w-full rounded-2xl shadow-2xl overflow-hidden border-8 border-white">
                <img
                  className="w-full"
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200"
                  alt="Student using MyMaths"
                />
                <div className="absolute inset-0 bg-mymaths-blue/10 flex items-center justify-center">
                  <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl text-mymaths-blue hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-mymaths-dark sm:text-4xl">Why choose MyMaths?</h2>
            <p className="mt-4 text-xl text-gray-500">Everything you need to inspire a love of mathematics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BookOpen className="w-8 h-8 text-white" />}
              title="Flexible"
              description="A huge library of interactive lessons and homework tasks for all ages and abilities."
              color="bg-mymaths-blue"
            />
            <FeatureCard 
              icon={<BarChart3 className="w-8 h-8 text-white" />}
              title="Limitless homework practice"
              description="Randomised questions mean students can practice tasks as many times as they need."
              color="bg-mymaths-green"
            />
            <FeatureCard 
              icon={<Users className="w-8 h-8 text-white" />}
              title="You're in control"
              description="Track progress easily with our automated marking and traffic-light results system."
              color="bg-mymaths-orange"
            />
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-black text-mymaths-dark mb-6">Complete curriculum coverage</h2>
              <p className="text-lg text-gray-600 mb-8">
                From the early years of Primary school to the challenges of A Level, MyMaths supports the entire mathematical journey.
              </p>
              <ul className="space-y-4">
                {[
                  "Primary (KS1 & KS2)",
                  "Secondary (KS3, GCSE & IGCSE)",
                  "Post-16 (A Level & IB)",
                  "Booster packs for revision",
                  "Games and engagement tools"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-mymaths-green" />
                    <span className="font-semibold text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-10 btn-primary flex items-center gap-2">
                Explore the library <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="lg:w-1/2 mt-12 lg:mt-0 grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                  <div className="w-12 h-12 bg-mymaths-blue rounded-xl mb-4 flex items-center justify-center text-white font-bold">1</div>
                  <h3 className="font-bold text-lg mb-2">Interactive</h3>
                  <p className="text-sm text-gray-500">Engaging lessons with animations and tools.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                  <div className="w-12 h-12 bg-mymaths-green rounded-xl mb-4 flex items-center justify-center text-white font-bold">2</div>
                  <h3 className="font-bold text-lg mb-2">Instant</h3>
                  <p className="text-sm text-gray-500">Marking and feedback provided immediately.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                  <div className="w-12 h-12 bg-mymaths-orange rounded-xl mb-4 flex items-center justify-center text-white font-bold">3</div>
                  <h3 className="font-bold text-lg mb-2">Tracking</h3>
                  <p className="text-sm text-gray-500">Powerful dashboards for teachers and students.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                  <div className="w-12 h-12 bg-mymaths-dark rounded-xl mb-4 flex items-center justify-center text-white font-bold">4</div>
                  <h3 className="font-bold text-lg mb-2">Results</h3>
                  <p className="text-sm text-gray-500">Comprehensive reports at your fingertips.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, color }: { icon: React.ReactNode, title: string, description: string, color: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center"
  >
    <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mb-6 shadow-inner`}>
      {icon}
    </div>
    <h3 className="text-2xl font-black text-mymaths-dark mb-4">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{description}</p>
  </motion.div>
);

export default Home;
