// pages/about.js
import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, OrbitControls, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import confetti from 'canvas-confetti';

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const InteractiveBackground = () => {
  const meshRef = useRef();
  const materialRef = useRef();
  const sphereRef = useRef();
  const sphereMaterialRef = useRef();
  const [showConfetti, setShowConfetti] = useState(false);
  const { camera } = useThree();

  const handleConfettiClick = () => {
    setShowConfetti(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime) * 0.1;
      meshRef.current.scale.y = 1 + Math.cos(state.clock.elapsedTime) * 0.1;
      meshRef.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.time.value += delta * 0.5;
    }

    if (sphereRef.current) {
      sphereRef.current.rotation.x += delta * 0.3;
      sphereRef.current.rotation.y += delta * 0.4;
      sphereRef.current.position.y = Math.sin(state.clock.elapsedTime) * 5 + 20;
      sphereRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.5) * 5 + 25;
    }

    if (sphereMaterialRef.current) {
      sphereMaterialRef.current.uniforms.time.value += delta * 0.5;
    }
  });

  return (
    <>
      <mesh ref={meshRef} onClick={handleConfettiClick}>
        <torusKnotGeometry args={[10, 3, 200, 32]} />
        <shaderMaterial
          ref={materialRef}
          uniforms={{
            time: { value: 0 },
            stripeWidth: { value: 0.1 },
            stripeSpeed: { value: 0.25 },
          }}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform float time;
            uniform float stripeWidth;
            uniform float stripeSpeed;
            varying vec2 vUv;
            void main() {
              float t = vUv.x + vUv.y - time * stripeSpeed;
              float stripePattern = step(fract(t / stripeWidth), 0.5);
              vec3 color1 = vec3(0.0);
              vec3 color2 = vec3(1.0);
              vec3 finalColor = mix(color1, color2, stripePattern);
              gl_FragColor = vec4(finalColor, 1.0);
            }
          `}
        />
      </mesh>

      <mesh ref={sphereRef} position={[25, 20, 0]}>
        <sphereGeometry args={[5, 32, 32]} />
        <shaderMaterial
          ref={sphereMaterialRef}
          uniforms={{
            time: { value: 0 },
            stripeWidth: { value: 0.2 },
            stripeSpeed: { value: 0.5 },
          }}
          vertexShader={`
            varying vec2 vUv;
            varying vec3 vNormal;
            void main() {
              vUv = uv;
              vNormal = normal;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform float time;
            uniform float stripeWidth;
            uniform float stripeSpeed;
            varying vec2 vUv;
            varying vec3 vNormal;
            void main() {
              float t = vUv.x + vUv.y - time * stripeSpeed;
              float stripePattern = step(fract(t / stripeWidth), 0.5);
              vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
              float diffuse = max(dot(vNormal, lightDir), 0.0);
              vec3 color1 = vec3(0.0);
              vec3 color2 = vec3(1.0);
              vec3 finalColor = mix(color1, color2, stripePattern);
              finalColor *= (0.5 + 0.5 * diffuse);
              gl_FragColor = vec4(finalColor, 1.0);
            }
          `}
        />
      </mesh>


      <Html position={[-35, 0, 0]} transform occlude>
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          animate={{
            x: [-10, 30, -10],
            y: [-5, 5, -5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            style={{
              width: '350px',
              height: '150px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              borderRadius: '2900px',
            }}
            animate={{
              backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FF6B6B'],
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              style={{
                position: 'absolute',
                right: '-150px',
                width: 0,
                height: 0,
                borderTop: '75px solid transparent',
                borderBottom: '75px solid transparent',
              }}
              animate={{
                borderLeft: ['120px solid #FF6B6B', '120px solid #4ECDC4', '120px solid #45B7D1', '120px solid #FF6B6B'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.p
              style={{
                margin: 0,
                fontWeight: 'bold',
                fontSize: '48px',
                color: 'white',
              }}
              animate={{
                scale: [1.5, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Click Me
            </motion.p>
          </motion.div>
        </motion.div>
      </Html>
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
      <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />
    </group>
  );
};

const FloatingText = () => {
  const textRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.5;
    }
  });

  return (
    <Text
      ref={textRef}
      position={[0, 10, 0]}
      fontSize={2}
      color={isVisible ? "#ffffff" : "transparent"}
      anchorX="center"
      anchorY="middle"
      onPointerEnter={handleMouseEnter}
      onPointerLeave={handleMouseLeave}
    >
     
    </Text>
  );
};
const AboutPage = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    const animateColors = () => {
      animate(color, COLORS_TOP, {
        ease: "easeInOut",
        duration: 20,
        repeat: Infinity,
        repeatType: "mirror",
      });
    };

    animateColors();

    return () => {
      color.stop();
    };
  }, [color]);

  const backgroundImage = useMotionTemplate`linear-gradient(to bottom, ${color}, transparent)`;

  return (
    <div
      className="relative min-h-screen px-4 py-12 text-zinc-50"
      style={{
        backgroundImage,
      }}
    >
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 40] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <InfiniteStars />
          <InteractiveBackground />
          <FloatingText />
          <OrbitControls enableZoom={true} enablePan={true} />
        </Canvas>
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-4xl p-8 bg-zinc-800 bg-opacity-90 rounded-lg shadow-lg text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">About Me</h1>
        <p className="text-lg leading-relaxed">
          Hi, I'm Gabriel Felix, an entrepreneur, musician, artist, and software engineer.
          I specialize in creating innovative solutions at the intersection of art, technology, 
          and business. From blockchain development to graphic design, I'm passionate about turning dreams into reality.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          Let's connect and bring creative ideas to life.
        </p>
        <motion.button
          className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get in Touch
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AboutPage;

import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const MyObject = () => {
  const texture = useLoader(TextureLoader, '/path/to/your/pattern.png');

  return (
    <mesh>
      <boxGeometry />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};
