
import React, { useState, useRef, useEffect } from 'react';

const ARSection: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [scanResult, setScanResult] = useState<null | 'success'>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startScan = async () => {
    setIsScanning(true);
    setHasError(false);
    setScanResult(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
      }
      
      // Simulate technical calibration and completion
      setTimeout(() => {
        setScanResult('success');
      }, 5000);

    } catch (err) {
      console.error("Camera Access Denied", err);
      setHasError(true);
      setIsScanning(false);
    }
  };

  const stopScan = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
        console.log(`Track ${track.label} stopped.`);
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setIsScanning(false);
    setScanResult(null);
  };

  const finishAndReset = () => {
    stopScan();
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <section id="ar-tech" className="py-32 bg-zinc-950 relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-grid-wallpaper opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-10 h-[1px] bg-amber-500"></div>
              <span className="text-amber-500 font-architectural font-bold uppercase tracking-[0.4em] text-[10px]">Augmented Reality Hub</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-architectural font-bold text-white mb-8 tracking-tighter uppercase leading-none">
              GAMMA AR: <br />
              <span className="text-zinc-600">FIELD SCANNER</span>
            </h2>
            
            <p className="text-zinc-400 text-lg font-light leading-relaxed mb-10 max-w-xl">
              Eliminate construction errors instantly. Use our field scanner to overlay BIM models directly onto your site. Experience the synergy of BIM + AR in real-time.
            </p>
            
            <div className="space-y-8 mb-12">
              <div className="bg-white/[0.02] border border-white/5 p-8 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rotate-45 transform translate-x-16 -translate-y-16 group-hover:bg-amber-500/10 transition-colors"></div>
                 <h4 className="text-white font-architectural font-bold uppercase tracking-widest text-xs mb-4">Mobile Experience</h4>
                 <p className="text-zinc-500 text-sm leading-relaxed mb-6">On laptop? Open this page on your smartphone to scan your immediate environment and see the structure's digital twin.</p>
                 <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-white p-2 rounded-sm shrink-0 overflow-hidden">
                      <div className="w-full h-full bg-zinc-900 grid grid-cols-4 grid-rows-4 gap-1 p-1">
                        {[...Array(16)].map((_, i) => (
                          <div key={i} className={`rounded-sm ${Math.random() > 0.4 ? 'bg-white' : 'bg-transparent'}`}></div>
                        ))}
                      </div>
                    </div>
                    <div className="text-[10px] text-zinc-600 font-mono leading-tight">
                      ID: ST-AR-HUB<br/>RELAY: ACTIVE<br/>VERSION: 4.2.0
                    </div>
                 </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              {!isScanning ? (
                <button 
                  onClick={startScan}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-12 py-6 font-architectural font-bold uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center space-x-4 shadow-2xl"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  <span>Initialize Scanner</span>
                </button>
              ) : (
                <button 
                  onClick={stopScan}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-12 py-6 font-architectural font-bold uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center space-x-4"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                  <span>Terminate Scan</span>
                </button>
              )}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative aspect-[9/16] lg:aspect-[4/5] bg-zinc-900 border-8 border-zinc-800 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] transition-all duration-700">
                
                {/* Camera / Feed Container */}
                {cameraActive ? (
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover grayscale brightness-75"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <img 
                      src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200" 
                      alt="Construction Site Field" 
                      className="w-full h-full object-cover grayscale opacity-40"
                    />
                    {!isScanning && (
                      <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
                        <div className="space-y-4">
                           <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                           </div>
                           <p className="text-zinc-500 font-architectural text-[9px] uppercase tracking-widest leading-relaxed">System Standby.<br/>Waiting for field authorization...</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Simulated AR UI Overlay */}
                {isScanning && (
                  <div className="absolute inset-0 transition-opacity duration-1000 pointer-events-none">
                     <div className="absolute inset-0 bg-blue-500/10"></div>
                     <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-400/50 shadow-[0_0_15px_rgba(96,165,250,0.8)] animate-[scan_3s_linear_infinite]"></div>

                     {/* BIM Hologram Wireframe */}
                     <div className={`absolute inset-0 p-12 flex items-center justify-center transition-all duration-1000 ${scanResult ? 'scale-100 opacity-80' : 'scale-110 opacity-30'}`}>
                        <svg viewBox="0 0 100 100" className="w-full h-full text-blue-400" fill="none" stroke="currentColor">
                          <path d="M10 10 L90 10 L90 90 L10 90 Z" strokeWidth="0.5" strokeDasharray="2 2" />
                          <path d="M10 10 L50 0 L90 10 M50 0 V90" strokeWidth="0.5" />
                          <path d="M10 30 L90 30 M10 60 L90 60" strokeWidth="0.5" strokeDasharray="1 1" />
                          <circle cx="50" cy="45" r="3" fill="currentColor" className="animate-pulse" />
                        </svg>
                     </div>

                     {/* Real-time Telemetry */}
                     <div className="absolute top-12 left-10 right-10 flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="bg-blue-600 text-white font-architectural font-bold text-[7px] px-2 py-0.5 tracking-tighter uppercase">SCAN: LIVE FEED</div>
                          <div className="bg-black/80 backdrop-blur-md text-blue-400 text-[6px] p-2 font-mono border border-blue-400/30 leading-tight">
                            OBJECT: TOWER-ALPHA<br/>
                            CLASH: 0 DETECTED<br/>
                            Z-LEVEL: 144.2m
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-blue-400/30 flex items-center justify-center bg-black/40">
                           <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                        </div>
                     </div>

                     <div className="absolute bottom-20 left-10 right-10">
                        <div className="flex justify-between items-end mb-2">
                           <span className="text-white font-architectural font-bold text-[7px] tracking-widest uppercase">Structural Integrity</span>
                           <span className="text-blue-400 font-mono text-[8px]">{scanResult ? '99.98%' : 'CALIBRATING...'}</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full bg-blue-400 transition-all duration-[4s] ${isScanning ? 'w-full' : 'w-0'}`}></div>
                        </div>
                     </div>
                  </div>
                )}

                {/* Scan Result Completion Overlay */}
                {scanResult === 'success' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/90 z-20 animate-fade-in-up">
                    <div className="text-center p-8 space-y-6">
                      <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/50">
                        <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                      </div>
                      <h3 className="text-white font-architectural font-bold text-xl uppercase tracking-tighter">Scan Complete</h3>
                      <p className="text-zinc-500 text-[10px] uppercase tracking-widest leading-relaxed">
                        Structural Parity Verified<br/>
                        Clash Detection: 0 Errors<br/>
                        BIM Sync: 100%
                      </p>
                      <button 
                        onClick={finishAndReset}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 font-architectural font-bold uppercase tracking-[0.2em] text-[9px] transition-all shadow-xl"
                      >
                        Finish Session
                      </button>
                    </div>
                  </div>
                )}

                {hasError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/90 p-12 text-center z-30">
                    <div className="space-y-4">
                      <p className="text-red-500 font-architectural text-[9px] uppercase tracking-widest leading-relaxed">
                        Error: Hardware Relay Failed.<br/>Please ensure camera permissions are granted.
                      </p>
                      <button 
                        onClick={() => setHasError(false)}
                        className="text-white/50 underline text-[8px] uppercase tracking-widest"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Float Labels */}
              <div className="absolute -right-8 top-1/4 bg-amber-600 text-white p-6 shadow-2xl z-20 hidden md:block rotate-2">
                 <span className="text-[8px] font-architectural font-bold uppercase tracking-widest block mb-1">Authorization</span>
                 <h4 className="text-xl font-architectural font-bold tracking-tighter uppercase">HUB ACTIVE</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(150%); }
        }
      `}</style>
    </section>
  );
};

export default ARSection;
