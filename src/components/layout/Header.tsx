import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, BookOpen } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('light');
  };

  return (
    <header 
      className={`sticky top-0 z-[100] transition-all duration-700 ${
        scrolled 
          ? 'py-4 bg-brand-bg/60 backdrop-blur-3xl border-b border-black/5 dark:border-white/5 shadow-2xl' 
          : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl transition-transform group-hover:scale-110 group-hover:rotate-6">
              <BookOpen className="w-7 h-7" />
            </div>
            <span className="text-3xl font-black tracking-tighter text-brand-text">MathsAcademy</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/library">Curriculum</NavLink>
            <NavLink to="/pricing">Pricing</NavLink>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={toggleTheme}
              className="p-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-2xl transition-all border border-black/10 dark:border-white/10 text-indigo-600 dark:text-indigo-400"
            >
              {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
            <button 
              onClick={() => navigate('/login/student')}
              className="px-8 py-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-brand-text rounded-2xl font-black transition-all border border-black/10 dark:border-white/10"
            >
              Student Portal
            </button>
            <button 
              onClick={() => navigate('/login/school')}
              className="btn-primary"
            >
              School Login
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
             <button onClick={toggleTheme} className="p-2 text-brand-text transition-transform active:rotate-180">
               {isDark ? <Sun className="w-7 h-7" /> : <Moon className="w-7 h-7" />}
             </button>
             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-brand-text">
               {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-bg border-b border-black/10 dark:border-white/10 p-10 space-y-8 shadow-3xl animate-in slide-in-from-top duration-500">
          <Link to="/" className="block text-3xl font-black text-brand-text" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/library" className="block text-3xl font-black text-brand-text" onClick={() => setIsMenuOpen(false)}>Curriculum</Link>
          <Link to="/pricing" className="block text-3xl font-black text-brand-text" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
          <div className="pt-8 border-t border-black/5 dark:border-white/5 space-y-6">
            <button className="w-full btn-primary py-6 text-xl">School Access</button>
            <button className="w-full py-6 bg-black/5 dark:bg-white/5 text-brand-text rounded-3xl font-black text-xl border border-black/10 dark:border-white/10">Student Portal</button>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ to, children }: { to: string, children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link 
      to={to} 
      className={`text-xl font-black transition-all hover:text-brand-text ${isActive ? 'text-brand-text underline decoration-indigo-600 dark:decoration-indigo-500 decoration-4 underline-offset-[12px]' : 'text-brand-muted'}`}
    >
      {children}
    </Link>
  );
};

export default Header;
