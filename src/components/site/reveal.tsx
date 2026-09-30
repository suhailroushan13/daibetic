'use client';

import type { ReactNode } from 'react';
import { motion, MotionConfig } from 'motion/react';

/** Fades and slides content in once it scrolls into view. Respects reduced-motion settings. */
export function Reveal({ children, delay = 0, y = 18, className, as = 'div' }: { children: ReactNode; delay?: number; y?: number; className?: string; as?: 'div' | 'li' | 'section' | 'article' }) {
  const Cmp = motion[as];
  return (
    <MotionConfig reducedMotion="user">
      <Cmp
        className={className}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </Cmp>
    </MotionConfig>
  );
}

/** A grid or list whose direct children animate in one after another. */
export function Stagger({ children, className, stagger = 0.07 }: { children: ReactNode; className?: string; stagger?: number }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}>
      {children}
    </motion.div>
  );
}
