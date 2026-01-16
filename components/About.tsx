
import React from 'react';

const About: React.FC = () => {
  const handleDownloadMethodology = () => {
    const year = new Date().getFullYear();
    const dummyContent = `STRUCTURA ENGINEERING METHODOLOGY (${year})\n\nPhase 1: Conceptual Stress Testing\nPhase 2: Digital Twin Simulation\nPhase 3: Material Optimization\nPhase 4: Precision Execution\n\nOur methodology ensures sub-millimeter accuracy in all projects using BIM Level 400 coordination.`;
    const blob = new Blob([dummyContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Structura_Methodology_v${year}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="about" className="pt-16 pb-24 bg-zinc-900 text-white overflow-hidden relative">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 opacity-5 pointer-events-none">
        <span className="text-[20rem] font-architectural font-bold leading-none select-none">STRUCTURA</span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -left-4 -top-4 w-24 h-24 border-t-2 border-l-2 border-amber-600"></div>
            <img 
              src="https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1200" 
              alt="Structural Detail" 
              className="hover:scale-105 transition-all duration-700 shadow-2xl w-full h-auto object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200';
              }}
            />
            <div className="absolute bottom-8 right-8 bg-zinc-900 p-8 border-l-4 border-amber-600 shadow-xl max-w-xs">
              <span className="text-4xl font-architectural font-bold text-amber-500 block mb-2">25+</span>
              <span className="text-zinc-400 text-xs uppercase tracking-[0.2em] font-bold">Years of Architectural Prowess</span>
            </div>
          </div>

          <div>
            <span className="text-amber-500 font-bold uppercase tracking-widest text-[10px] mb-6 block font-architectural">The Technology Core</span>
            <h2 className="text-4xl md:text-5xl font-architectural font-bold mb-8 tracking-tighter leading-tight uppercase">
              A PLATFORM <br /><span className="text-zinc-500">FOR PROFESSIONALS</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8 font-light">
              STRUCTURA is a modern construction technology platform designed to support construction and architecture professionals by providing a structured, centralized system for managing tools, workflows, and operational processes across the entire lifecycle of a building project.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-2">
                <h4 className="text-white font-architectural font-bold uppercase text-[10px] tracking-widest text-amber-500">Performance</h4>
                <p className="text-zinc-500 text-xs font-light leading-relaxed">High-tolerance engineering that eliminates bottlenecks in the design-to-build phase.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-architectural font-bold uppercase text-[10px] tracking-widest text-amber-500">Scalability</h4>
                <p className="text-zinc-500 text-xs font-light leading-relaxed">Infrastructure designed to grow with your vision, from residential nodes to metropolitan hubs.</p>
              </div>
            </div>

            <div className="p-8 border border-white/5 bg-white/[0.02] mb-10">
               <h4 className="text-zinc-300 font-bold uppercase text-xs mb-4 tracking-widest">Platform Vision</h4>
               <p className="text-zinc-500 text-sm italic font-light">
                 "STRUCTURA focuses on clarity, performance, and scalability — helping teams reduce complexity, improve coordination, and work more efficiently in real-world construction environments."
               </p>
            </div>

            <button 
              onClick={handleDownloadMethodology}
              className="bg-white text-zinc-900 px-10 py-5 font-architectural font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-amber-600 hover:text-white transition-all flex items-center space-x-4"
            >
              <span>Platform Protocol (PDF)</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
