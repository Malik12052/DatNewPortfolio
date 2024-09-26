import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Points, PointMaterial } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import 'animate.css';
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import { a, useSpring } from '@react-spring/three';

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;
  const textGradient = useMotionTemplate`linear-gradient(45deg, ${color}, #fff)`;

  // Particle Effects
  const ParticleEffect = () => {
    const pointsRef = useRef();

    useFrame((state) => {
      const { mouse } = state;
      pointsRef.current.rotation.x = mouse.y * 0.01;
      pointsRef.current.rotation.y = mouse.x * 0.01;
    });

    return (
      <Points ref={pointsRef} limit={1000} range={100}>
        <PointMaterial size={0.05} color="#13FFAA" />
      </Points>
    );
  };

  // Sphere Animation
  const SphereAnimation = () => {
    const sphereRef = useRef();

    useFrame(() => {
      sphereRef.current.rotation.x += 0.002;
      sphereRef.current.rotation.y += 0.002;
      sphereRef.current.rotation.z += 0.005;
    });

    return (
      <a.points ref={sphereRef} position={[1, 0.25, 0]} scale={[1, 4, 1]}>
        <sphereGeometry args={[2, 35, 32]} />
        <a.pointsMaterial color="#13FFAA" size={0.1} /> {/* Soft teal color */}
      </a.points>
    );
  };

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <motion.div
        className="flex flex-col items-center justify-center z-10" // Higher zIndex
        style={{
          position: "absolute",
          top: "5%",
          left: "39%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          y: [0, -10, 0], // Vertical floating effect
          scale: [1, 1.05, 1], // Subtle scaling effect
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      >
        <img
          src="/papi.png"
          alt="Gabe Felix"
          className="w-48 h-48 rounded-full object-cover shadow-lg md:w-64 md:h-64"
        />
      </motion.div>

      <motion.h1
        className="text-center text-2xl font-medium leading-tight sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight matemasie-regular mt-48 z-10" // Higher zIndex
        style={{
          backgroundImage: textGradient,
          backgroundClip: 'text',
          color: 'transparent',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
        animate={{
          scale: [1.5, 0.55, 1], // Subtle scaling effect
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      >
        Gabriel Felix
      </motion.h1>

      <motion.p
        className="my-6 max-w-xxl text-center text-2xl leading-relaxed md:text-4xl md:leading-relaxed matemasie-regular z-10" // Higher zIndex
        style={{
          backgroundImage: textGradient, // Use the animated gradient
          backgroundClip: 'text',
          color: 'transparent',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0px 4px 24px rgba(0, 0, 0, 0.5)', // Subtle text shadow
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        whileHover={{
          scale: 1.05, // Slight scaling on hover
          textShadow: '0px 4px 24px rgba(255, 255, 255, 0.8)', // Glow effect on hover
        }}
      >
        Entrepreneur, Musician, Artist, Software Engineer, Blockchain Developer.
        I create, innovate, and explore the possibilities at the intersection of art, technology, and business.
      </motion.p>

      <motion.button
        style={{ 
          border,
          boxShadow,
        }}
        whileHover={{
          scale: 1.015,
        }}
        whileTap={{
          scale: 0.985,
        }}
        className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50 matemasie-regular mt-1 z-10" // Higher zIndex
      >
        Explore My Portfolio
        <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
      </motion.button>

      <div className="absolute inset-0 z-0"> {/* Lower zIndex */}
        <Canvas>
          <Stars radius={350} count={1000} factor={30} fade speed={1} />
          <SphereAnimation />
          <ParticleEffect />
        </Canvas>
      </div>
    </motion.section>
  );
};
