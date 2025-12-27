
import React, { useState, useEffect } from 'react';

interface WorkflowStep {
  id: string;
  stage: string;
  date: string;
  progress: number;
}

interface PlatformDashboardProps {
  onBack: () => void;
}

const MATERIALS = [
  { id: 'steel', name: 'Reinforced Steel', modulus: 200, yieldStrength: 250, density: 7850 },
  { id: 'concrete', name: 'C30 Structural Concrete', modulus: 30, yieldStrength: 30, density: 2400 },
  { id: 'carbon', name: 'Carbon Composite', modulus: 250, yieldStrength: 600, density: 1600 },
  { id: 'timber', name: 'Glulam Timber', modulus: 12, yieldStrength: 24, density: 600 }
];

const SEISMIC_ZONES = [
  { level: '1', label: 'Stable', multiplier: 1.0 },
  { level: '2', label: 'Moderate', multiplier: 1.25 },
  { level: '3', label: 'High Risk', multiplier: 1.6 },
  { level: '4', label: 'Critical/Fault', multiplier: 2.1 }
];

const SHAPES = [
  { id: 'ibeam', label: 'I-Beam (Symmetry)', factor: 0.8 },
  { id: 'box', label: 'Box Section', factor: 0.95 },
  { id: 'solid', label: 'Solid Core', factor: 1.0 }
];

const PlatformDashboard: React.FC<PlatformDashboardProps> = ({ onBack }) => {
  const [activeTool, setActiveTool] = useState<'calc' | 'workflow' | 'audit'>('calc');
  const [isSyncing, setIsSyncing] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] Structura Professional Engine Initialized.",
    "[MODE] Local Execution / Zero Latency Relay."
  ]);
  
  // Analysis Parameters
  const [params, setParams] = useState({
    span: 12.5,
    load: 4500,
    loadType: 'point' as 'point' | 'udl',
    material: 'steel',
    depth: 450, 
    width: 200, 
    safetyFactor: 1.5,
    seismicZone: '1',
    shape: 'ibeam',
    windSpeed: 120, // km/h
    height: 35, // m
    footingArea: 4.5 // m2
  });

  const [results, setResults] = useState({
    deflection: 0,
    stress: 0,
    windPressure: 0,
    soilPressure: 0,
    weight: 0,
    isCompliant: true
  });

  // Workflow State
  const [steps, setSteps] = useState<WorkflowStep[]>([
    { id: '1', stage: 'Site Preparation & Excavation', date: 'OCT 12', progress: 100 },
    { id: '2', stage: 'Foundation & Load Bearing Pour', date: 'NOV 05', progress: 45 },
    { id: '3', stage: 'Main Frame Erection', date: 'DEC 14', progress: 0 }
  ]);

  // Compliance State
  const [compliance, setCompliance] = useState([
    { id: 1, label: 'Seismic Dampening Calibration', status: true },
    { id: 2, label: 'BIM LOD 400 Parity Check', status: true },
    { id: 3, label: 'Fire Safety Coating Certification', status: false },
    { id: 4, label: 'Site Safety Protocol Audit', status: true }
  ]);

  useEffect(() => {
    const mat = MATERIALS.find(m => m.id === params.material)!;
    const seismic = SEISMIC_ZONES.find(z => z.level === params.seismicZone)!;
    const shape = SHAPES.find(s => s.id === params.shape)!;

    // 1. Deflection Calculation
    const momentOfInertia = (params.width * Math.pow(params.depth, 3)) / 12000;
    const E = mat.modulus;
    const P = params.load;
    const L = params.span;
    let rawDeflection = params.loadType === 'point' 
      ? (P * Math.pow(L, 3)) / (48 * E * momentOfInertia)
      : (5 * (P/L) * Math.pow(L, 4)) / (384 * E * momentOfInertia);

    const finalDeflection = (rawDeflection * params.safetyFactor * seismic.multiplier) / 100;

    // 2. Wind Pressure Analysis (Simplified Bernoulli Approximation)
    // p = 0.5 * rho * v^2 * Cd * Kz
    const windPressureKPa = (0.5 * 1.225 * Math.pow(params.windSpeed / 3.6, 2) * 1.2 * (1 + params.height/100)) / 1000;

    // 3. Stress Analysis
    const areaSqM = (params.width / 1000) * (params.depth / 1000) * shape.factor;
    const stressMPa = (params.load * 9.81) / (areaSqM * 1000000);

    // 4. Foundation Pressure
    const soilPressureKPa = (params.load * 9.81) / (params.footingArea * 1000);

    // 5. Weight
    const volumeM3 = areaSqM * params.span;
    const weightKg = volumeM3 * mat.density;

    setResults({
      deflection: parseFloat(finalDeflection.toFixed(3)),
      stress: parseFloat(stressMPa.toFixed(2)),
      windPressure: parseFloat(windPressureKPa.toFixed(2)),
      soilPressure: parseFloat(soilPressureKPa.toFixed(2)),
      weight: Math.round(weightKg),
      isCompliant: finalDeflection < 5.0 && stressMPa < mat.yieldStrength
    });
  }, [params]);

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 5));
  };

  const exportReport = (title: string) => {
    const content = `STRUCTURA PROFESSIONAL ENGINEERING REPORT
REPORT ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}
DATE: ${new Date().toLocaleString()}
------------------------------------------
ANALYSIS PARAMETERS:
- Material: ${MATERIALS.find(m => m.id === params.material)?.name}
- Structure Height: ${params.height}m
- Span/Node Length: ${params.span}m
- Load Case: ${params.load}kg (${params.loadType.toUpperCase()})
- Wind Velocity: ${params.windSpeed} km/h
------------------------------------------
SIMULATION RESULTS:
- Vertical Deflection: ${results.deflection} mm
- Material Stress: ${results.stress} MPa
- Peak Wind Pressure: ${results.windPressure} kPa
- Bearing Pressure: ${results.soilPressure} kPa
- Total Self-Weight: ${results.weight} kg
------------------------------------------
STATUS: ${results.isCompliant ? 'STRUCTURALLY SOUND' : 'DESIGN ALERT: CRITICAL FAILURE'}
------------------------------------------
ENGINE: LOCAL STRUCTURA RELAY (OFFLINE)`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Structura_Audit_${title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    addLog(`Dossier Exported: ${title}`);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 pt-32 pb-24 font-inter selection:bg-amber-600 selection:text-white">
      <div className="container mx-auto px-6 mb-12">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-10">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="bg-amber-600 text-white text-[8px] font-bold uppercase px-2 py-0.5 rounded-sm tracking-widest">Architectural Suite</span>
              <span className="text-zinc-600 font-mono text-[9px] tracking-widest uppercase">Direct Local Execution</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-architectural font-bold text-white tracking-tighter uppercase leading-none">
              MISSION <span className="text-zinc-600">CONTROL</span>
            </h1>
          </div>
          
          <div className="flex flex-wrap bg-zinc-900/50 border border-white/5 p-1 rounded-sm">
            {[
              { id: 'calc', label: 'Analysis' },
              { id: 'workflow', label: 'Workflow' },
              { id: 'audit', label: 'Compliance' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTool(tab.id as any)}
                className={`px-8 py-4 text-[10px] font-architectural font-bold uppercase tracking-[0.2em] transition-all ${
                  activeTool === tab.id ? 'bg-amber-600 text-white shadow-lg' : 'text-zinc-500 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {activeTool === 'calc' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up">
            {/* INPUT PANEL */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-zinc-900/40 border border-white/5 p-8">
                <h3 className="text-white font-architectural font-bold text-[10px] uppercase tracking-widest mb-10 border-b border-white/5 pb-4">Primary Constraints</h3>
                <div className="space-y-6">
                  <div>
                    <label className="text-[9px] text-zinc-600 uppercase tracking-widest block mb-2 font-bold">Material Selection</label>
                    <select 
                      value={params.material}
                      onChange={(e) => setParams({...params, material: e.target.value})}
                      className="w-full bg-black border border-zinc-800 py-3 px-4 text-white focus:outline-none focus:border-amber-600 font-architectural text-[9px] uppercase tracking-widest"
                    >
                      {MATERIALS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] text-zinc-600 uppercase tracking-widest block mb-2 font-bold">Height (m)</label>
                      <input type="number" value={params.height} onChange={(e) => setParams({...params, height: parseFloat(e.target.value) || 0})} className="w-full bg-black border border-zinc-800 py-3 px-4 text-white focus:outline-none focus:border-amber-600 font-mono text-sm" />
                    </div>
                    <div>
                      <label className="text-[9px] text-zinc-600 uppercase tracking-widest block mb-2 font-bold">Wind (km/h)</label>
                      <input type="number" value={params.windSpeed} onChange={(e) => setParams({...params, windSpeed: parseFloat(e.target.value) || 0})} className="w-full bg-black border border-zinc-800 py-3 px-4 text-white focus:outline-none focus:border-amber-600 font-mono text-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] text-zinc-600 uppercase tracking-widest block mb-2 font-bold">Span (m)</label>
                      <input type="number" step="0.1" value={params.span} onChange={(e) => setParams({...params, span: parseFloat(e.target.value) || 0})} className="w-full bg-black border border-zinc-800 py-3 px-4 text-white focus:outline-none focus:border-amber-600 font-mono text-sm" />
                    </div>
                    <div>
                      <label className="text-[9px] text-zinc-600 uppercase tracking-widest block mb-2 font-bold">Point Load (kg)</label>
                      <input type="number" value={params.load} onChange={(e) => setParams({...params, load: parseFloat(e.target.value) || 0})} className="w-full bg-black border border-zinc-800 py-3 px-4 text-white focus:outline-none focus:border-amber-600 font-mono text-sm" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/40 border border-white/5 p-8">
                 <h3 className="text-white font-architectural font-bold text-[10px] uppercase tracking-widest mb-10 border-b border-white/5 pb-4">Foundation & Soil</h3>
                 <div className="space-y-6">
                    <div>
                      <label className="text-[9px] text-zinc-600 uppercase tracking-widest block mb-2 font-bold">Seismic Risk Zone</label>
                      <select 
                        value={params.seismicZone}
                        onChange={(e) => setParams({...params, seismicZone: e.target.value})}
                        className="w-full bg-black border border-zinc-800 py-3 px-4 text-white focus:outline-none focus:border-amber-600 font-mono text-[10px]"
                      >
                        {SEISMIC_ZONES.map(z => <option key={z.level} value={z.level}>Zone {z.level}: {z.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] text-zinc-600 uppercase tracking-widest block mb-2 font-bold">Effective Footing Area (m²)</label>
                      <input type="number" step="0.5" value={params.footingArea} onChange={(e) => setParams({...params, footingArea: parseFloat(e.target.value) || 0.1})} className="w-full bg-black border border-zinc-800 py-3 px-4 text-white focus:outline-none focus:border-amber-600 font-mono text-sm" />
                    </div>
                 </div>
              </div>
            </div>

            {/* LIVE DATA FEED */}
            <div className="lg:col-span-5 space-y-8">
              <div className={`p-10 border transition-all duration-700 ${results.isCompliant ? 'border-amber-600/20 bg-amber-600/5 shadow-[0_0_50px_rgba(217,119,6,0.05)]' : 'border-red-600/20 bg-red-600/10'}`}>
                 <div className="flex justify-between items-start mb-10">
                   <div>
                     <span className={`text-[10px] uppercase font-bold tracking-[0.3em] mb-2 block ${results.isCompliant ? 'text-emerald-500' : 'text-red-500'}`}>
                       {results.isCompliant ? 'DESIGN PARAMETERS VERIFIED' : 'CRITICAL TOLERANCE ALERT'}
                     </span>
                     <p className="text-zinc-600 text-[9px] uppercase tracking-widest font-mono">Continuous Structural Auditing</p>
                   </div>
                   <div className={`w-3 h-3 rounded-full ${results.isCompliant ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'} shadow-xl`}></div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-10">
                   <div>
                      <span className="text-[8px] text-zinc-600 uppercase font-bold tracking-widest block mb-2">Deflection</span>
                      <div className="flex items-baseline space-x-2">
                         <span className="text-5xl text-white font-mono tracking-tighter">{results.deflection}</span>
                         <span className="text-xs text-zinc-600 font-mono uppercase">mm</span>
                      </div>
                   </div>
                   <div>
                      <span className="text-[8px] text-zinc-600 uppercase font-bold tracking-widest block mb-2">Peak Stress</span>
                      <div className="flex items-baseline space-x-2">
                         <span className="text-5xl text-white font-mono tracking-tighter">{results.stress}</span>
                         <span className="text-xs text-zinc-600 font-mono uppercase">MPa</span>
                      </div>
                   </div>
                 </div>

                 <div className="mt-12 space-y-6 pt-10 border-t border-white/5">
                    <div className="flex justify-between items-center">
                       <span className="text-[8px] text-zinc-600 uppercase font-bold tracking-[0.2em]">Wind Pressure Magnitude</span>
                       <span className="text-xs text-amber-500 font-mono">{results.windPressure} kPa</span>
                    </div>
                    <div className="w-full h-[1px] bg-zinc-800">
                      <div className="h-full bg-amber-500 transition-all duration-1000" style={{ width: `${Math.min(results.windPressure * 5, 100)}%` }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-[8px] text-zinc-600 uppercase font-bold tracking-[0.2em]">Bearing Pressure (Soil)</span>
                       <span className="text-xs text-blue-500 font-mono">{results.soilPressure} kPa</span>
                    </div>
                    <div className="w-full h-[1px] bg-zinc-800">
                      <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${Math.min(results.soilPressure / 2, 100)}%` }}></div>
                    </div>
                 </div>
              </div>

              <div className="bg-black border border-zinc-800 p-10 flex items-center justify-between">
                 <div>
                    <span className="text-[8px] text-zinc-600 uppercase font-bold tracking-widest block mb-2">Structural Self-Weight</span>
                    <p className="text-4xl text-white font-mono">{results.weight.toLocaleString()}<span className="text-xs text-zinc-700 ml-2 uppercase">kg</span></p>
                 </div>
                 <div className="w-16 h-16 border border-zinc-800 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>
                 </div>
              </div>

              <div className="font-mono text-[9px] space-y-2 opacity-40 px-6 py-4 bg-zinc-900/50">
                {logs.map((log, i) => <div key={i} className="flex space-x-3"><span className="text-zinc-700">|</span>{log}</div>)}
              </div>
            </div>

            {/* ACTION CENTER */}
            <div className="lg:col-span-3 flex flex-col space-y-4">
               <button 
                 onClick={() => exportReport('Structural Dynamics Audit')} 
                 className="flex-1 bg-white hover:bg-amber-600 text-zinc-950 hover:text-white p-12 font-architectural font-bold uppercase tracking-[0.4em] text-[10px] transition-all flex flex-col items-center justify-center space-y-8 group"
               >
                 <svg className="w-16 h-16 transform group-hover:scale-110 transition-transform duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                 <span className="text-center">Download Final <br/>Structural Dossier</span>
               </button>
               <button 
                 onClick={() => {
                   setIsSyncing(true);
                   addLog("Initiating local hardware parity check...");
                   setTimeout(() => {
                     setIsSyncing(false);
                     addLog("Hardware Nodes Synchronized.");
                   }, 1500);
                 }}
                 disabled={isSyncing}
                 className="bg-zinc-800 hover:bg-zinc-700 text-white p-6 font-architectural font-bold uppercase tracking-[0.3em] text-[9px] transition-all disabled:opacity-30 border border-white/5"
               >
                 {isSyncing ? 'Synchronizing Nodes...' : 'Sync Field Sensors'}
               </button>
            </div>
          </div>
        )}

        {activeTool === 'workflow' && (
          <div className="animate-fade-in-up">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-architectural font-bold text-white tracking-tighter uppercase">Project Site Timeline</h3>
              <div className="flex space-x-4">
                <button 
                  onClick={() => {
                    const newId = (steps.length + 1).toString();
                    setSteps([...steps, { id: newId, stage: 'Next Phase Node', date: 'TBD', progress: 0 }]);
                    addLog("New workflow node registered.");
                  }}
                  className="bg-zinc-900 hover:bg-zinc-800 text-zinc-400 px-8 py-3 font-architectural font-bold uppercase tracking-widest text-[9px] transition-all border border-white/5"
                >
                  Add Project Phase
                </button>
                <button onClick={() => exportReport('Workflow Dossier')} className="bg-amber-600 text-white px-8 py-3 font-architectural font-bold uppercase tracking-widest text-[9px]">Generate Schedule</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((step) => (
                <div key={step.id} className="bg-zinc-900 border border-white/5 p-10 group relative hover:border-amber-600/40 transition-all shadow-2xl">
                  <div className="flex justify-between items-start mb-6">
                     <input 
                       value={step.date} 
                       onChange={(e) => setSteps(steps.map(s => s.id === step.id ? {...s, date: e.target.value} : s))} 
                       className="bg-transparent border-none text-[8px] font-mono text-zinc-600 uppercase tracking-widest focus:outline-none w-24" 
                     />
                     <button 
                       onClick={() => {
                         setSteps(steps.filter(s => s.id !== step.id));
                         addLog("Phase node decommissioned.");
                       }}
                       className="opacity-0 group-hover:opacity-100 text-zinc-800 hover:text-red-500 transition-all"
                     >
                       <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                     </button>
                  </div>
                  <input value={step.stage} onChange={(e) => setSteps(steps.map(s => s.id === step.id ? {...s, stage: e.target.value} : s))} className="bg-transparent border-none text-white font-architectural font-bold uppercase tracking-widest text-xs focus:outline-none w-full mb-8" />
                  <div className="flex justify-between text-[9px] font-mono text-zinc-600 mb-3">
                    <span className="uppercase tracking-[0.2em]">Deployment</span>
                    <span className="text-amber-500 font-bold">{step.progress}%</span>
                  </div>
                  <div className="h-[1px] bg-zinc-800 w-full relative">
                    <div className="h-full bg-amber-600 transition-all duration-1000" style={{ width: `${step.progress}%` }}></div>
                    <input 
                      type="range" min="0" max="100" step="5"
                      value={step.progress}
                      onChange={(e) => setSteps(steps.map(s => s.id === step.id ? {...s, progress: parseInt(e.target.value)} : s))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTool === 'audit' && (
          <div className="bg-zinc-900/40 border border-white/5 p-12 animate-fade-in-up shadow-2xl">
            <h3 className="text-2xl font-architectural font-bold text-white tracking-tighter uppercase mb-12">Global Site Compliance Checklist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {compliance.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => {
                    setCompliance(prev => prev.map(c => c.id === item.id ? { ...c, status: !c.status } : c));
                    addLog(`Node Validation: ${item.label}`);
                  }}
                  className={`flex justify-between items-center p-8 border cursor-pointer transition-all duration-500 ${item.status ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-zinc-950 border-white/5 opacity-40'}`}
                >
                  <div className="space-y-2">
                    <span className={`text-[11px] uppercase tracking-[0.2em] font-bold font-architectural ${item.status ? 'text-emerald-500' : 'text-zinc-600'}`}>{item.label}</span>
                    <p className="text-[8px] text-zinc-700 font-mono">BIM REFERENCE ID: ST-CPL-{item.id}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-sm border ${item.status ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-zinc-800'}`}></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-black/98 backdrop-blur-2xl border-t border-white/5 px-8 py-6 flex justify-between items-center z-[100]">
        <div className="flex space-x-12">
           <div className="flex items-center space-x-3">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
             <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Protocol: Local Compute Only</span>
           </div>
           <div className="hidden md:flex items-center space-x-3">
             <div className="w-1.5 h-1.5 rounded-full bg-zinc-800"></div>
             <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Visual Parity: Verified</span>
           </div>
        </div>
        <button onClick={onBack} className="text-[10px] font-architectural font-bold uppercase tracking-[0.4em] text-amber-500 hover:text-white transition-all px-10 py-3 border border-amber-500/20 hover:bg-amber-500/10">Terminate Session</button>
      </div>
    </div>
  );
};

export default PlatformDashboard;
