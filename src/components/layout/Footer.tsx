import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Share2, Camera, Video, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-mymaths-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-6">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-mymaths-dark font-bold text-xl">M</div>
              <span className="text-xl font-black tracking-tighter text-white">MyMaths</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Providing expert maths resources for over 20 years. Part of the Oxford University Press family.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Globe className="w-5 h-5" />} />
              <SocialIcon icon={<Share2 className="w-5 h-5" />} />
              <SocialIcon icon={<Camera className="w-5 h-5" />} />
              <SocialIcon icon={<Video className="w-5 h-5" />} />
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Resources</h4>
            <ul className="space-y-4">
              <FooterLink to="/library">Content Library</FooterLink>
              <FooterLink to="/">Sample Lessons</FooterLink>
              <FooterLink to="/">Case Studies</FooterLink>
              <FooterLink to="/">News</FooterLink>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4">
              <FooterLink to="/">Help Center</FooterLink>
              <FooterLink to="/">System Requirements</FooterLink>
              <FooterLink to="/">Contact Us</FooterLink>
              <FooterLink to="/">Accessibility</FooterLink>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-6">Stay Updated</h4>
            <p className="text-sm text-gray-400 mb-4">Get the latest news and updates from MyMaths.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 border-none rounded-l-lg px-4 py-2 w-full focus:ring-1 focus:ring-mymaths-blue"
              />
              <button className="bg-mymaths-blue hover:bg-blue-600 rounded-r-lg px-4 py-2 transition-colors">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} MyMaths by Oxford University Press. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link to="/" className="hover:text-white transition-colors">Legal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-mymaths-blue transition-all">
    {icon}
  </a>
);

const FooterLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
  <li>
    <Link to={to} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">
      {children}
    </Link>
  </li>
);

export default Footer;
