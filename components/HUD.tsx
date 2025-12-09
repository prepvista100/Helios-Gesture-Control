import React from 'react';
import { useStore } from '../store';
import { PLANETS } from '../constants';
import { Disc, Thermometer, Weight, Orbit, Activity, Globe, Clock } from 'lucide-react';

export const HUD: React.FC = () => {
  // Selective state subscription to avoid re-renders on every store update
  const activePlanetId = useStore(state => state.activePlanetId);
  const isGestureEnabled = useStore(state => state.isGestureEnabled);
  const simulationSpeed = useStore(state => state.simulationSpeed);
  const toggleGestureControl = useStore(state => state.toggleGestureControl);
  const setSimulationSpeed = useStore(state => state.setSimulationSpeed);
  
  const activePlanetData = PLANETS.find(p => p.id === activePlanetId);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6">
      
      {/* Header */}
      <header className="flex justify-between items-start pointer-events-auto">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tighter uppercase font-['Rajdhani'] drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            Helios <span className="text-blue-500 text-2xl align-top">PRO</span>
          </h1>
          <p className="text-blue-300 text-xs tracking-[0.3em] opacity-70">ADVANCED ORBITAL VISUALIZATION</p>
        </div>

        <div className="flex flex-col items-end gap-2">
           <button 
             onClick={toggleGestureControl}
             className={`px-4 py-2 rounded-full border text-xs font-bold tracking-wider transition-all duration-300 flex items-center gap-2
               ${isGestureEnabled 
                 ? 'bg-blue-600/20 border-blue-400 text-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.4)]' 
                 : 'bg-gray-900/50 border-gray-700 text-gray-500'}`}
           >
             <div className={`w-2 h-2 rounded-full ${isGestureEnabled ? 'bg-blue-400 animate-pulse' : 'bg-gray-600'}`} />
             {isGestureEnabled ? 'GESTURE CONTROL ACTIVE' : 'GESTURE DISABLED'}
           </button>
           
           {/* Time Controls */}
           <div className="bg-black/40 backdrop-blur-md rounded-lg p-2 border border-white/10 flex items-center gap-4">
              <span className="text-xs text-gray-400 font-mono">TIME DILATION</span>
              <input 
                type="range" 
                min="0" 
                max="5" 
                step="0.1" 
                value={simulationSpeed}
                onChange={(e) => setSimulationSpeed(parseFloat(e.target.value))}
                className="w-32 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <span className="text-xs text-blue-300 w-8">{simulationSpeed.toFixed(1)}x</span>
           </div>
        </div>
      </header>

      {/* Main Content Area (Center/Right) */}
      <main className="flex-1 relative">
        {activePlanetData && (
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[28rem] pointer-events-auto">
             <div className="bg-black/60 backdrop-blur-xl border-l-2 border-blue-500 p-8 text-white relative overflow-hidden group transition-all duration-500 animate-in slide-in-from-right-10 fade-in rounded-l-2xl shadow-2xl">
                
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 p-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

                <div className="relative z-10">
                    <h2 className="text-6xl font-bold mb-1 font-['Rajdhani'] uppercase tracking-tight">{activePlanetData.name}</h2>
                    <p className="text-blue-400 text-xs tracking-widest uppercase mb-4 opacity-80">Designation: {activePlanetData.id.toUpperCase()}-01</p>
                    <p className="text-gray-200 text-sm mb-6 leading-relaxed border-b border-white/10 pb-4 font-light">
                    {activePlanetData.description}
                    </p>

                    {/* Physical Data Grid */}
                    <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-6">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-blue-300 text-[10px] uppercase tracking-wider font-bold">
                                <Weight size={12} /> Mass
                            </div>
                            <div className="text-lg font-mono">{activePlanetData.details.mass}</div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-blue-300 text-[10px] uppercase tracking-wider font-bold">
                                <Thermometer size={12} /> Surface Temp
                            </div>
                            <div className="text-lg font-mono">{activePlanetData.details.temp}</div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-blue-300 text-[10px] uppercase tracking-wider font-bold">
                                <Disc size={12} /> Moons
                            </div>
                            <div className="text-lg font-mono">{activePlanetData.details.moons}</div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-blue-300 text-[10px] uppercase tracking-wider font-bold">
                                <Orbit size={12} /> Distance
                            </div>
                            <div className="text-lg font-mono">{activePlanetData.distance} AU</div>
                        </div>
                    </div>

                    {/* New Orbital Dynamics Section */}
                    <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/20">
                        <h3 className="text-xs text-blue-200 uppercase tracking-widest mb-3 border-b border-blue-500/20 pb-1 flex items-center gap-2">
                             <Activity size={12} /> Orbital Dynamics
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="text-center">
                                <div className="text-[10px] text-gray-400 mb-1 flex justify-center"><Clock size={10} /></div>
                                <div className="text-xs font-mono text-white">{activePlanetData.details.orbitalPeriod}</div>
                                <div className="text-[9px] text-blue-400/70 uppercase">Period</div>
                            </div>
                            <div className="text-center border-l border-white/5">
                                <div className="text-[10px] text-gray-400 mb-1 flex justify-center"><Orbit size={10} /></div>
                                <div className="text-xs font-mono text-white">{activePlanetData.details.eccentricity}</div>
                                <div className="text-[9px] text-blue-400/70 uppercase">Eccentricity</div>
                            </div>
                            <div className="text-center border-l border-white/5">
                                <div className="text-[10px] text-gray-400 mb-1 flex justify-center"><Globe size={10} /></div>
                                <div className="text-xs font-mono text-white">{activePlanetData.details.axialTilt}</div>
                                <div className="text-[9px] text-blue-400/70 uppercase">Axial Tilt</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Simulated Data Stream */}
                <div className="mt-6 pt-2 border-t border-dashed border-white/10 text-[9px] text-gray-600 font-mono flex justify-between items-center">
                   <span>DATA_STREAM_ID: {activePlanetId?.toUpperCase()}_{Math.floor(Math.random() * 999)}</span>
                   <span className="flex items-center gap-1 text-green-500/80"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> TELEMETRY ACTIVE</span>
                </div>
             </div>
          </div>
        )}
      </main>

      {/* Footer / Status */}
      <footer className="flex justify-between items-end pointer-events-none">
         <div className="bg-black/30 backdrop-blur px-4 py-2 rounded border border-white/5">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">System Status</p>
            <div className="flex gap-4 mt-1">
              <span className="text-xs text-white font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> PHYSICS ENGINE: KEPLER
              </span>
              <span className="text-xs text-white font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> RENDER: TEXTURED
              </span>
            </div>
         </div>
      </footer>
    </div>
  );
};