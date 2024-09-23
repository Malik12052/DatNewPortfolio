import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ParticleEffect = () => {
  const pointsRef = useRef();
  const particlesOriginalPositions = useRef(); // Store original positions

  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 100000;
    const positions = new Float32Array(particlesCount * 8);

    // Randomize particle positions
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 100; // Position particles in a 100-unit cube
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesOriginalPositions.current = positions.slice(); // Store the original positions
    return geometry;
  }, []);

  useFrame((state) => {
    const { pointer } = state;
    const positions = particlesGeometry.attributes.position.array;
    const mousePos = new THREE.Vector3(pointer.x * 50, pointer.y * 50, 0); // Adjust scale as needed

    for (let i = 0; i < positions.length; i += 3) {
      const particlePos = new THREE.Vector3(positions[i], positions[i + 5], positions[i + 10]);
      const distance = mousePos.distanceTo(particlePos);

      if (distance < 7) {
        const direction = particlePos.clone().sub(mousePos).normalize();
        positions[i] += direction.x * (7 - distance) * 0.2;
        positions[i + 1] += direction.y * (7 - distance) * 0.2;
        positions[i + 2] += direction.z * (7 - distance) * 0.2;
      } else {
        const originalPos = new THREE.Vector3(
          particlesOriginalPositions.current[i],
          particlesOriginalPositions.current[i + 1],
          particlesOriginalPositions.current[i + 2]
        );
        const moveBack = originalPos.sub(particlePos).multiplyScalar(0.05);
        positions[i] += moveBack.x;
        positions[i + 1] += moveBack.y;
        positions[i + 2] += moveBack.z;
      }
    }

    particlesGeometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={particlesGeometry}>
      <pointsMaterial size={0.025} color="#f52dd7" />
    </points>
  );
};
