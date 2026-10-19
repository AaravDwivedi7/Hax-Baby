import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Compass } from 'lucide-react';
import { TRANSITION_PRESETS, TransitionMode, MORPH_SHAPES } from '../utils/transitionStyles';

interface CrazyPageTransitionOverlayProps {
  isTransitioning: boolean;
  targetPageName: string;
  mode: TransitionMode;
  onTransitionComplete?: () => void;
}

export const CrazyPageTransitionOverlay: React.FC<CrazyPageTransitionOverlayProps> = ({
  isTransitioning,
  targetPageName,
  mode,
  onTransitionComplete,
}) => {
  const preset = TRANSITION_PRESETS[mode] || TRANSITION_PRESETS.celestial;
  const [shapeIndex, setShapeIndex] = useState(0);

  // Cycle shapes rapidly during the transition to create an unreal morphing illusion
  useEffect(() => {
    if (!isTransitioning) {
      setShapeIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setShapeIndex((prev) => (prev + 1) % preset.morphSequence.length);
    }, 180);

    return () => clearInterval(interval);
  }, [isTransitioning, preset.morphSequence.length]);

  return (
    <AnimatePresence onExitComplete={onTransitionComplete}>
      {isTransitioning && (
        <motion.div
          key="crazy-transition-portal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center overflow-hidden"
          style={{
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Layer 1: Radial Dimensional Backdrop */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.4, 2], opacity: [0, 0.95, 0.9] }}
            exit={{ scale: [2, 2.5], opacity: [0.9, 0] }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-radial from-[#201d39]/95 via-[#1a1730]/90 to-[#0e0c1a]"
          />

          {/* Layer 2: Cosmic Hyperspace Star Streaks */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(24)].map((_, i) => {
              const angle = (i / 24) * 360;
              return (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0.2, 1.5, 0],
                    opacity: [0, 0.8, 0],
                    x: Math.cos((angle * Math.PI) / 180) * 600,
                    y: Math.sin((angle * Math.PI) / 180) * 600,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: (i % 6) * 0.04,
                    ease: 'easeOut',
                  }}
                  className="absolute left-1/2 top-1/2 w-1.5 h-16 origin-top rounded-full bg-gradient-to-b from-[#f5c96a] via-[#dba7b9] to-transparent shadow-[0_0_12px_#f5c96a]"
                  style={{
                    transform: `rotate(${angle + 90}deg)`,
                  }}
                />
              );
            })}
          </div>

          {/* Layer 3: Unreal Morphing SVG Portal Core */}
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
            {/* Morphing Outer Stardust Halo */}
            <motion.svg
              viewBox="0 0 200 200"
              initial={{ scale: 0.1, rotate: -45 }}
              animate={{
                scale: [0.2, 1.3, 1.8, 2.8],
                rotate: [0, 90, 180, 270],
              }}
              exit={{ scale: [2.8, 4.5], opacity: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full drop-shadow-[0_0_35px_rgba(245,201,106,0.65)]"
            >
              <defs>
                <linearGradient id="portalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f5c96a" stopOpacity="0.85" />
                  <stop offset="40%" stopColor="#dba7b9" stopOpacity="0.9" />
                  <stop offset="80%" stopColor="#a34063" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#99e1d9" stopOpacity="0.8" />
                </linearGradient>
                <filter id="portalGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <motion.path
                key={`portal-path-${shapeIndex}`}
                d={preset.morphSequence[shapeIndex] || MORPH_SHAPES.star}
                fill="url(#portalGrad)"
                filter="url(#portalGlow)"
                initial={{ opacity: 0.8, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.7 }}
                transition={{
                  duration: 0.18,
                  ease: 'easeOut',
                }}
              />
            </motion.svg>

            {/* Inner Concentric Counter-Rotating Geometric Ring */}
            <motion.svg
              viewBox="0 0 200 200"
              initial={{ scale: 0.1, rotate: 60 }}
              animate={{
                scale: [0.1, 1.1, 1.4, 2.2],
                rotate: [60, -60, -180],
              }}
              exit={{ scale: [2.2, 3.8], opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)]"
            >
              <path
                d={MORPH_SHAPES.crystal}
                fill="none"
                stroke="#fff8f1"
                strokeWidth="2.5"
                strokeDasharray="6 8"
                opacity="0.8"
              />
            </motion.svg>

            {/* Dimensional Gateway Badge & Title */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.15, opacity: 0, y: -15 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="relative z-10 text-center px-6 py-4 rounded-3xl bg-[#201d39]/80 backdrop-blur-xl border border-[#f5c96a]/40 shadow-[0_0_30px_rgba(245,201,106,0.3)] max-w-xs sm:max-w-sm"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5c96a]/20 text-[#f5c96a] text-xs font-semibold tracking-wider uppercase mb-1.5 border border-[#f5c96a]/30">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>{preset.name} Gateway</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-editorial text-white tracking-wide">
                Warping to {targetPageName}
              </h3>
              <p className="text-xs text-[#dcd2ea] mt-1 flex items-center justify-center gap-1.5">
                <Compass className="w-3 h-3 text-[#f5c96a]" />
                <span>Metamorphosing reality...</span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
