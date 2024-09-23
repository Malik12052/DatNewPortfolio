import React, { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, animate, useSpring, useTransform } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiArrowRight, FiMail, FiMapPin } from "react-icons/fi";
import { SiGithub, SiSoundcloud, SiInstagram } from "react-icons/si";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { FiTwitter } from "react-icons/fi";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const Bio = () => {
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
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;
  const textGradient = useMotionTemplate`linear-gradient(45deg, ${color}, #fff)`;

  return (
    <div
      className="relative min-h-screen px-4 py-12 text-zinc-50"
      style={{
        backgroundImage,
      }}
    >
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="relative z-10 mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
      >
        <HeaderBlock textGradient={textGradient} />
        <SocialsBlock />
        <AboutBlock />
        <LocationBlock />
        <EmailListBlock />
      </motion.div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={150} count={5000} factor={35} fade speed={1} />
        </Canvas>
      </div>
    </div>
  );
};

const Block = ({ className, border, boxShadow, children, ...rest }) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      style={{
        border,
        boxShadow,
      }}
      className={twMerge(
        "col-span-4 rounded-lg bg-zinc-800 p-6",
        className
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

const HeaderBlock = ({ textGradient }) => (
  <Block className="col-span-12 row-span-2 md:col-span-6">
    <img
      src="https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=John"
      alt="avatar"
      className="mb-4 size-14 rounded-full"
    />
    <h1 className="mb-12 text-4xl font-medium leading-tight">
      Hi, I'm Gabriel.{" "}
      <span className="text-white">
        I build cool websites like this one.
      </span>
    </h1>
    <a
      href="#"
      className="flex items-center gap-1 text-red-300 hover:underline"
    >
      Contact me <FiArrowRight />
    </a>
  </Block>
);

const SocialsBlock = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  const springConfig = { stiffness: 400, damping: 30 };
  const scale = useSpring(1, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      className="col-span-12 md:col-span-6 p-4 rounded-lg border-2 border-transparent"
      style={{
        background: 'linear-gradient(135deg, rgba(19,255,170,0.5), rgba(221,51,92,0.5))',
        borderImageSlice: 1,
        borderWidth: '2px',
        borderImageSource: 'linear-gradient(135deg, #13FFAA, #DD335C)',
        boxShadow: '0px 4px 24px rgba(19,255,170,0.5)',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ scale }}
    >
      <motion.div style={{ rotateX, rotateY }}>
        <Block
          whileHover={{
            rotate: "1.5deg", 
            scale: 1.2,
            backgroundColor: "rgba(255, 140, 0, 0.8)",
          }}
          className="col-span-6 bg-orange-500 md:col-span-3"
        >
          <a
            href="https://soundcloud.com/feelx1"
            className="grid h-full place-content-center text-3xl text-white"
          >
            <SiSoundcloud />
          </a>
        </Block>
        <Block
          whileHover={{
            rotate: "-1.5deg",
            scale: 1.2,
            backgroundColor: "rgba(0, 128, 0, 0.8)",
          }}
          className="col-span-6 bg-green-600 md:col-span-3"
        >
          <a
            href="https://github.com/Malik12052"
            className="grid h-full place-content-center text-3xl text-white"
          >
            <SiGithub />
          </a>
        </Block>
        <Block
          whileHover={{
            rotate: "-1.5deg",
            scale: 1.2,
            backgroundColor: "rgba(255, 20, 147, 0.8)",
          }}
          className="col-span-6 bg-pink-500 md:col-span-3"
        >
          <a
            href="https://www.instagram.com/_feelx_/?igsh=MTFkeTFzN243bGxmaQ%3D%3D&utm_source=qr&fbclid=IwY2xjawEq0BpleHRuA2FlbQIxMAABHQRM8-635f_bofWglAf_rKlpsTcdTpFdFsSkG1WYSQO8T1NDSCj2uJcIZA_aem_FDBNISvNJ0bTKeTs_nwTgg"
            className="grid h-full place-content-center text-3xl text-white"
          >
            <SiInstagram />
          </a>
        </Block>
        <Block
          whileHover={{
            rotate: "1.5deg",
            scale: 1.2,
            backgroundColor: "rgba(30, 144, 255, 0.8)",
          }}
          className="col-span-6 bg-blue-500 md:col-span-3"
        >
          <a
            href="https://x.com/Bearsace12052"
            className="grid h-full place-content-center text-3xl text-white"
          >
            <FiTwitter />
          </a>
        </Block>
      </motion.div>
    </motion.div>
  );
};

const AboutBlock = () => (
  <Block className="col-span-12 text-3xl leading-snug">
    <p>
      <span className="text-zinc-400">
        My passion is to help bring peoples dreams to reality. I build with Next.js, Javascript, React, Tailwind CSS, Solidity for blockchain and Framer Motion. Another thing I do is make Jewelry. I create music using Ableton and top-of-the-line plugins. I also have skills in graphic design. Connect with me and let's make your dreams come true! 
      </span>
    </p>
  </Block>
);

const LocationBlock = () => (
  <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-3">
    <FiMapPin className="text-3xl" />
    <p className="text-center text-lg text-zinc-400">Cyberspace</p>
  </Block>
);

const EmailListBlock = () => (
  <Block className="col-span-12 md:col-span-9">
    <p className="mb-3 text-lg">Join my mailing list</p>
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center gap-2"
    >
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-1.5 transition-colors focus:border-red-300 focus:outline-0"
      />
      <button
        type="submit"
        className="flex items-center gap-2 whitespace-nowrap rounded bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-300"
      >
        <FiMail /> Join the list
      </button>
    </form>
  </Block>
);
