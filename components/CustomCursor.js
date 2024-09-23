import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailRef = useRef([]);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const trailLength = 7; // Reduced trail length for better performance
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#FFC300'];

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const trail = trailRef.current;

    const animateTrail = () => {
      for (let i = trail.length - 1; i >= 1; i--) {
        const previous = trail[i - 1].getBoundingClientRect();
        trail[i].style.transform = `translate(${previous.left}px, ${previous.top}px)`;
        trail[i].style.opacity = `${1 - i / trail.length}`; // Fading effect
        trail[i].style.width = `${12 - i}px`; // Size variation
        trail[i].style.height = `${12 - i}px`;
      }

      const latest = trail[0];
      latest.style.transform = `translate(${mouseX.get()}px, ${mouseY.get()}px)`;

      requestAnimationFrame(animateTrail);
    };

    if (trail.length === trailLength) {
      animateTrail();
    }
  }, [mouseX, mouseY]);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor"></div>
      {[...Array(trailLength)].map((_, i) => (
        <motion.div
          key={i}
          ref={(el) => {
            if (el) {
              trailRef.current[i] = el;
            }
          }}
          className="cursor-trail"
          style={{
            backgroundColor: colors[i % colors.length],
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
