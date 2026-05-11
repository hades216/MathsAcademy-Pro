import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex items-center gap-1">
              <div className="w-10 h-10 bg-mymaths-blue rounded-lg flex items-center justify-center text-white font-bold text-2xl">M</div>
              <span className="text-2xl font-black tracking-tighter text-mymaths-dark">MyMaths</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-600 hover:text-mymaths-blue font-medium transition-colors">How it works</Link>
            <Link to="/library" className="text-gray-600 hover:text-mymaths-blue font-medium transition-colors">Content library</Link>
            <Link to="/" className="text-gray-600 hover:text-mymaths-blue font-medium transition-colors">Pricing</Link>
            <div className="relative group">
              <button className="flex items-center text-gray-600 hover:text-mymaths-blue font-medium transition-colors">
                Support <ChevronDown className="ml-1 w-4 h-4" />
              </button>
            </div>
            
            <div className="h-6 w-px bg-gray-200 mx-2"></div>
            
            <Link to="/login/school" className="btn-primary flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              Log in
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-mymaths-blue hover:bg-gray-50">How it works</Link>
            <Link to="/library" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-mymaths-blue hover:bg-gray-50">Content library</Link>
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-mymaths-blue hover:bg-gray-50">Pricing</Link>
            <Link to="/login/school" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-mymaths-blue hover:bg-mymaths-dark mt-4">Log in</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
