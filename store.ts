import { create } from 'zustand';
import { AppState, GestureType } from './types';

export const useStore = create<AppState>((set) => ({
  activePlanetId: null,
  hoveredPlanetId: null,
  cameraMode: 'ORBITAL',
  simulationSpeed: 1,
  currentGesture: GestureType.IDLE,
  gestureConfidence: 0,
  isGestureEnabled: true,

  setActivePlanet: (id) => set({ 
    activePlanetId: id, 
    cameraMode: id ? 'LOCKED' : 'ORBITAL' 
  }),
  setHoveredPlanet: (id) => set({ hoveredPlanetId: id }),
  setSimulationSpeed: (speed) => set({ simulationSpeed: speed }),
  setGesture: (gesture, confidence) => set({ currentGesture: gesture, gestureConfidence: confidence }),
  toggleGestureControl: () => set((state) => ({ isGestureEnabled: !state.isGestureEnabled })),
}));