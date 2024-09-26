import React, { useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Canvas } from "@react-three/fiber";
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

const Skills = () => {
  return (
    <div className="relative min-h-screen px-4 py-12 text-zinc-50 bg-gradient-to-b from-gray-800 to-gray-900">
      <motion.div className="relative z-10 mx-auto grid max-w-4xl grid-cols-1 md:grid-cols-3 gap-6">
        <h1 className="col-span-3 text-4xl font-bold mb-8">My Skills</h1>
        {skillData.map((skill, index) => (
          <EnhancedCard key={index} skill={skill} />
        ))}
      </motion.div>

      {/* Transparent Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
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
  // Add your particle effect logic here
  return null;
};

export default Skills;
