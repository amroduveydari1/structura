
import React, { useState, useMemo } from 'react';
import { PROJECTS } from '../constants';
import Project3DViewer from './Project3DViewer';

const CATEGORIES = ['All', 'Residential', 'Commercial', 'Infrastructure', 'Renovation'];

interface PortfolioProps {
  onProjectSelect: (id: string) => void;
  isFullView?: boolean;
  onViewAll?: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onProjectSelect, isFullView = true, onViewAll }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selected3D, setSelected3D] = useState<'tower' | 'villa' | null>(null);

  const filteredProjects = useMemo(() => {
    let list = activeFilter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === activeFilter);
    return !isFullView ? list.slice(0, 4) : list;
  }, [activeFilter, isFullView]);

  return (
    <section id="projects" className="pt-24 pb-32 bg-zinc-950 relative overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 bg-grid-wallpaper opacity-[0.03] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 space-y-8 md:space-y-0">
          <div className="animate-fade-in-up">
            <span className="text-amber-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-5 block font-architectural">Selected Works</span>
            <h2 className="text-4xl md:text-5xl font-architectural font-bold text-white tracking-tighter uppercase leading-tight">
              ARCHITECTURAL <br /><span className="text-zinc-600">LANDMARKS</span>
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-4 md:gap-10 border-b border-white/10 pb-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-[9px] font-architectural font-bold uppercase tracking-[0.25em] transition-all relative pb-3 ${
                  activeFilter === cat 
                    ? 'text-amber-500' 
                    : 'text-zinc-500 hover:text-white'
                }`}
              >
                {cat}
                {activeFilter === cat && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-500 animate-fade-in-up"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 transition-all duration-500">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              onClick={() => onProjectSelect(project.id)}
              className="group bg-zinc-900/40 border border-zinc-800/50 hover:border-amber-500/40 transition-all duration-700 overflow-hidden cursor-pointer animate-fade-in-up flex flex-col"
            >
              <div className="relative h-[300px] md:h-[500px] overflow-hidden bg-zinc-900">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
                
                {project.has3D && (
                  <div className="absolute top-8 right-8 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected3D(project.id === '1' ? 'tower' : 'villa');
                      }}
                      className="bg-amber-600 text-white px-6 py-3 rounded-sm text-[9px] font-architectural font-bold uppercase tracking-[0.2em] hover:bg-amber-700 transition-all flex items-center space-x-3 shadow-xl"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"/></svg>
                      <span>Simulate BIM</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-col flex-1">
                <div className="p-10 md:p-12 border-b border-white/5 flex justify-between items-center group/title transition-all">
                  <div className="space-y-4">
                    <span className="text-[10px] text-amber-500 font-bold tracking-[0.3em] uppercase block font-architectural">
                      {project.category}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-architectural font-bold text-white tracking-tighter uppercase leading-none pb-4 group-hover:text-amber-500 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center bg-zinc-800/50 border border-zinc-700/50 text-white group-hover:bg-amber-600 group-hover:border-amber-500 transition-all duration-500 shrink-0 ml-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </div>
                </div>

                <div className="px-10 md:px-12 py-8 bg-white/[0.02] flex flex-wrap gap-x-12 gap-y-6 justify-between items-center">
                  <div className="flex items-center space-x-12">
                    <div className="flex flex-col space-y-2">
                      <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-[0.2em] font-architectural">Node Reference</span>
                      <span className="text-[12px] text-zinc-300 font-mono tracking-widest font-bold">ST-{project.year}-00{project.id}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 rounded-sm backdrop-blur-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                    <span className="text-[9px] text-emerald-500 uppercase tracking-widest font-bold font-architectural">Structural OK</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {!isFullView && (
          <div className="mt-28 text-center animate-fade-in-up">
            <button 
              onClick={onViewAll}
              className="group relative inline-flex items-center bg-white text-zinc-950 px-16 py-6 text-[10px] font-architectural font-bold uppercase tracking-[0.4em] hover:bg-amber-600 hover:text-white transition-all overflow-hidden"
            >
              <span className="relative z-10">Access Global Archives</span>
              <span className="relative z-10 ml-5 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
            </button>
          </div>
        )}
      </div>

      {selected3D && (
        <Project3DViewer 
          type={selected3D} 
          onClose={() => setSelected3D(null)} 
        />
      )}
    </section>
  );
};

export default Portfolio;
