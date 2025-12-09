import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../store';
import { GestureType } from '../types';
import { Camera, Hand, MousePointer2, Maximize } from 'lucide-react';

export const GestureController: React.FC = () => {
  // Selective state
  const currentGesture = useStore(state => state.currentGesture);
  const gestureConfidence = useStore(state => state.gestureConfidence);
  const isGestureEnabled = useStore(state => state.isGestureEnabled);
  const setGesture = useStore(state => state.setGesture);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [streamActive, setStreamActive] = useState(false);

  // Initialize webcam
  useEffect(() => {
    if (isGestureEnabled) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setStreamActive(true);
          }
        })
        .catch(err => {
          console.error("Camera access denied or unavailable", err);
          setStreamActive(false);
        });
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
        setStreamActive(false);
      }
    }
  }, [isGestureEnabled]);

  // Simulation handlers
  const handleSimulateGesture = (gesture: GestureType) => {
    setGesture(gesture, 0.95);
    // Auto-reset to IDLE after action for momentary gestures
    if (gesture !== GestureType.IDLE) {
      setTimeout(() => setGesture(GestureType.IDLE, 0), 2000);
    }
  };

  if (!isGestureEnabled) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
      {/* Webcam Feed / Visualization */}
      <div className="relative w-48 h-36 bg-black rounded-xl overflow-hidden border-2 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
        {streamActive ? (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="w-full h-full object-cover opacity-60 grayscale"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-blue-400 text-xs">
            <Camera className="w-6 h-6 mb-1 opacity-50" />
            <span className="absolute mt-8">Camera Inactive</span>
          </div>
        )}
        
        {/* Overlay Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute inset-0 border border-blue-500/30 m-2 rounded-lg"></div>
        <div className="absolute top-2 right-2 flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${currentGesture !== GestureType.IDLE ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="text-[10px] text-blue-200 font-mono">CV_ENGINE: ONLINE</span>
        </div>

        {/* Detected Gesture Feedback */}
        <div className="absolute bottom-0 inset-x-0 bg-blue-900/80 backdrop-blur p-2 text-center border-t border-blue-500/30">
          <p className="text-blue-100 text-xs font-bold tracking-widest uppercase">
            {currentGesture.replace('_', ' ')}
          </p>
          <div className="w-full bg-blue-950 h-1 mt-1 rounded-full overflow-hidden">
            <div 
              className="bg-blue-400 h-full transition-all duration-300" 
              style={{ width: `${gestureConfidence * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Manual Gesture Triggers (For Demo Reliability) */}
      <div className="bg-black/80 backdrop-blur-md rounded-xl p-3 border border-gray-800 shadow-2xl flex flex-col gap-2 w-48">
        <p className="text-[10px] text-gray-400 font-mono mb-1 uppercase tracking-wider">Simulate Input</p>
        
        <button 
          onClick={() => handleSimulateGesture(GestureType.POINTING)}
          className={`flex items-center space-x-2 p-2 rounded text-xs transition-colors ${currentGesture === GestureType.POINTING ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}
        >
          <MousePointer2 size={14} />
          <span>Point (Focus)</span>
        </button>

        <button 
          onClick={() => handleSimulateGesture(GestureType.CLOSED_FIST)}
          className={`flex items-center space-x-2 p-2 rounded text-xs transition-colors ${currentGesture === GestureType.CLOSED_FIST ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}
        >
          <Hand size={14} />
          <span>Fist (Grab/Hold)</span>
        </button>

        <button 
          onClick={() => handleSimulateGesture(GestureType.VICTORY)}
          className={`flex items-center space-x-2 p-2 rounded text-xs transition-colors ${currentGesture === GestureType.VICTORY ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}
        >
          <Maximize size={14} />
          <span>V-Sign (Reset View)</span>
        </button>
      </div>
    </div>
  );
};