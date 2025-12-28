
import React, { useState, useRef, useEffect } from 'react';
import { analyzeBuildingImage } from '../services/geminiService';

const ARSection: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startScan = async () => {
    setIsScanning(true);
    setHasError(false);
    setAnalysisResult(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error("Camera Access Denied", err);
      setHasError(true);
      setIsScanning(false);
    }
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsAnalyzing(true);
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64Image = canvas.toDataURL('image/jpeg', 0.9).split(',')[1];
      
      const result = await analyzeBuildingImage(base64Image);
      setAnalysisResult(result);
    }
    setIsAnalyzing(false);
  };

  const stopScan = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setIsScanning(false);
    setAnalysisResult(null);
    setIsAnalyzing(false);
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
      <canvas ref={canvasRef} className="hidden" />
      
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
              Identify buildings and perform instant structural audits. Point your camera at any architectural structure to analyze style, primary materials, and simulated BIM parity in real-time.
            </p>
            
            <div className="space-y-8 mb-12">
              <div className="bg-white/[0.02] border border-white/5 p-8 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rotate-45 transform translate-x-16 -translate-y-16 group-hover:bg-amber-500/10 transition-colors"></div>
                 <h4 className="text-white font-architectural font-bold uppercase tracking-widest text-xs mb-4">Vision Integration</h4>
                 <p className="text-zinc-500 text-sm leading-relaxed mb-6">Our AI cross-references visual feeds with global architectural databases to deliver high-fidelity structural reports on-site.</p>
                 <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-white p-2 rounded-sm shrink-0 overflow-hidden">
                      <div className="w-full h-full bg-zinc-900 grid grid-cols-4 grid-rows-4 gap-1 p-1">
                        {[...Array(16)].map((_, i) => (
                          <div key={i} className={`rounded-sm ${Math.random() > 0.4 ? 'bg-white' : 'bg-transparent'}`}></div>
                        ))}
                      </div>
                    </div>
                    <div className="text-[10px] text-zinc-600 font-mono leading-tight">
                      PROTOCOL: AR-VISION-4<br/>NODE: CALIBRATED<br/>BIM LINK: STANDBY
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
                  <span>Launch Field Hub</span>
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <button 
                    onClick={captureAndAnalyze}
                    disabled={isAnalyzing}
                    className="flex-1 bg-white hover:bg-zinc-200 text-zinc-950 px-12 py-6 font-architectural font-bold uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center space-x-4 disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-3 h-3 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin"></div>
                        <span>Auditing Structure...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
                        <span>Audit Current Frame</span>
                      </>
                    )}
                  </button>
                  <button 
                    onClick={stopScan}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white px-10 py-6 font-architectural font-bold uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center"
                  >
                    Terminate Session
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative aspect-[9/16] lg:aspect-[4/5] bg-zinc-900 border-8 border-zinc-800 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] transition-all duration-700">
                
                {cameraActive ? (
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className={`w-full h-full object-cover grayscale brightness-90 transition-all duration-500 ${isAnalyzing ? 'blur-sm brightness-50' : ''}`}
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <img 
                      src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200" 
                      alt="Field Scanner Static" 
                      className="w-full h-full object-cover grayscale opacity-40"
                    />
                    {!isScanning && (
                      <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
                        <div className="space-y-4">
                           <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                           </div>
                           <p className="text-zinc-500 font-architectural text-[9px] uppercase tracking-widest leading-relaxed">System Ready.<br/>Initialize hardware link.</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {isScanning && !analysisResult && (
                  <div className="absolute inset-0 transition-opacity duration-1000 pointer-events-none z-10">
                     <div className="absolute inset-0 bg-amber-500/5"></div>
                     <div className="absolute top-0 left-0 w-full h-[1px] bg-amber-400/30 shadow-[0_0_10px_rgba(217,119,6,0.5)] animate-[scan_3s_linear_infinite]"></div>

                     <div className="absolute inset-0 flex items-center justify-center opacity-30">
                        <svg viewBox="0 0 100 100" className="w-2/3 h-2/3 text-white" fill="none" stroke="currentColor">
                          <rect x="5" y="5" width="90" height="90" strokeWidth="0.1" strokeDasharray="2 2" />
                          <path d="M50 0 V100 M0 50 H100" strokeWidth="0.05" strokeDasharray="5 5" />
                          <circle cx="50" cy="50" r="1.5" fill="currentColor" className="animate-pulse" />
                        </svg>
                     </div>

                     <div className="absolute top-12 left-10 right-10 flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="bg-amber-600 text-white font-architectural font-bold text-[7px] px-2 py-0.5 tracking-tighter uppercase">AR-LINK: LIVE</div>
                          <div className="bg-black/80 backdrop-blur-md text-amber-500 text-[6px] p-2 font-mono border border-amber-500/20 leading-tight">
                            IDENTIFYING ARCHITECTURE...<br/>
                            LOD PARITY: SYNCING<br/>
                            SENSOR: VISION-G3
                          </div>
                        </div>
                     </div>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/40 backdrop-blur-[2px]">
                    <div className="text-center space-y-6">
                       <div className="w-14 h-14 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto shadow-[0_0_30px_rgba(217,119,6,0.4)]"></div>
                       <p className="text-amber-500 font-architectural text-[9px] font-bold uppercase tracking-[0.2em] animate-pulse">Running Structural Simulation...</p>
                    </div>
                  </div>
                )}

                {analysisResult && (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/98 z-30 p-8 md:p-12 overflow-y-auto animate-fade-in-up">
                    <div className="w-full text-left space-y-8">
                      <div className="flex justify-between items-start border-b border-white/10 pb-6">
                         <div>
                            <span className="text-amber-500 font-architectural font-bold text-[8px] uppercase tracking-[0.4em] block mb-2">Audit Dossier: v4.2.1</span>
                            <h3 className="text-white font-architectural font-bold text-xl uppercase tracking-tighter">SIMULATION COMPLETE</h3>
                         </div>
                         <button onClick={() => setAnalysisResult(null)} className="text-zinc-600 hover:text-white transition-colors p-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                         </button>
                      </div>

                      <div className="bg-white/[0.02] border border-white/5 p-6 rounded-sm">
                         <div className="font-mono text-[10px] md:text-[11px] text-zinc-300 leading-relaxed whitespace-pre-wrap font-medium">
                            {analysisResult}
                         </div>
                      </div>

                      <div className="flex items-center space-x-4 pt-4 border-t border-white/5">
                         <div className="flex-1 h-[1px] bg-zinc-900"></div>
                         <div className="flex items-center space-x-2 shrink-0">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.9)] animate-pulse"></div>
                            <span className="text-[8px] text-zinc-600 font-bold uppercase tracking-[0.3em]">Integrity Confirmed</span>
                         </div>
                      </div>

                      <button 
                        onClick={() => setAnalysisResult(null)}
                        className="w-full bg-white text-zinc-950 py-6 font-architectural font-bold uppercase tracking-[0.4em] text-[10px] transition-all hover:bg-amber-600 hover:text-white"
                      >
                        Rescan Environment
                      </button>
                    </div>
                  </div>
                )}

                {hasError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/98 p-12 text-center z-30">
                    <div className="space-y-8">
                      <div className="w-20 h-20 border border-red-500/20 rounded-full flex items-center justify-center mx-auto text-red-500 bg-red-500/5">
                         <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                      </div>
                      <p className="text-red-500 font-architectural text-[9px] uppercase tracking-[0.3em] leading-relaxed">
                        HARDWARE RELAY ERROR:<br/>CAMERA LINK INTERRUPTED.
                      </p>
                      <button 
                        onClick={() => setHasError(false)}
                        className="bg-zinc-900 text-white px-8 py-4 text-[9px] uppercase font-bold tracking-widest hover:bg-zinc-800 transition-all border border-white/5"
                      >
                        Re-initialize Node
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Float Decorative UI */}
              <div className="absolute -left-12 bottom-1/4 bg-zinc-900 border border-white/10 text-white p-6 shadow-2xl z-20 hidden md:block -rotate-1">
                 <span className="text-[7px] font-architectural font-bold uppercase tracking-widest block mb-1 text-zinc-500">Node Status</span>
                 <h4 className="text-lg font-architectural font-bold tracking-tighter uppercase">RELAY OK</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-30%); opacity: 0.1; }
          50% { opacity: 0.8; }
          100% { transform: translateY(130%); opacity: 0.1; }
        }
      `}</style>
    </section>
  );
};

export default ARSection;
