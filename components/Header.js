import { SiInstagram, SiLinkedin, SiTwitter, SiYoutube } from "react-icons/si";
import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import ConnectButton from "./ConnectButton";

const Example = () => {
  return (
    <div>
      <Nav />
    </div>
  );
};

const Nav = () => {
  const [active, setActive] = useState(false);

  return (
    <>
      <ConnectButton />
      <HamburgerButton active={active} setActive={setActive} />
      <AnimatePresence>
        {active && <LinksOverlay setActive={setActive} />}
      </AnimatePresence>
    </>
  );
};

const LinksOverlay = ({ setActive }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed right-4 top-4 z-50 h-[calc(100vh_-_32px)] w-[calc(100%_-_32px)] bg-gray-800 p-4"
    >
      <button
        onClick={() => setActive(false)}
        className="absolute top-4 right-4 text-white text-2xl"
      >
        X
      </button>
      <LinksContainer setActive={setActive} />
      <FooterCTAs />
    </motion.nav>
  );
};

const LinksContainer = ({ setActive }) => {
  return (
    <motion.div className="space-y-4 p-12 pl-4 md:pl-20">
      {LINKS.map((l, idx) => (
        <NavLink key={l.title} href={l.href} setActive={setActive}>
          {l.title}
        </NavLink>
      ))}
    </motion.div>
  );
};

const NavLink = ({ children, href, setActive }) => {
  return (
    <motion.a
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      href={href}
      onClick={() => setActive(false)}
      className="block text-5xl font-semibold text-violet-400 transition-colors hover:text-violet-50 md:text-7xl"
    >
      {children}
    
    </motion.a>
  );
};

const HamburgerButton = ({ active, setActive }) => {
  const audioRef = useRef(null);

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    setActive(!active);
  };

  return (
    <motion.button
      initial={false}
      animate={active ? "open" : "closed"}
      onClick={handleClick}
      className={`group fixed right-4 top-4 z-50 h-20 w-20 bg-gray-900 text-white transition-all ${
        active ? "rounded-bl-xl rounded-tr-xl" : "rounded-xl"
      }`}
    >
      <audio ref={audioRef} src="/click-sound.mp3" />
     
      <motion.div
        className="absolute block h-1 w-10 bg-white"
        style={{
          transform: active ? "rotate(45deg)" : "rotate(0deg)",
          top: "50%",
          left: "50%",
          transformOrigin: "center",
        }}
      />
      
      <motion.div
        className="absolute block h-1 w-10 bg-white"
        style={{
          transform: active ? "rotate(-45deg)" : "rotate(0deg)",
          top: "50%",
          left: "50%",
          transformOrigin: "center",
        }}
      />
    </motion.button>
  );
};

const FooterCTAs = () => {
  return (
    <div className="absolute bottom-6 left-6 flex gap-4 md:flex-col">
      {SOCIAL_CTAS.map((cta, idx) => (
        <motion.a
          key={idx}
          href={cta.href}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="text-xl text-white transition-colors hover:text-violet-300"
        >
          {cta.Component && <cta.Component />} {/* Ensure Component is defined */}
        </motion.a>
      ))}
    </div>
  );
};


const LINKS = [
  { title: "home", href: "/" },
  {title: "skills", href: "/skills"},
  { title: "features", href: "#" },
  { title: "blog", href: "#" },
  { title: "careers", href: "#" },
];

const SOCIAL_CTAS = [
  { Component: SiTwitter, href: "#" },
  { Component: SiInstagram, href: "#" },
  { Component: SiLinkedin, href: "#" },
  { Component: SiYoutube, href: "#" },
];

export default Example;
