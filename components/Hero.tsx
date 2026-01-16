
import React, { useState } from 'react';
import LegacyPresentation from './LegacyPresentation';

const Hero: React.FC = () => {
  const [showLegacy, setShowLegacy] = useState(false);

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-zinc-950">
      {/* Primary Wallpaper Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=90&w=2400" 
          alt="Structura Hero Wallpaper" 
          className="w-full h-full object-cover opacity-40 scale-105 transition-transform duration-[15s] ease-linear transform hover:scale-100"
        />
        {/* Architectural Technical Overlays */}
        <div className="absolute inset-0 bg-grid-wallpaper opacity-20"></div>
        <div className="absolute inset-0 bg-dot-wallpaper opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-10">
        <div className="max-w-4xl animate-fade-in-up">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-[1px] bg-amber-500"></div>
            <span className="text-amber-500 font-architectural font-bold uppercase tracking-[0.5em] text-[10px] md:text-xs">
              Legacy of Excellence
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-architectural font-bold text-white mb-10 leading-[1] tracking-tighter uppercase">
            CRAFTING THE <br />
            <span className="text-zinc-600">NEW HORIZON</span>
          </h1>
          
          <p className="text-zinc-400 text-base md:text-xl max-w-2xl mb-14 leading-relaxed font-light border-l-2 border-amber-600/30 pl-8">
            We bridge the gap between visionary architectural concepts and tangible structural reality.
            Premium materials, sustainable engineering, and uncompromising precision in every joint.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
            <button 
              onClick={scrollToProjects}
              className="group relative overflow-hidden bg-amber-600 text-white px-12 py-6 font-architectural font-bold uppercase tracking-[0.3em] text-[10px] transition-all text-center"
            >
              <span className="relative z-10">Explore Portfolio</span>
              <div className="absolute inset-0 bg-amber-700 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            <button 
              onClick={() => setShowLegacy(true)}
              className="group relative border border-white/20 hover:border-white/50 text-white px-12 py-6 font-architectural font-bold uppercase tracking-[0.3em] text-[10px] transition-all text-center"
            >
              <span className="relative z-10">Our Legacy (Digital Dossier)</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Technical Elements */}
      <div className="absolute top-1/2 right-12 -translate-y-1/2 hidden xl:block pointer-events-none">
        <div className="text-white/5 font-architectural text-[15rem] leading-none select-none origin-center rotate-90 tracking-tighter">
          STRUCTURA
        </div>
      </div>

      <div className="absolute bottom-12 left-6 md:left-12 flex items-center space-x-6 text-white/20 text-[8px] uppercase tracking-[0.4em] font-architectural font-bold">
        <span>Precision: 0.001mm</span>
        <div className="w-8 h-[1px] bg-white/10"></div>
        <span>BIM Level: 400</span>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-[1px] h-16 bg-gradient-to-b from-amber-500/50 to-transparent"></div>
      </div>

      {showLegacy && <LegacyPresentation onClose={() => setShowLegacy(false)} />}
    </section>
  );
};

export default Hero;
