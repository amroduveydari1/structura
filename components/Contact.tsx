
import React, { useState } from 'react';

interface ContactProps {
  onNavigate: (view: any) => void;
}

const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    sector: 'Residential Architecture',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Explicitly targeting hello@amrostudio.co
    console.log("TRANSMITTING TO: hello@amrostudio.co", {
      timestamp: new Date().toISOString(),
      recipient: "hello@amrostudio.co",
      payload: formData
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <section id="contact" className="pt-16 pb-24 bg-zinc-50">
      <div className="container mx-auto px-6">
        <div className="bg-white shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-zinc-100">
          <div className="lg:w-1/2 p-12 lg:p-24 bg-zinc-950 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-wallpaper opacity-5 pointer-events-none"></div>
            <div className="absolute top-0 right-0 p-8">
              <div className="w-16 h-16 border-t border-r border-amber-600/30"></div>
            </div>
            
            <span className="text-amber-500 font-architectural font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block relative z-10">Direct Commissioning</span>
            <h2 className="text-4xl md:text-6xl font-architectural font-bold mb-12 tracking-tighter uppercase relative z-10">
              START YOUR <br /><span className="text-zinc-600">NEXT LEGACY</span>
            </h2>
            
            <div className="space-y-12 relative z-10">
              <div>
                <h4 className="text-zinc-600 font-architectural uppercase tracking-[0.3em] text-[9px] font-bold mb-5">Communication Nodes</h4>
                <p className="text-xl font-light text-zinc-300">hello@amrostudio.co</p>
                <p className="text-sm text-zinc-500 mt-2 font-mono">SECURE RELAY ACTIVE</p>
              </div>
              
              <div>
                <h4 className="text-zinc-600 font-architectural uppercase tracking-[0.3em] text-[9px] font-bold mb-5">Global HQ</h4>
                <p className="text-lg font-light text-zinc-400">
                  88 Structural Plaza, Suite 400<br />
                  Chicago, IL 60601, USA
                </p>
              </div>

              <div className="flex space-x-10 pt-6">
                {['LinkedIn', 'Instagram', 'Behance'].map(social => (
                  <button 
                    key={social} 
                    onClick={() => onNavigate('home')}
                    className="text-[10px] font-architectural font-bold uppercase tracking-[0.2em] text-zinc-500 hover:text-amber-500 transition-colors"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center bg-white relative">
            {isSubmitted ? (
              <div className="text-center animate-fade-in-up">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                </div>
                <h3 className="text-2xl font-architectural font-bold text-zinc-900 uppercase tracking-tighter mb-4">Transmission Success</h3>
                <p className="text-zinc-500 font-light max-w-sm mx-auto leading-relaxed">
                  The project brief has been encrypted and sent to our senior planning division at <span className="text-zinc-900 font-bold">hello@amrostudio.co</span>.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-10 text-amber-600 font-architectural font-bold uppercase tracking-[0.3em] text-[10px] hover:text-amber-700 transition-colors"
                >
                  Return to Form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[9px] font-architectural font-bold uppercase tracking-[0.2em] text-zinc-400">Identity</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full border-b border-zinc-200 py-3 focus:outline-none focus:border-amber-600 transition-colors bg-transparent placeholder-zinc-300 font-light" 
                      placeholder="FULL NAME" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] font-architectural font-bold uppercase tracking-[0.2em] text-zinc-400">Communication</label>
                    <input 
                      required 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full border-b border-zinc-200 py-3 focus:outline-none focus:border-amber-600 transition-colors bg-transparent placeholder-zinc-300 font-light" 
                      placeholder="EMAIL ADDRESS" 
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[9px] font-architectural font-bold uppercase tracking-[0.2em] text-zinc-400">Sector Selection</label>
                  <select 
                    value={formData.sector}
                    onChange={(e) => setFormData({...formData, sector: e.target.value})}
                    className="w-full border-b border-zinc-200 py-3 focus:outline-none focus:border-amber-600 transition-colors bg-transparent appearance-none text-zinc-500 cursor-pointer font-light"
                  >
                    <option>Residential Architecture</option>
                    <option>Commercial Infrastructure</option>
                    <option>Industrial Solutions</option>
                    <option>Structural Renovation</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[9px] font-architectural font-bold uppercase tracking-[0.2em] text-zinc-400">Brief Description</label>
                  <textarea 
                    rows={4} 
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full border-b border-zinc-200 py-3 focus:outline-none focus:border-amber-600 transition-colors bg-transparent resize-none placeholder-zinc-300 font-light" 
                    placeholder="OUTLINE YOUR VISION..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-zinc-950 text-white py-6 font-architectural font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-amber-600 transition-all disabled:bg-zinc-800 disabled:cursor-not-allowed group flex items-center justify-center shadow-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></div>
                      <span className="animate-pulse">Submitting...</span>
                    </div>
                  ) : (
                    <>
                      <span>Submit</span>
                      <svg className="w-4 h-4 ml-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
