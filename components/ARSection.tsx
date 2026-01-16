
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
      // Prioritize the back camera (environment) with high resolution for building analysis
      const constraints = {
        video: { 
          facingMode: { ideal: 'environment' }, 
          width: { ideal: 1920 }, 
          height: { ideal: 1080 } 
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        // Critical for iOS: Video won't play unless metadata is loaded
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setCameraActive(true);
        };
      }
    } catch (err) {
      console.error("Camera Access Denied or Missing", err);
      setHasError(true);
      setIsScanning(false);
    }
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsAnalyzing(true);
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    // Match canvas size to actual video stream resolution
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Flip if front camera, but usually we are in 'environment' mode
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64Image = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
      
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
              <span className="text-amber-500 font-architectural font-bold uppercase tracking-[0.4em] text-[10px]">Architectural Intelligence</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-architectural font-bold text-white mb-8 tracking-tighter uppercase leading-none">
              GAMMA AR: <br />
              <span className="text-zinc-600">FIELD SCANNER</span>
            </h2>
            
            <p className="text-zinc-400 text-lg font-light leading-relaxed mb-10 max-w-xl">
              Point your camera at any architectural structure. Our AI performs an instant structural audit, identifying materials, tectonic systems, and estimated construction eras in high-fidelity.
            </p>
            
            <div className="space-y-6 mb-12">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
                  <span className="text-amber-500 text-[10px] font-bold">01</span>
                </div>
                <div>
                  <h4 className="text-white text-xs font-architectural font-bold uppercase tracking-widest mb-1">Visual Recognition</h4>
                  <p className="text-zinc-500 text-[11px] leading-relaxed">Identifies building style and structural classification using Gemini Vision.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
                  <span className="text-amber-500 text-[10px] font-bold">02</span>
                </div>
                <div>
                  <h4 className="text-white text-xs font-architectural font-bold uppercase tracking-widest mb-1">Material Extrapolation</h4>
                  <p className="text-zinc-500 text-[11px] leading-relaxed">Calculates likely material palette and estimated structural integrity.</p>
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
                  <span>Initialize Field Scan</span>
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
                        <span>Processing Frame...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
                        <span>Analyze Structure</span>
                      </>
                    )}
                  </button>
                  <button 
                    onClick={stopScan}
                    className="bg-zinc-800 hover:bg-zinc-700 text-white px-10 py-6 font-architectural font-bold uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center"
                  >
                    Exit Hub
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="relative aspect-[9/16] lg:aspect-[4/5] bg-zinc-900 border-[12px] border-zinc-800 rounded-[3rem] overflow-hidden shadow-[0_0_120px_rgba(0,0,0,0.6)]">
                
                {cameraActive ? (
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted
                    className={`w-full h-full object-cover grayscale brightness-90 transition-all duration-500 ${isAnalyzing ? 'blur-md opacity-40' : ''}`}
                  />
                ) : (
                  <div className="relative w-full h-full bg-zinc-900 flex items-center justify-center p-12 text-center">
                    <img 
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" 
                      className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
                      alt="Placeholder"
                    />
                    <div className="relative z-10 space-y-4">
                       <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                       </div>
                       <p className="text-zinc-600 font-architectural text-[8px] uppercase tracking-[0.4em] leading-relaxed">Vision Link: Offline<br/>Awaiting Node Init</p>
                    </div>
                  </div>
                )}

                {isScanning && !analysisResult && (
                  <div className="absolute inset-0 pointer-events-none z-10 p-12">
                     {/* Viewfinder Brackets */}
                     <div className="absolute top-10 left-10 w-8 h-8 border-t-2 border-l-2 border-amber-500/50"></div>
                     <div className="absolute top-10 right-10 w-8 h-8 border-t-2 border-r-2 border-amber-500/50"></div>
                     <div className="absolute bottom-10 left-10 w-8 h-8 border-b-2 border-l-2 border-amber-500/50"></div>
                     <div className="absolute bottom-10 right-10 w-8 h-8 border-b-2 border-r-2 border-amber-500/50"></div>

                     {/* Scanning Line */}
                     <div className="absolute top-0 left-0 w-full h-[2px] bg-amber-400/40 shadow-[0_0_15px_rgba(217,119,6,0.6)] animate-[scan_4s_linear_infinite]"></div>

                     <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="none" stroke="currentColor">
                          <rect x="5" y="5" width="90" height="90" strokeWidth="0.1" strokeDasharray="1 3" />
                          <circle cx="50" cy="50" r="1" fill="currentColor" />
                        </svg>
                     </div>

                     <div className="absolute top-16 left-1/2 -translate-x-1/2">
                        <div className="bg-black/60 backdrop-blur-md border border-white/5 px-4 py-2 flex items-center space-x-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                           <span className="text-white font-architectural text-[7px] uppercase tracking-widest font-bold">Relay Active: {Math.floor(Math.random() * 1000)}ms</span>
                        </div>
                     </div>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="text-center">
                       <div className="w-16 h-16 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-8 shadow-[0_0_40px_rgba(217,119,6,0.3)]"></div>
                       <p className="text-white font-architectural text-[9px] font-bold uppercase tracking-[0.3em] animate-pulse">Analyzing Building Tectonics</p>
                    </div>
                  </div>
                )}

                {analysisResult && (
                  <div className="absolute inset-0 flex flex-col bg-zinc-950/98 z-30 p-8 md:p-12 overflow-y-auto animate-fade-in-up">
                    <div className="flex justify-between items-start border-b border-white/5 pb-6 mb-8">
                       <div>
                          <span className="text-amber-500 font-architectural font-bold text-[8px] uppercase tracking-[0.4em] block mb-2">Field Report: ST-AR-99</span>
                          <h3 className="text-white font-architectural font-bold text-lg uppercase tracking-tighter">Structural Simulation</h3>
                       </div>
                       <button onClick={() => setAnalysisResult(null)} className="text-zinc-600 hover:text-white transition-colors p-2">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                       </button>
                    </div>

                    <div className="flex-1">
                      <div className="bg-zinc-900 border border-white/5 p-6 rounded-sm mb-8">
                         <div className="font-mono text-[10px] md:text-[11px] text-zinc-300 leading-relaxed whitespace-pre-wrap font-medium">
                            {analysisResult}
                         </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                      <button 
                        onClick={() => setAnalysisResult(null)}
                        className="w-full bg-white text-zinc-950 py-5 font-architectural font-bold uppercase tracking-[0.4em] text-[10px] transition-all hover:bg-amber-600 hover:text-white"
                      >
                        Scan Next Node
                      </button>
                    </div>
                  </div>
                )}

                {hasError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black p-12 text-center z-30">
                    <div className="space-y-6">
                      <div className="w-16 h-16 border border-red-500/20 rounded-full flex items-center justify-center mx-auto text-red-500 bg-red-500/5 mb-4">
                         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                      </div>
                      <p className="text-red-500 font-architectural text-[8px] uppercase tracking-[0.3em] leading-relaxed">
                        HARDWARE FAULT:<br/>CAMERA PERMISSION DENIED.
                      </p>
                      <button 
                        onClick={() => setHasError(false)}
                        className="bg-zinc-900 text-white px-8 py-3 text-[9px] uppercase font-bold tracking-widest hover:bg-zinc-800 transition-all border border-white/5"
                      >
                        Reset Node
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* External Floating UI */}
              <div className="absolute -right-8 bottom-1/4 bg-amber-600 text-white p-6 shadow-2xl z-20 hidden lg:block rotate-1">
                 <span className="text-[7px] font-architectural font-bold uppercase tracking-widest block mb-1">Hub Status</span>
                 <h4 className="text-lg font-architectural font-bold tracking-tighter uppercase">AR READY</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0%); opacity: 0.1; }
          50% { opacity: 0.8; }
          100% { transform: translateY(1000%); opacity: 0.1; }
        }
      `}</style>
    </section>
  );
};

export default ARSection;
