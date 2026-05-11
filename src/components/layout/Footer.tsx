import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Sparkles, Share2, Globe, Heart, Bell } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/5 backdrop-blur-xl border-t border-white/10 pt-24 pb-12 relative overflow-hidden">
      {/* Background Starfield for Footer */}
      <div className="absolute inset-0 stars opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-indigo-500/20">
                <Sparkles className="w-7 h-7" />
              </div>
              <span className="text-3xl font-black tracking-tighter text-white">Maths</span>
            </div>
            <p className="text-indigo-100/40 text-lg font-bold leading-relaxed mb-8">
              Empowering the next generation of explorers with stellar mathematical skills.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Globe className="w-5 h-5" />} />
              <SocialIcon icon={<Share2 className="w-5 h-5" />} />
              <SocialIcon icon={<Heart className="w-5 h-5" />} />
              <SocialIcon icon={<Bell className="w-5 h-5" />} />
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-black text-xl mb-8 uppercase tracking-widest">Sectors</h4>
            <ul className="space-y-4">
              <FooterLink to="/">Mission Control</FooterLink>
              <FooterLink to="/library">Stellar Library</FooterLink>
              <FooterLink to="/">Star Map</FooterLink>
              <FooterLink to="/">Fleet Academy</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-xl mb-8 uppercase tracking-widest">Crew Resources</h4>
            <ul className="space-y-4">
              <FooterLink to="/">Deck Support</FooterLink>
              <FooterLink to="/">Training Logs</FooterLink>
              <FooterLink to="/">Privacy Protocol</FooterLink>
              <FooterLink to="/">Terms of Service</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-black text-xl mb-8 uppercase tracking-widest">Transmission</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-indigo-100/40 font-bold group cursor-pointer">
                <Mail className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span>support@maths.galaxy</span>
              </li>
              <li className="flex items-start gap-4 text-indigo-100/40 font-bold group cursor-pointer">
                <Phone className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span>+44 800 GALAXY</span>
              </li>
              <li className="flex items-start gap-4 text-indigo-100/40 font-bold group cursor-pointer">
                <MapPin className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span>Nebula Sector 7, Orbital Station</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-indigo-100/20 font-bold">© 2026 Maths Galaxy Platform. All rights reserved.</p>
          <div className="flex gap-8 text-indigo-100/20 font-bold text-sm">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Cookies</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
  <li>
    <Link to={to} className="text-indigo-100/40 hover:text-white font-bold transition-all flex items-center gap-2 group">
      <div className="w-1.5 h-1.5 bg-indigo-500/20 rounded-full group-hover:bg-indigo-400 transition-colors"></div>
      {children}
    </Link>
  </li>
);

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <button className="w-12 h-12 bg-white/5 hover:bg-indigo-500/20 text-indigo-400 hover:text-white rounded-xl flex items-center justify-center transition-all border border-white/10 group">
    <div className="group-hover:scale-110 transition-transform">
      {icon}
    </div>
  </button>
);

export default Footer;
