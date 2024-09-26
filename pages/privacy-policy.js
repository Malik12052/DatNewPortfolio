import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const PrivacyPolicy = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 20,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  const backgroundImage = useMotionTemplate`linear-gradient(to bottom, ${color}, transparent)`;

  return (
    <div
      className="relative min-h-screen px-4 py-12 text-zinc-50 overflow-hidden"
      style={{
        backgroundImage,
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      {/* Starry Background and Interactive Elements */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 40] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <InfiniteStars />
          <InteractiveBackground />
          <OrbitControls enableZoom={true} enablePan={true} />
        </Canvas>
      </div>

      {/* Privacy Policy Content */}
      <motion.div
        className="relative z-10 container mx-auto bg-zinc-800 bg-opacity-80 rounded-lg p-8 shadow-lg text-left"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Privacy Policy
        </h1>
        <p className="mb-8 text-center text-gray-400 italic">Last Updated: [Date]</p>

        {/* Full Policy Content */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-purple-300 mb-4">Introduction</h2>
          <p className="text-lg leading-relaxed">
            Welcome to Gabriel Felix's Portfolio Website ("we," "us," "our"). Your privacy is important to us, and we are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website [Your Website URL] (the "Site").
          </p>
          <p className="text-lg leading-relaxed mt-4">
            By accessing or using our Site, you agree to the terms of this Privacy Policy. If you do not agree with the terms, please do not access or use the Site.
          </p>
        </section>

        <hr className="border-purple-600 my-8" />

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-purple-300 mb-4">1. Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-4 text-lg leading-relaxed">
            <li>
              <strong className="text-indigo-300">Personal Data:</strong> While using our website, we may collect information that can identify you, such as your name, email address, or other contact details, but only if you voluntarily provide it.
            </li>
            <li>
              <strong className="text-indigo-300">Non-Personal Data:</strong> We automatically collect non-personal information, including IP address, browser type, operating system, and page views, to enhance the functionality and user experience of our Site.
            </li>
            <li>
              <strong className="text-indigo-300">Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to monitor activity on our website. You can set your browser to refuse cookies, but this may affect some portions of the website.
            </li>
          </ul>
        </section>

        <hr className="border-purple-600 my-8" />

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-purple-300 mb-4">2. How We Use Your Information</h2>
          <p className="text-lg leading-relaxed">
            We may use the information we collect from you in the following ways:
          </p>
          <ul className="list-decimal pl-5 mt-4 space-y-4 text-lg leading-relaxed">
            <li>To operate and maintain the website.</li>
            <li>To improve our website to better serve you.</li>
            <li>To respond to inquiries, questions, and other requests.</li>
            <li>To analyze the use of the website and customize user experience.</li>
            <li>To detect and prevent fraudulent activity.</li>
          </ul>
        </section>

        <hr className="border-purple-600 my-8" />

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-purple-300 mb-4">3. Sharing Your Information</h2>
          <p className="text-lg leading-relaxed">
            We do not sell, trade, or otherwise transfer your personal information to outside parties unless we provide you with advance notice, except as described below:
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-4 text-lg leading-relaxed">
            <li>
              <strong className="text-indigo-300">Third-Party Service Providers:</strong> We may share your information with third-party service providers who assist us in operating our website.
            </li>
            <li>
              <strong className="text-indigo-300">Legal Requirements:</strong> We may disclose your information if required by law or in response to valid requests by public authorities.
            </li>
          </ul>
        </section>

        <hr className="border-purple-600 my-8" />

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-purple-300 mb-4">4. Security of Your Information</h2>
          <p className="text-lg leading-relaxed">
            We use administrative, technical, and physical security measures to help protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <hr className="border-purple-600 my-8" />

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-purple-300 mb-4">5. Your Rights</h2>
          <p className="text-lg leading-relaxed">
            Depending on your location, you may have certain rights regarding your personal information, including accessing, correcting, or requesting deletion of your data. To exercise these rights, please contact us at [Your Contact Email].
          </p>
        </section>

        <hr className="border-purple-600 my-8" />

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-purple-300 mb-4">6. Contact Us</h2>
          <p className="text-lg leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="text-lg leading-relaxed mt-4 font-semibold text-indigo-300">Email: [Your Email Address]</p>
        </section>
      </motion.div>
    </div>
  );
};

const InteractiveBackground = () => {
  const meshRef = useRef();
  const materialRef = useRef();
  const sphereRef = useRef();
  const sphereMaterialRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }

    if (sphereRef.current) {
      sphereRef.current.rotation.x += delta * 0.3;
      sphereRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[10, 3, 200, 32]} />
        <meshStandardMaterial color="#ffffff" wireframe />
      </mesh>

      <mesh ref={sphereRef} position={[25, 20, 0]}>
        <sphereGeometry args={[5, 32, 40]} />
        <meshStandardMaterial color="#ffffff" wireframe />
      </mesh>
    </>
  );
};

const InfiniteStars = () => {
  const starsRef = useRef();

  useFrame(({ camera }) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0001;
      starsRef.current.position.copy(camera.position);
    }
  });

  return (
    <group ref={starsRef}>
      <Stars radius={300} depth={50} count={40000} factor={70} saturation={0} fade speed={0.5} />
    </group>
  );
};

export default PrivacyPolicy;
