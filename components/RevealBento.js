import { Stars, Points, PointMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import 'animate.css';
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import { Bio } from "./Bio";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const RevealBento = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 100%, #020617 50%, ${color}), linear-gradient(to top, #1E1E2C, #23252E)`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;
  const textGradient = useMotionTemplate`linear-gradient(45deg, ${color}, #fff)`;

  const Particles = () => {
    const points = new Float32Array(1000)
      .fill(0)
      .map(() => (Math.random() - 0.5) * 10);
    return (
      <Points positions={points} stride={3} frustumCulled>
        <PointMaterial transparent color="white" size={0.01} sizeAttenuation={true} />
      </Points>
    );
  };

  const SphereAnimation = () => {
    const sphereRef = useRef();

    useFrame(() => {
      sphereRef.current.rotation.x += 0.002;
      sphereRef.current.rotation.y += 0.002;
      sphereRef.current.rotation.z += 0.005;
    });

    return (
      <points ref={sphereRef} position={[0, .25, 0]} scale={[0.8, 3.2, 0.8]}>
        <sphereGeometry args={[1.8, 35, 32]} />
        <pointsMaterial color="#13FFAA" size={0.1} />
      </points>
    );
  };

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative min-h-screen overflow-hidden bg-gray-950 px-4 py-24 md:py-32 lg:py-40 text-gray-200"
    >
      <div className="mb-8"> {/* Add margin to space the social blocks down */}
        <Bio />
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <Stars radius={120} count={3000} factor={20} saturation={0.5} fade speed={0.8} />
          <Particles />
          <SphereAnimation />
        </Canvas>
      </div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="cursor-pointer p-4 mt-8 text-lg"
        style={{ border, boxShadow }}
      >
        <div className="flex items-center space-x-2">
          <span>Learn More</span>
          <FiArrowRight />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-4 left-4"
      >
        <div
          style={{
            background: textGradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          className="text-4xl font-bold tracking-wide"
        >
          Welcome to RevealBento
        </div>
      </motion.div>
    </motion.section>
  );
};
