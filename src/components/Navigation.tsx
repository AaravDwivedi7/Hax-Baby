import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { Volume2, VolumeX, Moon, Sun, Wand2, Menu, X, Star, Sparkles, Compass } from 'lucide-react';
import { playUiChime } from '../utils/soundEffects';
import { usePageTransition } from '../context/TransitionContext';
import { OBSERVATORY_CHAMBERS } from './ChamberPortalsNav';

interface NavigationProps {
  isDark: boolean;
  onToggleTheme: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isChaos: boolean;
  onToggleChaos: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  isDark,
  onToggleTheme,
  isMuted,
  onToggleMute,
  isChaos,
  onToggleChaos,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();
  const { navigateWithMorph } = usePageTransition();

  const handleNavClick = (path: string, name: string) => {
    setMobileMenuOpen(false);
    navigateWithMorph(path, name);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fff8f1]/90 dark:bg-[#201d39]/90 backdrop-blur-md border-b border-[#f0dfcf] dark:border-[#43395c] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text wordmark with playful morph tilt */}
        <button
          onClick={() => handleNavClick('/', 'Grand Foyer')}
          className="group text-lg sm:text-xl font-bold tracking-tight text-[#a34063] dark:text-[#dba7b9] font-editorial whitespace-nowrap shrink-0 flex items-center gap-2 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <span className="p-1.5 rounded-xl bg-[#f4d7df]/50 dark:bg-[#302847] text-[#f5c96a] group-hover:rotate-12 group-hover:scale-110 shadow-2xs group-hover:shadow-[0_0_12px_rgba(245,201,106,0.5)] transition-all duration-300">
            <Sparkles className="w-4 h-4 fill-current" />
          </span>
          <span className="group-hover:tracking-wide transition-all duration-300">
            Pip's Observatory
          </span>
        </button>

        {/* Zone 2: Real Hyperlinked Navigation Tabs with Alive Hover States & Active Indicator */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-1 text-sm font-medium relative"
        >
          {OBSERVATORY_CHAMBERS.map((chamber) => {
            const isHovered = hoveredLink === chamber.path;
            const isActive = location.pathname === chamber.path;

            return (
              <button
                key={chamber.path}
                onClick={() => handleNavClick(chamber.path, chamber.name)}
                onMouseEnter={() => setHoveredLink(chamber.path)}
                onMouseLeave={() => setHoveredLink(null)}
                className={`relative px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer flex items-center gap-1.5 select-none ${
                  isActive
                    ? 'text-[#a34063] dark:text-[#f5c96a] font-bold'
                    : 'text-[#6e544b] dark:text-[#dcd2ea] hover:text-[#a34063] dark:hover:text-[#fcf8f2]'
                }`}
              >
                {/* Active Section Background Pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 32,
                    }}
                    className="absolute inset-0 bg-[#f4d7df]/70 dark:bg-[#3d3257] rounded-2xl -z-10 border border-[#f0dfcf]/80 dark:border-[#4f436e] shadow-2xs"
                  />
                )}

                {/* Hover Soft Transform Halo (Alive state) */}
                {isHovered && !isActive && (
                  <motion.div
                    layoutId="hoverNavPill"
                    transition={{
                      type: 'spring',
                      stiffness: 450,
                      damping: 35,
                    }}
                    className="absolute inset-0 bg-white/60 dark:bg-[#302847]/60 rounded-2xl -z-10 border border-[#f0dfcf]/40 dark:border-[#43395c]/50 shadow-2xs"
                  />
                )}

                {/* Animated micro-twinkling star when hovered or active */}
                {(isActive || isHovered) && (
                  <motion.span
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="text-[#f5c96a]"
                  >
                    <Star className="w-3 h-3 fill-current" />
                  </motion.span>
                )}

                <span className="transition-transform duration-200 group-hover:scale-105">
                  {chamber.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Global Controls */}
        <div className="flex items-center gap-2">
          {/* Audio Mute/Unmute */}
          <button
            onClick={() => {
              playUiChime(isMuted);
              onToggleMute();
            }}
            aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            className="p-2 rounded-xl text-[#6e544b] dark:text-[#dcd2ea] hover:bg-[#f4d7df]/50 dark:hover:bg-[#302847] hover:text-[#a34063] dark:hover:text-[#fcf8f2] transition-all duration-200 cursor-pointer active:scale-95"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#f5c96a]" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              playUiChime(isMuted);
              onToggleTheme();
            }}
            aria-label={isDark ? 'Switch to daylight theme' : 'Switch to bedtime theme'}
            className="p-2 rounded-xl text-[#6e544b] dark:text-[#dcd2ea] hover:bg-[#f4d7df]/50 dark:hover:bg-[#302847] hover:text-[#a34063] dark:hover:text-[#fcf8f2] transition-all duration-200 cursor-pointer active:scale-95"
          >
            {isDark ? <Sun className="w-4 h-4 text-[#f5c96a]" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-xl text-[#6e544b] dark:text-[#dcd2ea] hover:bg-[#f4d7df]/50 dark:hover:bg-[#302847] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-[#f0dfcf] dark:border-[#43395c] bg-[#fff8f1] dark:bg-[#201d39] px-4 py-4 space-y-1.5 shadow-xl"
          >
            <div className="text-[11px] font-bold text-[#9c8278] dark:text-[#a69bb8] uppercase px-3 py-1">
              Select Observatory Chamber:
            </div>
            {OBSERVATORY_CHAMBERS.map((chamber) => {
              const isActive = location.pathname === chamber.path;
              return (
                <button
                  key={chamber.path}
                  onClick={() => handleNavClick(chamber.path, chamber.name)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-[#a34063] text-white font-bold'
                      : 'text-[#402c25] dark:text-[#fcf8f2] hover:bg-[#f4d7df]/40 dark:hover:bg-[#302847]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs opacity-75">{chamber.chamberNumber}</span>
                    <span>{chamber.name}</span>
                  </div>
                  {isActive && <Sparkles className="w-4 h-4 text-[#f5c96a]" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
