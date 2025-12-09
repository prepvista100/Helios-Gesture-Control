import React, { useState } from 'react';
import { Scene } from './components/Scene';
import { HUD } from './components/HUD';
import { GestureController } from './components/GestureController';

function App() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950/20 to-black"></div>
        
        <div className="z-10 text-center space-y-8 p-8 max-w-2xl border border-white/10 bg-black/40 backdrop-blur-xl rounded-2xl shadow-[0_0_50px_rgba(59,130,246,0.1)]">
          <div className="space-y-2">
            <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-300 font-['Rajdhani'] uppercase tracking-tighter">
              Helios
            </h1>
            <p className="text-blue-200 text-lg tracking-[0.5em] font-light uppercase">Gesture Control System</p>
          </div>

          <p className="text-gray-400 max-w-lg mx-auto leading-relaxed">
            Experience the solar system through advanced gesture recognition. 
            Use your camera to navigate, select planets, and manipulate time.
          </p>

          <div className="grid grid-cols-2 gap-4 text-left max-w-sm mx-auto bg-black/30 p-4 rounded-lg border border-white/5">
            <div className="flex items-center gap-3 text-sm text-gray-300">
               <span className="w-6 h-6 rounded flex items-center justify-center bg-blue-900/50 text-blue-300 text-xs border border-blue-500/30">☝️</span>
               <span>Point to Select</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
               <span className="w-6 h-6 rounded flex items-center justify-center bg-blue-900/50 text-blue-300 text-xs border border-blue-500/30">✊</span>
               <span>Fist to Grab</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
               <span className="w-6 h-6 rounded flex items-center justify-center bg-blue-900/50 text-blue-300 text-xs border border-blue-500/30">✌️</span>
               <span>Victory to Reset</span>
            </div>
             <div className="flex items-center gap-3 text-sm text-gray-300">
               <span className="w-6 h-6 rounded flex items-center justify-center bg-blue-900/50 text-blue-300 text-xs border border-blue-500/30">✋</span>
               <span>Palm to Hover</span>
            </div>
          </div>

          <button 
            onClick={() => setStarted(true)}
            className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-blue-50 transition-all duration-300 rounded overflow-hidden"
          >
            <span className="relative z-10">Initialize System</span>
            <div className="absolute inset-0 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 opacity-20"></div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative bg-black">
      <Scene />
      <HUD />
      <GestureController />
    </div>
  );
}

export default App;