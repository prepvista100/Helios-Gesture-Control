import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, DoubleSide, EllipseCurve, TextureLoader, AdditiveBlending } from 'three';
import { PLANETS, SUN_TEXTURE_URL, SATURN_RING_TEXTURE_URL } from '../constants';
import { useStore } from '../store';
import { Html, useTexture } from '@react-three/drei';

const Planet: React.FC<{ data: typeof PLANETS[0] }> = ({ data }) => {
  const meshRef = useRef<Mesh>(null);
  
  // Load texture
  const texture = useTexture(data.textureUrl);
  
  // Selective store subscriptions
  const simulationSpeed = useStore(state => state.simulationSpeed);
  const activePlanetId = useStore(state => state.activePlanetId);
  const hoveredPlanetId = useStore(state => state.hoveredPlanetId);
  const setActivePlanet = useStore(state => state.setActivePlanet);
  const setHoveredPlanet = useStore(state => state.setHoveredPlanet);
  
  // Random starting angle
  const angleRef = useRef(Math.random() * Math.PI * 2);

  // Orbit parameters
  // For Mercury, use simple circle (eccentricity 0 logic from constants).
  // For others, calculate ellipse.
  const a = data.distance; // Semi-major axis
  const e = data.id === 'mercury' ? 0 : data.orbit.eccentricity;
  const b = a * Math.sqrt(1 - e * e); // Semi-minor axis
  const c = a * e; // Distance from center to focus (Sun position)

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Advance orbital angle
    angleRef.current += data.speed * simulationSpeed * delta;
    
    // Calculate Position based on Orbit Type
    let x, z;
    if (data.id === 'mercury') {
      // Circular Orbit for Mercury (User Request)
      x = Math.cos(angleRef.current) * data.distance;
      z = Math.sin(angleRef.current) * data.distance;
    } else {
      // Elliptical Orbit (Keplerian approximation) for others
      // x = a * cos(theta) - c (shift focus to origin)
      // z = b * sin(theta)
      x = (a * Math.cos(angleRef.current)) - c;
      z = b * Math.sin(angleRef.current);
      
      // Rotate the entire orbit by perihelion argument if desired (simplified here)
    }

    meshRef.current.position.set(x, 0, z);
    
    // Axial rotation
    meshRef.current.rotation.y += 0.01 * simulationSpeed;
  });

  const isActive = activePlanetId === data.id;
  const isHovered = hoveredPlanetId === data.id;

  return (
    <group>
      {/* Orbit Path Visualization */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={data.id === 'mercury' ? [0,0,0] : [-c, 0, 0]}>
        {data.id === 'mercury' ? (
           <ringGeometry args={[data.distance - 0.1, data.distance + 0.1, 64]} />
        ) : (
           // Approximating ellipse visualization with a scaled ring
           // Note: True ellipse line is better, but scaling a ring is a good visual approx for low e
           <ringGeometry args={[a - 0.15, a + 0.15, 128]} />
        )}
        <meshBasicMaterial 
          color="#ffffff" 
          opacity={isActive ? 0.3 : 0.08} 
          transparent 
          side={DoubleSide} 
        />
        {/* If elliptical, scale the mesh to squeeze it into an ellipse */}
        {data.id !== 'mercury' && (
          <primitive object={new Mesh().scale.set(1, b/a, 1)} /> 
        )}
      </mesh>
      
      {/* For actual non-uniform scaling of the ring geometry above, we apply scale to the mesh: */}
      {data.id !== 'mercury' && (
        <mesh 
            rotation={[-Math.PI / 2, 0, 0]} 
            position={[-c, 0, 0]} 
            scale={[1, b/a, 1]}
        >
            <ringGeometry args={[a - 0.08, a + 0.08, 128]} />
            <meshBasicMaterial color="#ffffff" opacity={isActive ? 0.3 : 0.05} transparent side={DoubleSide} />
        </mesh>
      )}


      {/* Planet Mesh */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          setActivePlanet(isActive ? null : data.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredPlanet(data.id);
        }}
        onPointerOut={(e) => {
          setHoveredPlanet(null);
        }}
      >
        <sphereGeometry args={[data.radius, 64, 64]} />
        <meshStandardMaterial 
          map={texture}
          color={data.color} // Tint
          roughness={0.7}
          metalness={0.1}
          emissiveMap={texture}
          emissive={data.color}
          emissiveIntensity={isActive || isHovered ? 0.1 : 0}
        />
        
        {/* Saturn Rings */}
        {data.id === 'saturn' && (
          <SaturnRings radius={data.radius} />
        )}

        {/* Floating Label */}
        {(isActive || isHovered) && (
          <Html 
            position={[0, data.radius + 1.5, 0]} 
            center 
            distanceFactor={15}
            style={{ pointerEvents: 'none', whiteSpace: 'nowrap' }}
            zIndexRange={[100, 0]}
          >
            <div className={`px-3 py-1.5 rounded-md text-xs font-bold tracking-widest uppercase transition-all duration-300 flex flex-col items-center
              ${isActive ? 'bg-blue-600/90 text-white scale-110 shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'bg-black/60 text-gray-200 backdrop-blur-md border border-white/10'}`}>
              <span>{data.name}</span>
              {isActive && <span className="text-[8px] opacity-75 mt-0.5">TARGET LOCKED</span>}
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
};

const SaturnRings: React.FC<{ radius: number }> = ({ radius }) => {
  // Using a texture for rings if available, else standard
  const ringTexture = useTexture(SATURN_RING_TEXTURE_URL);
  
  return (
    <mesh rotation={[-Math.PI / 2.1, 0, 0]}>
      <ringGeometry args={[radius * 1.4, radius * 2.5, 64]} />
      <meshStandardMaterial 
        map={ringTexture}
        color="#CUB895"
        opacity={0.8} 
        transparent 
        side={DoubleSide} 
      />
    </mesh>
  );
}

const Sun: React.FC = () => {
    const setActivePlanet = useStore(state => state.setActivePlanet);
    const texture = useTexture(SUN_TEXTURE_URL);

    return (
        <group onClick={() => setActivePlanet(null)}>
            {/* Core Sun */}
            <mesh>
                <sphereGeometry args={[7, 64, 64]} />
                <meshStandardMaterial 
                    map={texture} 
                    emissiveMap={texture}
                    emissive="#ffffff"
                    emissiveIntensity={1.5}
                    toneMapped={false}
                />
            </mesh>
            {/* Corona Glow */}
            <mesh scale={[1.2, 1.2, 1.2]}>
                <sphereGeometry args={[7, 32, 32]} />
                <meshBasicMaterial 
                    color="#FF5500" 
                    transparent 
                    opacity={0.2} 
                    blending={AdditiveBlending}
                    side={DoubleSide}
                />
            </mesh>
             <mesh scale={[1.5, 1.5, 1.5]}>
                <sphereGeometry args={[7, 32, 32]} />
                <meshBasicMaterial 
                    color="#FFaa00" 
                    transparent 
                    opacity={0.1} 
                    blending={AdditiveBlending}
                    side={DoubleSide}
                />
            </mesh>
        </group>
    )
}

export const SolarSystem: React.FC = () => {
  return (
    <group>
      <Sun />
      {PLANETS.map((planet) => (
        <Planet key={planet.id} data={planet} />
      ))}
    </group>
  );
};