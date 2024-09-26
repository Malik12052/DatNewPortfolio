// BackgroundEffect.js
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMotionTemplate, useMotionValue, motion, animate } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { a } from '@react-spring/three';

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const BackgroundEffect = () => {
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

  // Particle Effect
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
        <a.pointsMaterial color="#13FFAA" size={0.1} />
      </a.points>
    );
  };

  return (
    <motion.div
      style={{
        backgroundImage,
      }}
      className="absolute inset-0 overflow-hidden"
    >
      <Canvas>
        <ParticleEffect />
        <SphereAnimation />
      </Canvas>
    </motion.div>
  );
};
