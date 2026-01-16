
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Project3DViewerProps {
  type: 'tower' | 'villa';
  onClose: () => void;
}

const Project3DViewer: React.FC<Project3DViewerProps> = ({ type, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x09090b);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(12, 12, 12);
    camera.lookAt(0, 5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const building = new THREE.Group();
    scene.add(building);

    if (type === 'tower') {
      const geometry = new THREE.BoxGeometry(4, 18, 4);
      const material = new THREE.MeshPhongMaterial({ color: 0x27272a });
      const tower = new THREE.Mesh(geometry, material);
      tower.position.y = 9;
      building.add(tower);
      
      const glassMat = new THREE.MeshPhongMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.2 });
      for(let i=1; i<10; i+=2) {
        const seg = new THREE.Mesh(new THREE.BoxGeometry(4.1, 1.5, 4.1), glassMat);
        seg.position.y = i * 2;
        building.add(seg);
      }
    } else {
      const mat = new THREE.MeshPhongMaterial({ color: 0xe4e4e7 });
      const base = new THREE.Mesh(new THREE.BoxGeometry(10, 1.5, 8), mat);
      base.position.y = 0.75;
      building.add(base);

      const upper = new THREE.Mesh(new THREE.BoxGeometry(6, 3, 5), mat);
      upper.position.set(-2, 3, -1.5);
      building.add(upper);
    }

    const grid = new THREE.GridHelper(30, 30, 0x27272a, 0x18181b);
    scene.add(grid);

    let isDragging = false;
    let previousX = 0;
    
    const handleStart = (x: number) => { 
      isDragging = true; 
      previousX = x; 
      setShowInstructions(false);
    };
    const handleMove = (x: number) => {
      if (isDragging) {
        const deltaX = x - previousX;
        building.rotation.y += deltaX * 0.015; // Slightly faster for touch
        previousX = x;
      }
    };
    const handleEnd = () => { isDragging = false; };

    const onMouseDown = (e: MouseEvent) => handleStart(e.clientX);
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchStart = (e: TouchEvent) => handleStart(e.touches[0].clientX);
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); handleMove(e.touches[0].clientX); };

    containerRef.current.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', handleEnd);
    containerRef.current.addEventListener('touchstart', onTouchStart, { passive: false });
    containerRef.current.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', handleEnd);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!isDragging) building.rotation.y += 0.003;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [type]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/98 p-0 md:p-10">
      <div className="relative w-full h-full md:max-w-7xl md:max-h-[90vh] bg-zinc-900 md:border md:border-zinc-800 md:rounded-lg flex flex-col shadow-2xl overflow-hidden">
        <div className="p-4 md:p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900 shrink-0">
          <div className="max-w-[70%]">
            <h3 className="text-white font-architectural font-bold uppercase tracking-widest text-xs md:text-base truncate">
              {type === 'tower' ? 'Obsidian Tower' : 'Canyon Villa'} (3D)
            </h3>
            <p className="text-zinc-500 text-[10px]">Real-time BIM Visualization</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 text-white hover:bg-amber-600 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        
        <div ref={containerRef} className="flex-1 w-full bg-zinc-950 relative cursor-grab active:cursor-grabbing">
          {showInstructions && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="bg-black/40 backdrop-blur-md px-6 py-4 rounded-full border border-white/10 flex items-center space-x-3">
                 <svg className="w-5 h-5 text-amber-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 013 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3.322"/></svg>
                 <span className="text-white text-[10px] uppercase font-bold tracking-widest">Swipe to Rotate Model</span>
              </div>
            </div>
          )}
          
          <div className="absolute top-4 left-4 pointer-events-none space-y-1">
            <div className="bg-amber-600/10 border border-amber-600/30 px-2 py-0.5 rounded text-[8px] text-amber-500 font-bold uppercase tracking-widest">
              LOD 350
            </div>
          </div>
        </div>

        <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex justify-between items-center text-[8px] md:text-xs text-zinc-500">
          <span>Structural Precision Check: 100%</span>
          <span className="hidden sm:inline">Metropolitan District Hub</span>
        </div>
      </div>
    </div>
  );
};

export default Project3DViewer;
