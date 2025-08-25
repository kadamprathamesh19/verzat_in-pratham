import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import LogoFillAnimation from './LogoAnimation';

export default function SplashLoader({ onComplete }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done && typeof onComplete === 'function') {
      onComplete();
    }
  }, [done, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center bg-white z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="w-full h-[220px] relative mb-2">
            <Canvas camera={{ position: [0, 0, 8], fov: 70 }}>
              <LogoFillAnimation onComplete={() => setDone(true)} />
            </Canvas>
          </div>

          <div className="flex flex-col items-center justify-center text-blue-400">
            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
            <p className="mt-1 text-sm">Loading...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
