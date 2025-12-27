import React from 'react';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  const handleDownloadServiceSheet = (e: React.MouseEvent, serviceTitle: string) => {
    e.preventDefault();
    const dummyContent = `STRUCTURA SERVICE SPECIFICATION\nService: ${serviceTitle}\n\nOur ${serviceTitle} division specializes in high-tolerance engineering and innovative architectural solutions. This specification sheet outlines our technical approach, material standards, and compliance certifications.`;
    const blob = new Blob([dummyContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Structura_Service_${serviceTitle.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="services" className="pt-16 pb-24 bg-zinc-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <span className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-4 block">Core Competencies</span>
            <h2 className="text-4xl md:text-5xl font-architectural font-bold text-zinc-900 tracking-tighter">
              PRECISION <span className="text-zinc-400">ENGINEERING</span> FOR EVERY SECTOR
            </h2>
          </div>
          <div className="hidden md:block">
            <p className="text-zinc-500 max-w-sm text-right font-light">
              From the ground up, we provide integrated construction solutions that redefine industry standards.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 border border-zinc-200">
          {SERVICES.map((service) => (
            <div 
              key={service.id} 
              className="bg-zinc-50 p-10 group hover:bg-zinc-900 transition-all duration-500 cursor-default"
            >
              <div className="text-amber-600 mb-8 group-hover:scale-110 transition-transform duration-500 origin-left">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-4 group-hover:text-white transition-colors duration-500 uppercase tracking-tight">
                {service.title}
              </h3>
              <p className="text-zinc-500 group-hover:text-zinc-400 transition-colors duration-500 font-light leading-relaxed">
                {service.description}
              </p>
              <div className="mt-8 pt-8 border-t border-zinc-200 group-hover:border-zinc-800 transition-colors duration-500">
                <button 
                  onClick={(e) => handleDownloadServiceSheet(e, service.title)}
                  className="text-sm font-bold uppercase tracking-widest text-amber-600 group-hover:text-amber-500 flex items-center space-x-2 w-full text-left"
                >
                  <span>Download Spec</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4-4m4-4H3"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;