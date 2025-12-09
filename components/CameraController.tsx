import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useStore } from '../store';
import { PLANETS } from '../constants';
import { GestureType } from '../types';

export const CameraController: React.FC = () => {
  const { camera, scene } = useThree();
  
  // Selective subscription
  const activePlanetId = useStore(state => state.activePlanetId);
  const currentGesture = useStore(state => state.currentGesture);
  const setActivePlanet = useStore(state => state.setActivePlanet);
  
  const currentLookAt = useRef(new Vector3(0, 0, 0));
  
  useFrame((state, delta) => {
    // 1. Gesture Handling for Global Controls
    if (currentGesture === GestureType.VICTORY) {
      // Zoom out/Reset
      if (activePlanetId) setActivePlanet(null);
    }
    
    // 2. Camera Movement Logic
    if (activePlanetId) {
      const planetData = PLANETS.find(p => p.id === activePlanetId);
      if (!planetData) return;

      // Find the actual mesh in the scene for positioning
      const time = state.clock.getElapsedTime(); 
      let targetPos = new Vector3();
      let found = false;
      
      scene.traverse((child) => {
        if (!found && child.type === 'Mesh' && (child as any).geometry.type === 'SphereGeometry') {
             const radius = (child as any).geometry.parameters.radius;
             if (Math.abs(radius - planetData.radius) < 0.01) {
                child.getWorldPosition(targetPos);
                found = true;
             }
        }
      });

      if (found) {
        // Smoothly look at the planet
        currentLookAt.current.lerp(targetPos, 0.1);
        camera.lookAt(currentLookAt.current);

        // Move camera to a "shoulder" view of the planet
        const offset = new Vector3(10, 5, 10).multiplyScalar(planetData.radius * 0.8);
        const cameraTargetPos = targetPos.clone().add(offset);
        camera.position.lerp(cameraTargetPos, 0.05);
      }

    } else {
      // Default / Orbit mode
      currentLookAt.current.lerp(new Vector3(0, 0, 0), 0.05);
      camera.lookAt(currentLookAt.current);
      
      // If we gesture to point/zoom, we could effect camera here
      if (currentGesture === GestureType.POINTING) {
         camera.position.lerp(new Vector3(0, 40, 60), 0.02);
      }
    }
  });

  return null;
};