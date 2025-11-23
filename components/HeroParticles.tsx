import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 3000;
const RADIUS = 2; // Radius of the atom
const CHAOS_RADIUS = 15; // Radius of initial explosion

// Helper to generate random point inside a sphere
const randomInSphere = (r: number) => {
  const x = THREE.MathUtils.randFloatSpread(r * 2);
  const y = THREE.MathUtils.randFloatSpread(r * 2);
  const z = THREE.MathUtils.randFloatSpread(r * 2);
  return new THREE.Vector3(x, y, z);
};

const HeroParticles: React.FC<{ onSequenceEnd: () => void }> = ({ onSequenceEnd }) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Initialize state
  // 0: Chaos/Explosion
  // 1: Condensing to Atom
  // 2: Atom Stable (Spinning)
  const [phase, setPhase] = useState(0); 
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Generate initial random positions (Chaos) and Target positions (Atom)
  const { positions, targets, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const tar = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const color = new THREE.Color();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // 1. Initial Position: Chaos (spread out far)
      const p = randomInSphere(CHAOS_RADIUS);
      pos[i * 3] = p.x;
      pos[i * 3 + 1] = p.y;
      pos[i * 3 + 2] = p.z;

      // 2. Target Position: The Oxygen Atom Structure
      // We will create a dense nucleus and 2 electron rings
      let tx, ty, tz;

      if (i < PARTICLE_COUNT * 0.4) {
        // Nucleus (40% of particles) - Dense sphere in center
        const n = randomInSphere(RADIUS * 0.3);
        tx = n.x;
        ty = n.y;
        tz = n.z;
        // Nucleus color: Hot white/purple
        color.setHSL(0.8, 1, 0.9); 
      } else {
        // Electron Shells/Rings (60% of particles)
        const angle = Math.random() * Math.PI * 2;
        // Ring 1 or Ring 2 (Oxygen has multiple electrons, simplified to orbital visual)
        const ringRadius = RADIUS + (Math.random() * 0.5);
        
        // Randomly assign to different orbital planes to look like an atom model
        const plane = Math.random() > 0.5 ? 'xy' : 'xz';
        
        if (plane === 'xy') {
            tx = Math.cos(angle) * ringRadius;
            ty = Math.sin(angle) * ringRadius;
            tz = (Math.random() - 0.5) * 0.5; // slight jitter
        } else {
            tx = Math.cos(angle) * ringRadius;
            ty = (Math.random() - 0.5) * 0.5;
            tz = Math.sin(angle) * ringRadius;
        }

        // Electron color: O2 Blue/Purple
        color.setHSL(0.75 + Math.random() * 0.1, 0.8, 0.6);
      }

      tar[i * 3] = tx;
      tar[i * 3 + 1] = ty;
      tar[i * 3 + 2] = tz;

      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return { positions: pos, targets: tar, colors: col };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const currentPositions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Update State logic
    const newTime = timeElapsed + delta;
    setTimeElapsed(newTime);

    // Phase 1: Drift slowly in chaos for 1.5 seconds
    if (phase === 0 && newTime > 1.5) {
      setPhase(1);
    }
    // Phase 1->2: Collapse to Atom (takes about 3 seconds)
    if (phase === 1 && newTime > 4.5) {
      setPhase(2);
      onSequenceEnd(); // Notify parent to show text
    }

    // Animation Logic
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      if (phase === 0) {
        // Chaos drift: move slightly outward
        currentPositions[ix] *= 1.002;
        currentPositions[iy] *= 1.002;
        currentPositions[iz] *= 1.002;
      } else if (phase === 1) {
        // Collapse: Lerp towards target
        // Speed factor increases as we get closer to simulate gravity/magnetic pull
        const lerpFactor = 2.5 * delta; 
        
        currentPositions[ix] += (targets[ix] - currentPositions[ix]) * lerpFactor;
        currentPositions[iy] += (targets[iy] - currentPositions[iy]) * lerpFactor;
        currentPositions[iz] += (targets[iz] - currentPositions[iz]) * lerpFactor;
      } else if (phase === 2) {
         // Stable Atom: Jitter slightly to simulate energy
         // We handle rotation via the group, so here we just maintain structure with slight noise
         const jitter = 0.02;
         currentPositions[ix] = targets[ix] + (Math.random() - 0.5) * jitter;
         currentPositions[iy] = targets[iy] + (Math.random() - 0.5) * jitter;
         currentPositions[iz] = targets[iz] + (Math.random() - 0.5) * jitter;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Rotation logic (Spin the whole atom)
    if (phase === 2) {
      pointsRef.current.rotation.y += delta * 0.5;
      pointsRef.current.rotation.z += delta * 0.2;
    } else {
        // Slow rotation during chaos
        pointsRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
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

export default HeroParticles;
