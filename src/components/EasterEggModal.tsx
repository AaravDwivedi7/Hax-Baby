import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Star, Award, X, RotateCcw } from 'lucide-react';
import { playMagicChime } from '../utils/soundEffects';

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMuted: boolean;
}

export const EasterEggModal: React.FC<EasterEggModalProps> = ({ isOpen, onClose, isMuted }) => {
  useEffect(() => {
    if (isOpen) {
      playMagicChime(isMuted);

      // Check prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        // Fire a gentle celestial star confetti burst
        try {
          confetti({
            particleCount: 45,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#f5c96a', '#dba7b9', '#a34063', '#fff8f1', '#c7b6df'],
            disableForReducedMotion: true,
          });
        } catch {
          // Fallback if canvas-confetti is unavailable
        }
      }
    }
  }, [isOpen, isMuted]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="easter-egg-title"
      aria-describedby="easter-egg-desc"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="w-full max-w-md bg-[#fff8f1] dark:bg-[#302847] rounded-3xl p-6 sm:p-8 border-2 border-[#f5c96a] shadow-2xl relative text-center transform scale-100 transition-all"
        style={{
          boxShadow: '0 0 40px rgba(245, 201, 106, 0.45)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close secret star dialog"
          className="absolute top-4 right-4 p-2 rounded-xl text-[#9c8278] dark:text-[#a69bb8] hover:bg-[#f4d7df]/50 dark:hover:bg-[#392f50] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Glowing Star Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-[#fcf1d8] dark:bg-[#3d3428] border-2 border-[#f5c96a] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(245,201,106,0.6)] animate-bounce">
          <Star className="w-8 h-8 text-[#f5c96a] fill-[#f5c96a]" aria-hidden="true" />
        </div>

        {/* Live announcement region for screen readers */}
        <div aria-live="polite" className="sr-only">
          Secret Easter Egg found! Pip says you are officially a Dream Detective.
        </div>

        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#a34063] dark:text-[#dba7b9] mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#f5c96a]" />
          <span>Secret Nursery Discovery</span>
          <Sparkles className="w-3.5 h-3.5 text-[#f5c96a]" />
        </div>

        <h3
          id="easter-egg-title"
          className="text-2xl font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2] mb-3"
        >
          Dream Detective Badge Awarded!
        </h3>

        {/* Pip's secret message */}
        <div
          id="easter-egg-desc"
          className="p-4 rounded-2xl bg-[#ffffff] dark:bg-[#28213d] border border-[#f0dfcf] dark:border-[#43395c] text-sm text-[#5c4033] dark:text-[#fcf8f2] font-display italic leading-relaxed mb-6"
        >
          “You found the tiniest star in the whole nursery. Pip says you're officially a Dream Detective!”
        </div>

        {/* Badge metadata */}
        <div className="flex items-center justify-center gap-3 text-xs text-[#6e544b] dark:text-[#dcd2ea] mb-6">
          <div className="flex items-center gap-1.5 bg-[#f4d7df]/40 dark:bg-[#392f50] px-3 py-1 rounded-lg">
            <Award className="w-3.5 h-3.5 text-[#a34063] dark:text-[#dba7b9]" />
            <span>Rank: Senior Dream Scout</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#fcf1d8] dark:bg-[#3d3428] px-3 py-1 rounded-lg text-[#916b15] dark:text-[#f5c96a]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Stardust Clearance: 100%</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              // Replay confetti and chime
              playMagicChime(isMuted);
              try {
                confetti({
                  particleCount: 30,
                  spread: 50,
                  origin: { y: 0.6 },
                  colors: ['#f5c96a', '#dba7b9', '#a34063'],
                });
              } catch {}
            }}
            className="flex-1 py-3 px-4 rounded-xl text-xs font-medium text-[#6e544b] dark:text-[#dcd2ea] bg-[#fff8f1] dark:bg-[#28213d] border border-[#f0dfcf] dark:border-[#43395c] hover:bg-[#f4d7df]/30 transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay Starlight</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl text-xs font-medium text-white bg-[#a34063] hover:bg-[#8f3454] transition-all shadow-md font-semibold"
          >
            Thank You, Pip!
          </button>
        </div>
      </div>
    </div>
  );
};
