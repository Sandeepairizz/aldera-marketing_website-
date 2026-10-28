'use client';

import React from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion features={domAnimation} strict>
      {/* Route Wipe Transition Layer */}
      <AnimatePresence mode="wait">
        <m.div
          key="page-wipe"
          initial={{ clipPath: 'inset(0 0 0 0)' }}
          animate={{ clipPath: 'inset(0 0 100% 0)' }}
          exit={{ clipPath: 'inset(100% 0 0 0)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 bg-onyx z-[9995] pointer-events-none"
        />
      </AnimatePresence>
      <m.div
        initial={{ opacity: 0.95 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.95 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
