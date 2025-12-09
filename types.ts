export enum GestureType {
  IDLE = 'IDLE',
  OPEN_HAND = 'OPEN_HAND', // Hover/Explore
  CLOSED_FIST = 'CLOSED_FIST', // Grab/Rotate
  POINTING = 'POINTING', // Select/Focus
  VICTORY = 'VICTORY' // Zoom Out/Overview
}

export interface PlanetData {
  id: string;
  name: string;
  color: string;
  radius: number; // Relative size
  distance: number; // Semi-major axis (a)
  speed: number; // Base animation speed factor
  textureUrl: string;
  description: string;
  details: {
    mass: string;
    temp: string;
    moons: number;
    orbitalPeriod: string;
    eccentricity: string;
    axialTilt: string;
  };
  orbit: {
    eccentricity: number;
    perihelion: number; // Argument of perihelion (rotation of ellipse)
    tilt: number;
  };
}

export interface AppState {
  activePlanetId: string | null;
  hoveredPlanetId: string | null;
  cameraMode: 'ORBITAL' | 'LOCKED' | 'FREE';
  simulationSpeed: number;
  currentGesture: GestureType;
  gestureConfidence: number;
  isGestureEnabled: boolean;
  
  // Actions
  setActivePlanet: (id: string | null) => void;
  setHoveredPlanet: (id: string | null) => void;
  setSimulationSpeed: (speed: number) => void;
  setGesture: (gesture: GestureType, confidence: number) => void;
  toggleGestureControl: () => void;
}