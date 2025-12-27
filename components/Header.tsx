
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onNavigate: (view: any) => void;
  onEnquire: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onEnquire }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNav = (view: any) => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  const navLinks = [
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
        isScrolled || isMenuOpen ? 'bg-zinc-950/95 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div 
            className="flex items-center space-x-2 cursor-pointer group z-50"
            onClick={() => handleMobileNav('home')}
          >
            <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center transform rotate-45 group-hover:bg-amber-500 transition-all duration-300">
              <div className="w-4 h-4 bg-zinc-900 transform -rotate-45"></div>
            </div>
            <span className="text-xl md:text-2xl font-architectural font-bold tracking-tighter text-white group-hover:text-amber-500 transition-colors">
              STRUCTURA
            </span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex space-x-10 text-[9px] font-architectural font-bold uppercase tracking-[0.35em] text-zinc-400">
            {navLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => onNavigate(link.id)} 
                className="hover:text-amber-500 transition-colors relative group/link py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-500 transition-all group-hover/link:w-full"></span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('platform')}
              className="hidden sm:flex items-center space-x-2 border border-amber-600/30 text-amber-500 px-6 py-2.5 rounded-sm text-[9px] font-architectural font-bold uppercase tracking-[0.25em] hover:bg-amber-600 hover:text-white transition-all"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
              <span>Launch Platform</span>
            </button>
            
            <button 
              onClick={onEnquire}
              className="hidden sm:block bg-zinc-100 hover:bg-amber-600 text-zinc-950 hover:text-white px-8 py-2.5 rounded-sm text-[9px] font-architectural font-bold uppercase tracking-[0.25em] transition-all"
            >
              Enquire
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white p-2 z-50 focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-zinc-950 z-[55] transition-all duration-500 md:hidden ${
        isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col items-center justify-center h-full space-y-10 p-6">
          {navLinks.map((item) => (
            <button 
              key={item.id}
              onClick={() => handleMobileNav(item.id)}
              className="text-3xl font-architectural font-bold text-white uppercase tracking-tighter hover:text-amber-500 transition-colors"
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => handleMobileNav('platform')}
            className="w-full border border-amber-600 text-amber-500 py-6 font-architectural font-bold uppercase tracking-[0.3em] text-sm"
          >
            Open Platform
          </button>
          <button 
            onClick={() => handleMobileNav('enquire')}
            className="w-full bg-amber-600 text-white py-6 font-architectural font-bold uppercase tracking-[0.3em] text-sm"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
