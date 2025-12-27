
import React, { useState } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../constants';
import Project3DViewer from './Project3DViewer';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onNavigateToProject?: (id: string) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack, onNavigateToProject }) => {
  const [show3D, setShow3D] = useState(false);

  const currentIndex = PROJECTS.findIndex(p => p.id === project.id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];

  const handleDownloadPDF = () => {
    const dummyContent = `STRUCTURA ARCHITECTURAL ENGINEERING\n====================================\nProject: ${project.title}\nCategory: ${project.category}\nYear: ${project.year}\nReference: ST-${project.year}-${project.id.padStart(3, '0')}\n\nFull case study and technical specification dossier for the ${project.title} project. All structural nodes verified to BIM Level 400 standard.`;
    const blob = new Blob([dummyContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Structura_Case_Study_${project.title.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="animate-fade-in-up bg-zinc-950 min-h-screen">
      {/* Project Hero */}
      <section className="relative h-[80vh] flex items-center bg-zinc-950 overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
        
        <div className="container mx-auto px-6 relative z-10 pt-20">
          <button 
            onClick={onBack}
            className="flex items-center space-x-3 text-white/50 hover:text-amber-500 transition-colors uppercase tracking-[0.3em] text-[10px] font-architectural font-bold mb-10 group"
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            <span>Exit to Gallery</span>
          </button>
          
          <span className="text-amber-500 font-bold uppercase tracking-[0.4em] mb-4 text-[11px] block font-architectural">{project.category}</span>
          <h1 className="text-5xl md:text-9xl font-architectural font-bold text-white tracking-tighter uppercase mb-10 leading-[0.85] max-w-5xl">
            {project.title}
          </h1>

          <div className="flex flex-col sm:flex-row gap-6">
            {project.has3D && (
              <button 
                onClick={() => setShow3D(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-5 rounded-sm text-[10px] font-architectural font-bold uppercase tracking-[0.25em] transition-all flex items-center space-x-4 shadow-2xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"/></svg>
                <span>Initialize BIM Simulation</span>
              </button>
            )}
            <button 
              onClick={handleDownloadPDF}
              className="border border-white/20 hover:border-amber-500 hover:text-amber-500 text-white px-10 py-5 rounded-sm text-[10px] font-architectural font-bold uppercase tracking-[0.25em] transition-all flex items-center space-x-4 backdrop-blur-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              <span>Download Blueprint</span>
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-32 bg-zinc-950 border-b border-white/5">
        <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row gap-8 mb-20">
             <div className="md:w-1/3">
                <h2 className="text-zinc-500 font-architectural font-bold uppercase tracking-[0.3em] text-[10px] mb-8">Spatial Study</h2>
                <p className="text-zinc-400 font-light leading-relaxed text-lg">
                  Every structural junction of the {project.title} was optimized for maximum load efficiency. Our imagery captures the transition from raw structural integrity to finished architectural refinement.
                </p>
             </div>
             <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
               {project.gallery.map((img, idx) => (
                 <div key={idx} className="aspect-[4/3] overflow-hidden group border border-white/5 bg-zinc-900">
                   <img 
                     src={img} 
                     alt={`Study ${idx + 1}`} 
                     className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                   />
                 </div>
               ))}
             </div>
           </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <section className="bg-zinc-950 py-32 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-16 md:space-y-0">
            <button 
              onClick={() => onNavigateToProject?.(prevProject.id)}
              className="group flex flex-col items-start space-y-6 w-full md:w-auto"
            >
              <span className="text-zinc-600 font-architectural font-bold uppercase tracking-[0.3em] text-[9px] group-hover:text-amber-500 transition-colors">Previous Milestone</span>
              <span className="text-3xl md:text-5xl text-white font-architectural font-bold uppercase tracking-tighter group-hover:text-amber-500 transition-colors">{prevProject.title}</span>
            </button>
            
            <button 
              onClick={() => onNavigateToProject?.(nextProject.id)}
              className="group flex flex-col items-end space-y-6 text-right w-full md:w-auto"
            >
              <span className="text-zinc-600 font-architectural font-bold uppercase tracking-[0.3em] text-[9px] group-hover:text-amber-500 transition-colors">Next Milestone</span>
              <span className="text-3xl md:text-5xl text-white font-architectural font-bold uppercase tracking-tighter group-hover:text-amber-500 transition-colors">{nextProject.title}</span>
            </button>
          </div>
        </div>
      </section>

      {show3D && (
        <Project3DViewer 
          type={project.id === '1' ? 'tower' : 'villa'} 
          onClose={() => setShow3D(false)} 
        />
      )}
    </div>
  );
};

export default ProjectDetail;
