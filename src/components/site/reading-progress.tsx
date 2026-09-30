'use client';

import { motion, useScroll, useSpring } from 'motion/react';

/** A thin bar at the top of the page that fills as you read. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });
  return <motion.div aria-hidden="true" style={{ scaleX }} className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-brand" />;
}
