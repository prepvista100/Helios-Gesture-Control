import React, { Suspense, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { SolarSystem } from './SolarSystem';
import { CameraController } from './CameraController';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// Simple Error Boundary to catch texture loading issues
interface ErrorBoundaryProps {
    children?: ReactNode;
}
  
interface ErrorBoundaryState {
    hasError: boolean;
}
  
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false };
  
    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }
  
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Three.js Error:", error, errorInfo);
    }
  
    render() {
        if (this.state.hasError) {
            return (
                <group>
                    <mesh>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshBasicMaterial color="red" wireframe />
                    </mesh>
                </group>
            );
        }
        return this.props.children;
    }
}

export const Scene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0 bg-black z-0">
      <Canvas
        camera={{ position: [0, 20, 40], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        shadows
        dpr={[1, 2]} // Performance optimization for varied screens
      >
        <color attach="background" args={['#050508']} />
        
        <ErrorBoundary>
            <Suspense fallback={null}>
            <ambientLight intensity={0.15} />
            <pointLight position={[0, 0, 0]} intensity={2} color="#FDB813" decay={0} distance={200} />
            
            <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            
            <SolarSystem />
            <CameraController />
            
            <EffectComposer>
                <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={1.5} />
            </EffectComposer>
            </Suspense>
        </ErrorBoundary>

        {/* Orbit controls allowed only when not locked to a planet for smoother feel */}
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={10} 
          maxDistance={200}
        />
      </Canvas>
      
      {/* Loading Overlay (outside Canvas) */}
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
            <div className="text-blue-500 font-mono animate-pulse">LOADING ASSETS...</div>
        </div>
      }>
        <></>
      </Suspense>
    </div>
  );
};