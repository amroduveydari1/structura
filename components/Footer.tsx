
import React from 'react';

interface FooterProps {
  onNavigate: (view: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-zinc-950 text-zinc-500 py-20 border-t border-zinc-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <div 
              className="flex items-center space-x-2 mb-6 cursor-pointer group"
              onClick={() => onNavigate('home')}
            >
              <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center transform rotate-45 group-hover:bg-amber-500 transition-colors">
                <div className="w-3 h-3 bg-zinc-950 transform -rotate-45"></div>
              </div>
              <span className="text-xl font-architectural font-bold text-white tracking-tighter group-hover:text-amber-500 transition-colors">STRUCTURA</span>
            </div>
            <p className="text-sm font-light leading-relaxed max-w-xs">
              Engineering high-performance environments since 1998. Recognized globally for architectural precision and innovative structural solutions.
            </p>
          </div>

          <div>
            <h5 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-architectural">Directory</h5>
            <ul className="space-y-4 text-[10px] uppercase font-bold tracking-widest">
              <li><button onClick={() => onNavigate('portfolio')} className="hover:text-amber-500 transition-colors">Current Projects</button></li>
              <li><button onClick={() => onNavigate('services-overview')} className="hover:text-amber-500 transition-colors text-left">Services Overview</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-amber-500 transition-colors">Architectural Vision</button></li>
              <li><button onClick={() => onNavigate('brand')} className="hover:text-amber-500 transition-colors">Brand Assets (SVG)</button></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-architectural">Company</h5>
            <ul className="space-y-4 text-[10px] uppercase font-bold tracking-widest">
              <li><button onClick={() => onNavigate('about')} className="hover:text-amber-500 transition-colors">Executive Team</button></li>
              <li><button onClick={() => onNavigate('careers')} className="hover:text-amber-500 transition-colors text-left">Careers</button></li>
              <li><button onClick={() => onNavigate('press')} className="hover:text-amber-500 transition-colors text-left">Press & Media</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-amber-500 transition-colors text-left">Contact</button></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold uppercase tracking-widest text-xs mb-6 font-architectural">Newsletter</h5>
            <p className="text-sm font-light mb-6">Quarterly insights into structural innovation.</p>
            <div className="flex space-x-2">
              <input type="email" placeholder="Email" className="bg-zinc-900 border border-zinc-800 py-2 px-4 text-sm w-full focus:outline-none focus:border-amber-600 transition-colors text-white" />
              <button className="bg-white text-zinc-900 px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-amber-600 hover:text-white transition-all">Join</button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] uppercase tracking-widest font-bold">
          <p className="text-zinc-600">Built by Amro Studio</p>
          <div className="flex space-x-8">
            <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">Terms of Service</button>
            <button onClick={() => onNavigate('cookies')} className="hover:text-white transition-colors">Cookie Settings</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
