import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useReducedMotion } from 'framer-motion';

import { useTheme } from '../context/ThemeContext';

export const CursorFollower: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer ring
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse/trackpad), not touch screens
    if (typeof window !== 'undefined') {
      const finePointer = window.matchMedia('(pointer: fine)').matches;
      if (!finePointer) {
        setIsTouchDevice(true);
        return;
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Track hover over interactive targets (links, buttons, inputs)
    const handleElementMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, input, textarea, select, [role="button"], label, .interactive-cursor');
      if (interactive) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleElementMouseOver, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleElementMouseOver);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isVisible, mouseX, mouseY]);

  // Don't render for touch devices or users who prefer reduced motion
  if (isTouchDevice || shouldReduceMotion) {
    return null;
  }

  return (
    <>
      {/* Outer ambient follower ring */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border transition-colors duration-200"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 52 : isClicking ? 26 : 34,
          height: isHovered ? 52 : isClicking ? 26 : 34,
          opacity: isVisible ? (isHovered ? 0.9 : 0.6) : 0,
          borderColor: isHovered
            ? '#2196F3'
            : isLight
              ? 'rgba(240, 68, 91, 0.7)'
              : 'rgba(240, 68, 91, 0.45)',
          backgroundColor: isHovered
            ? isLight
              ? 'rgba(33, 150, 243, 0.12)'
              : 'rgba(33, 150, 243, 0.08)'
            : isLight
              ? 'rgba(33, 150, 243, 0.04)'
              : 'rgba(33, 150, 243, 0.02)',
          boxShadow: isHovered
            ? isLight
              ? '0 0 16px rgba(33, 150, 243, 0.3), inset 0 0 8px rgba(240, 68, 91, 0.15)'
              : '0 0 20px rgba(33, 150, 243, 0.25), inset 0 0 10px rgba(240, 68, 91, 0.15)'
            : '0 0 10px rgba(33, 150, 243, 0.1)',
        }}
        transition={{
          width: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
          height: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.15 },
          borderColor: { duration: 0.2 },
          backgroundColor: { duration: 0.2 },
        }}
      />

      {/* Inner pinpoint dot */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-gradient-to-r from-[#2196F3] to-[#F0445B]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 8 : isClicking ? 4 : 6,
          height: isHovered ? 8 : isClicking ? 4 : 6,
          opacity: isVisible ? 0.9 : 0,
          scale: isClicking ? 0.7 : 1,
        }}
        transition={{
          width: { duration: 0.15 },
          height: { duration: 0.15 },
          opacity: { duration: 0.15 },
        }}
      />
    </>
  );
};
