import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Fix for TypeScript errors with React Three Fiber elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      points: any;
      bufferGeometry: any;
      bufferAttribute: any;
      pointsMaterial: any;
      color: any;
      ambientLight: any;
    }
  }
}

const PARTICLE_COUNT = 4000;

// Helper to calculate positions for different shapes
const getPointOnSphere = (r: number) => {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi)
  );
};

const getPointInGalaxy = () => {
  const angle = Math.random() * Math.PI * 2;
  const radius = 5 + Math.random() * 10;
  const spiralOffset = radius * 0.5;
  return new THREE.Vector3(
    Math.cos(angle + spiralOffset) * radius,
    (Math.random() - 0.5) * 2, // Flat galaxy
    Math.sin(angle + spiralOffset) * radius
  );
};

// Simulate O2 Molecule (2 atoms connected)
const getPointInAtom = (index: number) => {
  // Two centers for the Oxygen molecule
  const centerOffset = 1.2;
  const center = index % 2 === 0 ? -centerOffset : centerOffset;
  
  // Nucleus (dense center) vs Electron Cloud (wider rings)
  const isNucleus = Math.random() > 0.8;
  
  if (isNucleus) {
      // Nucleus
      const v = getPointOnSphere(0.4);
      v.x += center;
      return v;
  } else {
      // Electron shells
      const shellRadius = 1.5 + Math.random() * 0.5;
      // Orbit alignment (randomize orbit planes)
      const v = getPointOnSphere(shellRadius);
      v.x += center;
      return v;
  }
};

const ParticleSystem = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const [phase, setPhase] = useState<'chaos' | 'galaxy' | 'atom'>('chaos');
  
  // Store target positions for each phase
  const chaosPositions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  const galaxyPositions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = getPointInGalaxy();
      pos[i * 3] = p.x;
      pos[i * 3 + 1] = p.y;
      pos[i * 3 + 2] = p.z;
    }
    return pos;
  }, []);

  const atomPositions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = getPointInAtom(i);
      pos[i * 3] = p.x;
      pos[i * 3 + 1] = p.y;
      pos[i * 3 + 2] = p.z;
    }
    return pos;
  }, []);

  // Initial geometry attributes
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const color = new THREE.Color();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Start at chaos
      pos[i * 3] = chaosPositions[i * 3];
      pos[i * 3 + 1] = chaosPositions[i * 3 + 1];
      pos[i * 3 + 2] = chaosPositions[i * 3 + 2];

      // Purple / Blue gradients
      if (Math.random() > 0.5) {
          color.setHSL(0.7 + Math.random() * 0.1, 0.8, 0.6); // Purple/Violet
      } else {
          color.setHSL(0.6 + Math.random() * 0.1, 0.9, 0.7); // Blue/Cyan
      }
      
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return [pos, col];
  }, [chaosPositions]);

  // Sequence Logic
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('galaxy'), 2500); // Chaos -> Galaxy
    const t2 = setTimeout(() => setPhase('atom'), 7000);   // Galaxy -> Atom (O2)
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const geom = pointsRef.current.geometry;
    const currentPositions = geom.attributes.position.array as Float32Array;
    
    let target: Float32Array;
    let lerpSpeed = 0.02;

    // Rotation animation base
    pointsRef.current.rotation.y += 0.001;

    if (phase === 'chaos') {
      target = chaosPositions;
      lerpSpeed = 0.005; // Slow expansion
    } else if (phase === 'galaxy') {
      target = galaxyPositions;
      lerpSpeed = 0.02; // Swirling into shape
      pointsRef.current.rotation.y += 0.002; // Spin faster
    } else {
      target = atomPositions;
      lerpSpeed = 0.03; // Snap to structure
      // O2 molecule wobble
      pointsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }

    // Interpolate positions
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      currentPositions[i] += (target[i] - currentPositions[i]) * lerpSpeed;
    }

    geom.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const Hero3D: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }} dpr={[1, 2]}>
        <color attach="background" args={['#000000']} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <ambientLight intensity={0.5} />
        <ParticleSystem />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
      </Canvas>
    </div>
  );
};

export default Hero3D;