import React from 'react';
import { motion } from 'framer-motion';
import { Check, Rocket, Star, Users, Globe } from 'lucide-react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Primary School",
      price: "£640",
      period: "per year",
      description: "Full access for all teachers and students in a primary school.",
      features: [
        "Interactive Lessons (Primary)",
        "Automated Homework",
        "Teacher Dashboard",
        "Progress Tracking",
        "Home Access for Students",
        "Parent Engagement Tools"
      ],
      icon: <Star className="w-8 h-8 text-yellow-400" />,
      color: "from-indigo-500 to-purple-600"
    },
    {
      name: "Secondary School",
      price: "£895",
      period: "per year",
      description: "Comprehensive tools for secondary education and exam prep.",
      features: [
        "KS3 & GCSE Content",
        "A-Level Extensions",
        "Exam Practice Papers",
        "Detailed Analytics",
        "Unlimited Student Accounts",
        "Priority Support"
      ],
      icon: <Rocket className="w-8 h-8 text-pink-500" />,
      color: "from-purple-600 to-pink-600",
      featured: true
    },
    {
      name: "Multi-Academy Trust",
      price: "Custom",
      period: "enquire for price",
      description: "Scalable solution for groups of schools with centralized reporting.",
      features: [
        "Central MAT Dashboard",
        "Cross-School Benchmarking",
        "Strategic Data Insights",
        "Dedicated Account Manager",
        "Bulk Licensing Discounts",
        "Custom Integration Support"
      ],
      icon: <Globe className="w-8 h-8 text-emerald-400" />,
      color: "from-emerald-500 to-teal-600"
    }
  ];

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-black text-white mb-8 tracking-tighter"
          >
            Transparent <span className="text-gradient">Pricing</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-indigo-100/40 font-bold max-w-3xl mx-auto"
          >
            Choose the perfect plan for your school and start your mathematical journey today.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`galaxy-card relative p-12 flex flex-col ${plan.featured ? 'border-indigo-500/50 shadow-indigo-500/20 scale-105 z-10' : ''}`}
            >
              {plan.featured && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-indigo-500 text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                  Most Popular
                </div>
              )}
              
              <div className="flex items-center gap-6 mb-10">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
                  {plan.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                  <p className="text-indigo-200/40 font-bold">{plan.period}</p>
                </div>
              </div>

              <div className="mb-10">
                <span className="text-6xl font-black text-white">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-2xl text-white/20 ml-2">+VAT</span>}
              </div>

              <p className="text-lg text-indigo-100/60 font-bold mb-10 leading-relaxed">
                {plan.description}
              </p>

              <div className="flex-grow space-y-5 mb-12">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-indigo-100/80 font-bold">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-5 rounded-[1.5rem] font-black text-xl transition-all active:scale-95 ${plan.featured ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/40 hover:bg-indigo-600' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Preview or Secondary CTA */}
        <div className="mt-32 galaxy-card p-16 text-center">
          <Users className="w-16 h-16 text-indigo-400 mx-auto mb-8 opacity-40" />
          <h2 className="text-4xl font-black text-white mb-6">Need a custom quote?</h2>
          <p className="text-xl text-indigo-100/40 font-bold max-w-2xl mx-auto mb-10">
            We offer flexible licensing for international schools, private tutors, and government bodies. Contact our fleet advisors for a bespoke proposal.
          </p>
          <button className="btn-outline px-12 py-5 text-xl">Contact Sales Team</button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
