
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import ARSection from './components/ARSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIConsultant from './components/AIConsultant';
import ProjectDetail from './components/ProjectDetail';
import StaticPage from './components/StaticPage';
import PlatformDashboard from './components/PlatformDashboard';
import { PROJECTS } from './constants';

type View = 'home' | 'project' | 'services' | 'portfolio' | 'about' | 'contact' | 'services-overview' | 'careers' | 'press' | 'privacy' | 'terms' | 'cookies' | 'enquire' | 'brand' | 'platform';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, selectedProjectId]);

  const handleNavigate = (view: View, projectId?: string) => {
    setCurrentView(view);
    setSelectedProjectId(projectId || null);
    
    if (view === 'home' && !projectId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderContent = () => {
    if (currentView === 'platform') {
      return <PlatformDashboard onBack={() => handleNavigate('home')} />;
    }

    if (currentView === 'project' && selectedProjectId) {
      const project = PROJECTS.find(p => p.id === selectedProjectId);
      return project ? (
        <ProjectDetail 
          project={project} 
          onBack={() => handleNavigate('portfolio')} 
          onNavigateToProject={(id) => handleNavigate('project', id)}
        />
      ) : (
        <div className="pt-32 text-center text-zinc-500 uppercase tracking-widest font-architectural text-xs">Project not found.</div>
      );
    }

    switch (currentView) {
      case 'services':
        return (
          <div className="pt-20">
            <div className="bg-zinc-950 py-24 text-center border-b border-white/5">
              <h1 className="text-4xl md:text-6xl font-architectural font-bold text-white tracking-tighter uppercase">OUR SERVICES</h1>
              <p className="text-zinc-500 mt-4 uppercase tracking-[0.4em] text-[10px] font-architectural">Engineering the impossible</p>
            </div>
            <Services />
          </div>
        );
      case 'portfolio':
        return (
          <div className="pt-20">
            <div className="bg-zinc-950 py-24 text-center border-b border-white/5">
              <h1 className="text-4xl md:text-6xl font-architectural font-bold text-white tracking-tighter uppercase">PROJECT PORTFOLIO</h1>
              <p className="text-zinc-500 mt-4 uppercase tracking-[0.4em] text-[10px] font-architectural">A legacy of structural landmarks</p>
            </div>
            <Portfolio isFullView={true} onProjectSelect={(id) => handleNavigate('project', id)} />
          </div>
        );
      case 'about':
        return (
          <div className="pt-20">
            <div className="bg-zinc-950 py-24 text-center border-b border-white/5">
              <h1 className="text-4xl md:text-6xl font-architectural font-bold text-white tracking-tighter uppercase">ABOUT STRUCTURA</h1>
              <p className="text-zinc-500 mt-4 uppercase tracking-[0.4em] text-[10px] font-architectural">Precision. Integrity. Vision.</p>
            </div>
            <About />
          </div>
        );
      case 'contact':
        return (
          <div className="pt-20">
            <div className="bg-zinc-950 py-24 text-center border-b border-white/5">
              <h1 className="text-4xl md:text-6xl font-architectural font-bold text-white tracking-tighter uppercase">CONTACT US</h1>
              <p className="text-zinc-500 mt-4 uppercase tracking-[0.4em] text-[10px] font-architectural">Let's build something extraordinary</p>
            </div>
            <Contact onNavigate={handleNavigate} />
          </div>
        );
    }

    if (currentView !== 'home' && currentView !== 'project') {
      return <StaticPage type={currentView as any} onBack={() => handleNavigate('home')} />;
    }

    return (
      <>
        <Hero />

        {/* Home Section 1: Numerical Impact */}
        <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {[
                { val: '450+', label: 'Landmarks Delivered' },
                { val: '12M', label: 'Sq. Meters Built' },
                { val: '24', label: 'Global Offices' },
                { val: '0', label: 'Safety Compromises' }
              ].map((stat, i) => (
                <div key={i} className="animate-fade-in-up">
                  <span className="block text-4xl md:text-6xl font-architectural font-bold text-amber-500 mb-2 tracking-tighter">{stat.val}</span>
                  <span className="text-zinc-500 uppercase tracking-[0.3em] text-[9px] font-bold font-architectural">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Services />

        <Portfolio 
          isFullView={false} 
          onProjectSelect={(id) => handleNavigate('project', id)} 
          onViewAll={() => handleNavigate('portfolio')}
        />

        <ARSection />

        <About />

        {/* Home Section 7: Final CTA */}
        <section className="py-32 bg-zinc-950 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
            <div className="grid grid-cols-12 h-full">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="border-r border-white/20 h-full"></div>
              ))}
            </div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <span className="text-amber-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block font-architectural">Project Commissioning</span>
            <h2 className="text-4xl md:text-7xl font-architectural font-bold tracking-tighter uppercase mb-16">
              READY TO BUILD <br />YOUR <span className="text-zinc-700">LEGACY?</span>
            </h2>
            <div className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-8">
               <button 
                 onClick={() => handleNavigate('enquire')}
                 className="bg-amber-600 hover:bg-amber-700 text-white px-16 py-6 font-architectural font-bold uppercase tracking-[0.3em] text-[10px] transition-all"
               >
                 Submit Project Brief
               </button>
               <button 
                 onClick={() => handleNavigate('contact')}
                 className="border border-white/20 hover:bg-white/10 text-white px-16 py-6 font-architectural font-bold uppercase tracking-[0.3em] text-[10px] transition-all"
               >
                 Contact Global HQ
               </button>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <main className="min-h-screen selection:bg-amber-500 selection:text-white bg-zinc-50">
      <Header 
        onNavigate={(view) => handleNavigate(view)} 
        onEnquire={() => handleNavigate('enquire')}
      />
      {renderContent()}
      <Footer onNavigate={handleNavigate} />
      <AIConsultant />
    </main>
  );
};

export default App;
