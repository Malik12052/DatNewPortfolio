import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Noise } from "noisejs";
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";
import { motion } from "framer-motion";

// Points that represent "Skills" (simplified version)
const skillsWordShape = [
  [-5, 0, 0], [-4, 1, 0], [-3, 0, 0], [-2, 1, 0], [-1, 0, 0], [0, 1, 0], // 'S'
  [2, 1, 0], [2, 0, 0], [2, -1, 0], [3, 0, 0], [4, 1, 0], [4, -1, 0], // 'K'
  [6, 1, 0], [6, 0, 0], [6, -1, 0], [7, 0, 0], // 'I'
  [9, 1, 0], [9, 0, 0], [9, -1, 0], [10, 0, 0], [11, 1, 0], [11, -1, 0], // 'L'
  [13, 1, 0], [13, 0, 0], [13, -1, 0], [14, 0, 0], [15, 1, 0], [15, -1, 0], // 'L'
  [17, 1, 0], [17, 0, 0], [17, -1, 0], [18, 0, 0], [19, 1, 0], [19, -1, 0], // 'S'
];

// Your particle effect
const EnhancedParticleEffect = () => {
  const points = useRef();
  const noise = new Noise(Math.random());
  const particleCount = 1000; // Particle count for more detail
  const positions = new Float32Array(particleCount * 3);
  const initialPositions = new Float32Array(particleCount * 3); // Save initial positions
  const targetPositions = new Float32Array(particleCount * 3); // For shaping particles
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);
  const shapeDuration = 6; // Seconds to hold a shape
  const [scrollY, setScrollY] = useState(0);

  const galaxyColors = [
    new THREE.Color(0xff69b4), // Hot pink
    new THREE.Color(0x40e0d0), // Turquoise
    new THREE.Color(0x9370db), // Medium purple
    new THREE.Color(0x1e90ff), // Dodger blue
    new THREE.Color(0xffd700), // Gold
  ];

  // Shape definition for the word "Skills"
  const defineWordShape = () => {
    for (let i = 0; i < particleCount; i++) {
      const letterIndex = i % skillsWordShape.length;
      const [x, y, z] = skillsWordShape[letterIndex];

      const jitterX = (Math.random() - 0.5) * 0.5; // Add randomness to the positioning
      const jitterY = (Math.random() - 0.5) * 0.5;
      const jitterZ = (Math.random() - 0.5) * 0.5;

      targetPositions.set([x + jitterX, y + jitterY, z + jitterZ], i * 3);
    }
  };

  // Generate initial random particle positions, colors, and sizes
  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 50;
    const y = (Math.random() - 0.5) * 50;
    const z = (Math.random() - 0.5) * 50;

    positions.set([x, y, z], i * 3);
    initialPositions.set([x, y, z], i * 3);

    const color = galaxyColors[i % galaxyColors.length];
    colors.set(color.toArray(), i * 3);

    sizes[i] = Math.random() * 1.5 + 0.5;
  }

  let direction = 1;
  let timeElapsed = 0;

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(({ clock }) => {
    const delta = clock.getDelta();
    timeElapsed += delta;

    // Switch direction when shape duration is met
    if (timeElapsed >= shapeDuration) {
      direction *= -1;
      timeElapsed = 0;
      if (direction === 1) defineWordShape();
    }

    const lerpFactor = delta * 0.7;
    const scrollFactor = scrollY * 0.001;

    for (let i = 0; i < particleCount; i++) {
      const index = i * 3;
      const currentPosition = positions[index];
      const currentY = positions[index + 1];
      const currentZ = positions[index + 2];

      const targetX = direction === 1 ? targetPositions[index] : initialPositions[index] + scrollFactor;
      const targetY = direction === 1 ? targetPositions[index + 1] : initialPositions[index + 1] + scrollFactor;
      const targetZ = direction === 1 ? targetPositions[index + 2] : initialPositions[index + 2] + scrollFactor;

      const clampedX = THREE.MathUtils.clamp(targetX, -25, 25);
      const clampedY = THREE.MathUtils.clamp(targetY, -15, 15);
      const clampedZ = THREE.MathUtils.clamp(targetZ, -15, 15);

      positions[index] = THREE.MathUtils.lerp(currentPosition, clampedX, lerpFactor);
      positions[index + 1] = THREE.MathUtils.lerp(currentY, clampedY, lerpFactor);
      positions[index + 2] = THREE.MathUtils.lerp(currentZ, clampedZ, lerpFactor);
    }

    points.current.geometry.attributes.position.needsUpdate = true;
    points.current.geometry.attributes.color.needsUpdate = true;

    points.current.rotation.x += 0.0005;
    points.current.rotation.y += 0.0005;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={particleCount}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={particleCount}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        sizeAttenuation={false}
        vertexColors
        depthWrite={true}
        opacity={1}
        transparent={false}
      />
    </points>
  );
};

const Skills = () => {
  const skillCards = [
    { title: "JavaScript", description: "Dynamic web development language" },
    { title: "React.js", description: "Efficient UI rendering framework" },
    { title: "Tailwind CSS", description: "Utility-first CSS framework" },
    // Add more skills here
  ];

  return (
    <div className="relative min-h-screen">
      <Canvas>
        <EnhancedParticleEffect />
        <EffectComposer>
          <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.9} intensity={1.5} />
          <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} />
        </EffectComposer>
      </Canvas>

      {/* Skill cards below the particle effect */}
      <div className="flex flex-wrap justify-center mt-10">
        {skillCards.map((card, index) => (
          <motion.div
            key={index}
            className="m-4 p-6 bg-white rounded-lg shadow-lg hover:scale-105 transition-transform"
            whileHover={{ scale: 1.1 }}
            style={{ width: "200px" }}
          >
            <h3 className="text-xl font-bold mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
