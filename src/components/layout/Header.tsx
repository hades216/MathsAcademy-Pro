import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, BookOpen } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false); // DEFAULT TO LIGHT
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        scrolled 
          ? 'py-4 bg-brand-bg/60 backdrop-blur-3xl border-b border-black/5 dark:border-white/5 shadow-2xl' 
          : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 sm:gap-5 group">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-600 rounded-2xl sm:rounded-[1.5rem] flex items-center justify-center text-white shadow-xl transition-transform group-hover:scale-110 group-hover:rotate-6">
              <BookOpen className="w-7 h-7 sm:w-9 sm:h-9" />
            </div>
            <span className="text-2xl sm:text-4xl font-black tracking-tighter text-brand-text">MathsAcademy</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-14">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/library">Curriculum</NavLink>
            <NavLink to="/pricing">Pricing</NavLink>
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-8">
            <button 
              onClick={toggleTheme}
              className="p-4 bg-brand-text/5 hover:bg-brand-text/10 rounded-[1.5rem] transition-all border border-brand-text/10 text-emerald-600 dark:text-emerald-400"
            >
              {isDark ? <Sun className="w-7 h-7" /> : <Moon className="w-7 h-7" />}
            </button>
            <button 
              onClick={() => navigate('/login/student')}
              className="text-xl font-black text-brand-text hover:text-emerald-500 transition-colors"
            >
              Portal
            </button>
            <button 
              onClick={() => navigate('/login/school')}
              className="btn-primary py-4 px-12 text-xl"
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-6">
             <button onClick={toggleTheme} className="p-2 text-brand-text">
               {isDark ? <Sun className="w-8 h-8" /> : <Moon className="w-8 h-8" />}
             </button>
             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-brand-text">
               {isMenuOpen ? <X className="w-10 h-10" /> : <Menu className="w-10 h-10" />}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-brand-bg/98 backdrop-blur-3xl border-b border-black/5 dark:border-white/5 p-6 sm:p-12 space-y-6 sm:space-y-10 shadow-3xl">
          <Link to="/" className="block text-3xl sm:text-4xl font-black text-brand-text" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/library" className="block text-3xl sm:text-4xl font-black text-brand-text" onClick={() => setIsMenuOpen(false)}>Curriculum</Link>
          <Link to="/pricing" className="block text-3xl sm:text-4xl font-black text-brand-text" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
          <div className="pt-8 sm:pt-10 border-t border-black/5 space-y-6 sm:space-y-8">
            <button className="w-full btn-primary py-5 sm:py-7 text-2xl sm:text-3xl">School Access</button>
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
      className={`text-2xl font-black transition-all hover:text-emerald-600 ${isActive ? 'text-emerald-600 underline underline-offset-[16px] decoration-4' : 'text-brand-text'}`}
    >
      {children}
    </Link>
  );
};

export default Header;
