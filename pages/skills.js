import React, { useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";
import * as THREE from "three";
import { Noise } from "noisejs";

// Sample skill data to showcase
const skillData = [
  { title: "Frontend Development", description: "Next.js, React.js, Tailwind CSS", emoji: "🛠️" },
  { title: "Design", description: "Graphic Design, Figma", emoji: "🎨" },
  { title: "Programming Languages", description: "JavaScript (ES6+), Solidity", emoji: "💻" },
  { title: "Audio Engineering", description: "Ableton Live, Plugins", emoji: "🎧" },
  { title: "3D Development", description: "React Three Fiber, Three.js", emoji: "🖥️" },
  { title: "Blockchain Development", description: "Smart Contracts, DApps", emoji: "📈" },
];

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const Skills = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`linear-gradient(to bottom, ${color}, transparent)`;

  return (
    <div
      className="relative min-h-screen px-4 py-12 text-zinc-50"
      style={{
        backgroundImage,
      }}
    >
      <motion.div
        className="relative z-10 mx-auto grid max-w-4xl grid-cols-1 md:grid-cols-3 gap-6"
      >
        <h1 className="col-span-3 text-4xl font-bold mb-8">My Skills</h1>
        {skillData.map((skill, index) => (
          <EnhancedCard key={index} skill={skill} />
        ))}
      </motion.div>

      {/* Starry Background and Particle Effect */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={180} count={5000} factor={15} fade speed={1} />
          <EnhancedParticleEffect />
          <EffectComposer>
            <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.9} intensity={1.5} />
            <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
};

// Enhanced Card with Glassmorphism and Hover Effects
const EnhancedCard = ({ skill }) => {
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - rect.left - rect.width / 2;
    const dy = event.clientY - rect.top - rect.height / 2;
    x.set(dx / 10);
    y.set(dy / 10);
  };

  return (
    <motion.div
      className="relative p-6 rounded-xl shadow-xl bg-white bg-opacity-10 backdrop-blur-lg border border-white/30 transition-all"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX: y,
        rotateY: x,
        perspective: 1000,
        boxShadow: hovered
          ? "0px 20px 40px rgba(0, 255, 255, 0.7), 0px 10px 20px rgba(255, 255, 255, 0.2)"
          : "0px 10px 20px rgba(0, 0, 0, 0.1)",
      }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-r from-pink-500 to-blue-500 opacity-20 rounded-full"
        animate={{ scale: hovered ? 2 : 0 }}
        transition={{ duration: 0.5 }}
      />
      <div className="flex items-center justify-between mb-4 relative overflow-hidden">
        <motion.span
          className="text-5xl z-10"
          animate={{ rotate: hovered ? 360 : 0 }}
          transition={{ duration: 0.8 }}
        >
          {skill.emoji}
        </motion.span>
        <motion.h2
          className="text-xl font-semibold z-10 text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: hovered ? 1 : 0.8, y: hovered ? 0 : -10 }}
          transition={{ duration: 0.3 }}
        >
          {skill.title}
        </motion.h2>
      </div>
      <motion.p
        className="text-base text-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        {skill.description}
      </motion.p>
    </motion.div>
  );
};

// Enhanced Particle effect component
const EnhancedParticleEffect = () => {
  const points = React.useRef();
  const noise = new Noise(Math.random());
  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount );
  const originalPositions = new Float32Array(particleCount * 3);

  // Galaxy-inspired color palette
  const galaxyColors = [
    new THREE.Color(0xff69b4), // Hot pink
    new THREE.Color(0x40e0d0), // Turquoise
    new THREE.Color(0x9370db), // Medium purple
    new THREE.Color(0x1e90ff), // Dodger blue
    new THREE.Color(0xffd700), // Gold
  ];

  // Generate random particle positions, colors, and sizes
  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 50;
    const y = (Math.random() - 0.5) * 50;
    const z = (Math.random() - 0.5) * 50;

    positions.set([x, y, z], i * 3);
    originalPositions.set([x, y, z], i * 3);

    // Assign a color from the galaxyColors array
    const color = galaxyColors[i % galaxyColors.length];
    colors.set(color.toArray(), i * 3);

    sizes[i] = Math.random() * 1.5 + 0.5; // Vary sizes between 0.5 and 2
  }

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    for (let i = 0; i < particleCount; i++) {
      const index = i * 3;



      const originalX = originalPositions[index];
      const originalY = originalPositions[index + 1];
      const originalZ = originalPositions[index + 2];

      // Apply Perlin noise for organic motion



      const noiseX = noise.simplex3(originalX / 1015, originalY / 500, time / 200) * 2;
      const noiseY = noise.simplex3(originalY / 500, originalZ / 400, time / 100) * 2;
      const noiseZ = noise.simplex3(originalZ / 100, originalX / 500, time / -100) * 2;

      // Calculate new positions with a return-to-origin behavior
      positions[index] = originalX + noiseX * Math.sin(time);
      positions[index + 1] = originalY + noiseY * Math.sin(time);
      positions[index + 2] = originalZ + noiseZ * Math.sin(time);
    }
    points.current.geometry.attributes.position.needsUpdate = true;

    // Rotate particles for a subtle motion effect
    points.current.rotation.x += 0.001;
    points.current.rotation.y += 0.00001;
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
        size={0.7}
        sizeAttenuation
        vertexColors
        depthWrite={false}
        transparent
      />
    </points>
  );
};


export default Skills;