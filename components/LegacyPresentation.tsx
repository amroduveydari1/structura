
import React, { useState } from 'react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  emphasis: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    title: "THE GENESIS OF PRECISION",
    subtitle: "ESTABLISHED 1998",
    description: "Born from the intersection of aerospace engineering and classical architecture, STRUCTURA was founded to solve the unsolvable. We don't just build; we engineer emotions into the very steel that supports our skyline.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1600",
    emphasis: "Foundations are built on trust, but landmarks are built on integrity."
  },
  {
    id: 2,
    title: "MISSION CONTROL: THE PLATFORM",
    subtitle: "DIGITAL TWIN REVOLUTION",
    description: "Our proprietary Platform is the digital nervous system of every project. It connects the architect's hand to the machine's precision, allowing for BIM Level 400 coordination that eliminates human error before the first foundation pour.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1600",
    emphasis: "Sub-millimeter accuracy is our standard, not our goal."
  },
  {
    id: 3,
    title: "THE ARCHITECTURE OF EMOTION",
    subtitle: "HUMAN-CENTRIC DESIGN",
    description: "Beyond the load-bearing calculations lies the human experience. We craft environments that breathe, inspire, and evolve. Our legacy is measured in the lives enriched by the spaces we curate.",
    image: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1600",
    emphasis: "Buildings should be more than stone and glass; they should be poetry."
  },
  {
    id: 4,
    title: "A FUTURE-PROOF LEGACY",
    subtitle: "TOWARDS 2050",
    description: "Sustainability is not a feature; it is our structural core. By leveraging material science and carbon-neutral logistics, we ensure that our buildings stand for centuries as monuments to a responsible future.",
    image: "https://images.unsplash.com/photo-1449156001931-8283327c5f14?auto=format&fit=crop&q=80&w=1600",
    emphasis: "We are building the heritage of the next thousand years."
  }
];

const LegacyPresentation: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  const handleDownloadDossier = () => {
    const timestamp = new Date().getFullYear();
    const dossierContent = `
============================================================
           S T R U C T U R A  |  L E G A C Y  D O S S I E R
============================================================
              ARCHITECTURAL EXCELLENCE SINCE 1998
============================================================

1. THE MANIFESTO
At STRUCTURA, we believe that architecture is the ultimate bridge 
between the ephemeral dream and the concrete reality. Our legacy
is defined by uncompromising precision and the emotional resonance 
of the spaces we engineer.

2. THE PLATFORM (MISSION CONTROL)
Our professional suite (STRUCTURA v2.5.0) enables:
- BIM Level 400 Coordination
- Sub-millimeter clash detection
- Real-time carbon impact auditing
- Decentralized stakeholder sync

3. CORE VALUES
- INTEGRITY: Structural and ethical stability in every joint.
- INNOVATION: Proprietary alloy systems and digital twin nodes.
- EMOTION: Human-centric design that inspires long-term occupancy.

4. GLOBAL IMPACT
- 450+ Major Landmarks Delivered
- 12M Sq. Meters Engineered
- 24 International Offices

Generated for amrostudio1@gmail.com relay.
(c) ${timestamp} STRUCTURA GLOBAL HOLDINGS.
============================================================
    `;
    const blob = new Blob([dossierContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `STRUCTURA_LEGACY_DOSSIER_${timestamp}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col animate-fade-in-up">
      {/* Background and Slide Content */}
      <div className="relative flex-1 flex overflow-hidden">
        {SLIDES.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
              index === activeSlide ? 'opacity-100 translate-x-0' : 
              index < activeSlide ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'
            }`}
          >
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover opacity-30"
            />
            
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-6 md:px-24">
                <div className="max-w-4xl">
                  <span className="text-amber-500 font-architectural font-bold uppercase tracking-[0.5em] text-[10px] md:text-xs mb-6 block">
                    {slide.subtitle}
                  </span>
                  <h2 className="text-4xl md:text-7xl font-architectural font-bold text-white mb-10 tracking-tighter leading-none">
                    {slide.title}
                  </h2>
                  <p className="text-zinc-400 text-lg md:text-2xl font-light leading-relaxed mb-12 max-w-2xl border-l border-zinc-700 pl-8">
                    {slide.description}
                  </p>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 inline-block">
                    <span className="text-amber-600 font-architectural font-bold uppercase text-[9px] tracking-[0.3em] block mb-2">Architectural Focus</span>
                    <p className="text-white font-medium italic text-sm md:text-base">"{slide.emphasis}"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Brand Watermark */}
        <div className="absolute top-10 left-10 flex items-center space-x-4">
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="20" width="60" height="60" fill="white" transform="rotate(45 50 50)"/>
            <rect x="35" y="35" width="30" height="30" fill="black" transform="rotate(45 50 50)"/>
          </svg>
          <span className="text-white font-architectural font-bold tracking-tighter text-lg">STRUCTURA</span>
        </div>

        {/* Exit Button */}
        <button 
          onClick={onClose}
          className="absolute top-10 right-10 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all z-50 group"
        >
          <svg className="w-6 h-6 transform group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        {/* Navigation Arrows */}
        <div className="absolute bottom-24 right-10 flex space-x-4">
          <button 
            onClick={prevSlide}
            className="w-14 h-14 border border-white/20 flex items-center justify-center text-white hover:border-amber-500 hover:text-amber-500 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button 
            onClick={nextSlide}
            className="w-14 h-14 bg-white text-black flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      {/* Presentation Footer */}
      <div className="h-24 bg-black border-t border-white/5 px-10 flex justify-between items-center">
        <div className="flex space-x-2">
          {SLIDES.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setActiveSlide(i)}
              className={`h-1 transition-all duration-500 ${i === activeSlide ? 'w-12 bg-amber-500' : 'w-6 bg-zinc-800 hover:bg-zinc-600'}`}
            />
          ))}
        </div>
        <button 
          onClick={handleDownloadDossier}
          className="flex items-center space-x-3 text-[9px] font-architectural font-bold uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition-colors"
        >
          <span>Download Formal Dossier (PDF)</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
        </button>
      </div>
    </div>
  );
};

export default LegacyPresentation;
