import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, Sparkles, Star, Wand2, Compass } from 'lucide-react';
import { playUiChime } from '../utils/soundEffects';
import { usePageTransition } from '../context/TransitionContext';
import { Pip3DModel } from './Pip3DModel';

interface HeroProps {
  isMuted: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isMuted }) => {
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { navigateWithMorph } = usePageTransition();

  // Subtle pupil tracking on desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    // Clamp to max 5px movement
    const clampedX = Math.max(-5, Math.min(5, deltaX * 5));
    const clampedY = Math.max(-4, Math.min(4, deltaY * 4));

    setPupilOffset({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = () => {
    setPupilOffset({ x: 0, y: 0 });
  };

  const [displayMode, setDisplayMode] = useState<'3d' | 'art'>('3d');

  // Occasional gentle sleepy blink
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 240);
    }, 6500);
    return () => clearInterval(blinkInterval);
  }, []);

  const navigateToChamber = (path: string, name: string) => {
    playUiChime(isMuted);
    navigateWithMorph(path, name);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden transition-colors"
      aria-label="Welcome and Introduction"
    >
      {/* Decorative ambient background stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <span className="absolute top-8 left-[10%] text-[#f5c96a] opacity-40 star-twinkle text-lg">✦</span>
        <span className="absolute top-24 right-[14%] text-[#dba7b9] opacity-35 star-twinkle text-sm" style={{ animationDelay: '1.2s' }}>✧</span>
        <span className="absolute top-64 left-[6%] text-[#c7b6df] opacity-30 star-twinkle text-xs" style={{ animationDelay: '2.1s' }}>✦</span>
        <span className="absolute bottom-16 right-[8%] text-[#f5c96a] opacity-45 star-twinkle text-base" style={{ animationDelay: '0.8s' }}>✦</span>
        <span className="absolute bottom-28 left-[35%] text-[#dba7b9] opacity-25 star-twinkle text-xs" style={{ animationDelay: '1.7s' }}>✧</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold tracking-wider text-[#a34063] dark:text-[#dba7b9] uppercase">
              <Sparkles className="w-4 h-4 text-[#f5c96a]" aria-hidden="true" />
              <span>MIDNIGHT NURSERY · EST. AFTER BEDTIME</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2] leading-[1.15] tracking-tight mb-5 text-balance">
              Every little dream deserves a little light.
            </h1>

            {/* Supporting Lead Copy */}
            <p className="text-sm sm:text-base text-[#6e544b] dark:text-[#dcd2ea] leading-relaxed max-w-xl mb-6 font-sans">
              Hello, dreamer. I'm <strong className="font-semibold text-[#a34063] dark:text-[#f5c96a]">Pip</strong>, Junior Dream Engineer at Midnight Nursery. I make lullabies, lanterns, and little adventures for creatures who aren't quite ready to sleep.
            </p>

            {/* CTAs with alive transforms & unreal morph navigation */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigateToChamber('/projects', 'Nocturnal Inventions Lab')}
                className="px-5 py-3 rounded-2xl font-medium text-xs sm:text-sm text-white bg-[#a34063] hover:bg-[#8f3454] dark:bg-[#a34063] dark:hover:bg-[#8f3454] shadow-md hover:shadow-xl hover:shadow-[#a34063]/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 whitespace-nowrap group cursor-pointer"
              >
                <span>Explore Inventions</span>
                <Sparkles className="w-3.5 h-3.5 text-[#f5c96a] group-hover:rotate-12 group-hover:scale-125 transition-transform duration-300" aria-hidden="true" />
              </button>

              <button
                onClick={() => navigateToChamber('/community', 'Live Dream Guestbook')}
                className="px-5 py-3 rounded-2xl font-medium text-xs sm:text-sm text-[#a34063] dark:text-[#f5c96a] bg-[#f4d7df]/50 dark:bg-[#302847] border border-[#dba7b9]/60 dark:border-[#f5c96a]/40 hover:bg-[#f4d7df] dark:hover:bg-[#3d3257] hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 whitespace-nowrap group cursor-pointer"
              >
                <span>Leave a Wish</span>
              </button>

              <button
                onClick={() => navigateToChamber('/lore', "Pip's Lore & Origins")}
                className="px-4 py-3 rounded-2xl font-medium text-xs sm:text-sm text-[#5c4033] dark:text-[#fcf8f2] bg-[#ffffff] dark:bg-[#302847] border border-[#f0dfcf] dark:border-[#43395c] hover:bg-[#fef4e8] dark:hover:bg-[#392f50] shadow-2xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer"
              >
                Meet Pip
              </button>
            </div>

            {/* Badge & Handwritten note */}
            <div className="mt-6 pt-5 border-t border-[#f0dfcf] dark:border-[#43395c] w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#9c8278] dark:text-[#a69bb8]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#f5c96a] shrink-0" aria-hidden="true"></span>
                <span>Midnight Shift: Warm tea brewed & ready</span>
              </div>
              <span className="font-display italic text-[#a34063] dark:text-[#dba7b9]">
                “Starlight makes the best lullaby tuner.”
              </span>
            </div>
          </div>

          {/* Right Column: Prominent Interactive Pip 3D WebGL / Three.js Model */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            {/* View Switcher Controls */}
            <div className="mb-3 flex items-center gap-1.5 p-1 rounded-2xl bg-white/90 dark:bg-[#28213d]/90 border border-[#f0dfcf] dark:border-[#43395c] shadow-xs z-20">
              <button
                onClick={() => {
                  playUiChime(isMuted);
                  setDisplayMode('3d');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  displayMode === '3d'
                    ? 'bg-[#a34063] text-white shadow-xs'
                    : 'text-[#6e544b] dark:text-[#dcd2ea] hover:bg-[#f4d7df]/50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#f5c96a]" />
                <span>3D WebGL Character</span>
              </button>

              <button
                onClick={() => {
                  playUiChime(isMuted);
                  setDisplayMode('art');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  displayMode === 'art'
                    ? 'bg-[#a34063] text-white shadow-xs'
                    : 'text-[#6e544b] dark:text-[#dcd2ea] hover:bg-[#f4d7df]/50'
                }`}
              >
                <span>Storybook Art</span>
              </button>
            </div>

            {/* Display Container */}
            {displayMode === '3d' ? (
              <div className="w-full max-w-[440px]">
                <Pip3DModel isMuted={isMuted} />
              </div>
            ) : (
              <div className="relative w-full max-w-[380px] aspect-square flex items-center justify-center">
                {/* Outer cosmic fluid morphing aura */}
                <div
                  className="absolute inset-0 rounded-[62%_38%_54%_46%/44%_59%_41%_56%] bg-gradient-to-tr from-[#f4d7df]/80 via-[#f5c96a]/35 to-[#c7b6df]/60 dark:from-[#392f50] dark:via-[#f5c96a]/25 dark:to-[#43395c] blur-3xl transform -translate-y-2 animate-blob-morph pointer-events-none"
                  aria-hidden="true"
                />

                {/* Inner crescent morphing dream cocoon */}
                <div
                  className="absolute inset-6 rounded-[72%_28%_28%_72%/62%_38%_62%_38%] bg-gradient-to-br from-[#fff8f1]/90 via-[#fcf1d8]/70 to-[#dba7b9]/40 dark:from-[#302847]/80 dark:via-[#3d3428]/60 dark:to-[#473859]/50 filter blur-xl animate-crescent-morph pointer-events-none"
                  aria-hidden="true"
                />

                {/* Pip floating cloud container with hover reaction */}
                <div className="relative z-10 w-full h-full flex items-center justify-center animate-cozy-float hover:scale-105 transition-transform duration-500 ease-out cursor-pointer">
                  <img
                    src="/assets/pip_avatar_cloud.png"
                    alt="Pip the friendly Skull Baby wearing a nightcap decorated with stars and a pink bow, floating cozily on a soft cloud"
                    className="w-full h-full object-contain filter drop-shadow-2xl"
                    width="380"
                    height="380"
                    loading="lazy"
                  />

                  {/* Pupil tracking */}
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      top: '41.5%',
                      left: '42.5%',
                      width: '32px',
                      height: '24px',
                      opacity: isBlinking ? 0.05 : 1,
                      transition: 'opacity 0.15s ease',
                    }}
                    aria-hidden="true"
                  >
                    <span
                      className="absolute w-2.5 h-2.5 rounded-full bg-[#f5c96a] shadow-[0_0_8px_#f5c96a]"
                      style={{
                        left: '2px',
                        top: '6px',
                        transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
                        transition: 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                    <span
                      className="absolute w-2.5 h-2.5 rounded-full bg-[#f5c96a] shadow-[0_0_8px_#f5c96a]"
                      style={{
                        right: '2px',
                        top: '6px',
                        transform: `translate(${pupilOffset.x}px, ${pupilOffset.y}px)`,
                        transition: 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                  </div>
                </div>

                {/* Credential badge */}
                <div
                  className="absolute -bottom-2 -left-2 bg-[#ffffff] dark:bg-[#302847] py-2 px-3.5 rounded-xl border border-[#f0dfcf] dark:border-[#43395c] shadow-md z-20 flex items-center gap-2 transform -rotate-2"
                >
                  <Star className="w-3.5 h-3.5 text-[#f5c96a] fill-[#f5c96a]" aria-hidden="true" />
                  <span className="text-xs font-display font-medium text-[#5c4033] dark:text-[#fcf8f2]">
                    Junior Dream Engineer · Badge #007
                  </span>
                </div>
              </div>
            )}

            {/* Scroll cue */}
            <div className="mt-4 flex items-center justify-center">
              <button
                onClick={() => {
                  const elem = document.getElementById('chambers-gateway');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="Scroll down to explore chambers"
                className="flex items-center gap-1.5 text-xs text-[#9c8278] dark:text-[#a69bb8] hover:text-[#a34063] dark:hover:text-[#f5c96a] transition-colors group cursor-pointer"
              >
                <span>Scroll to explore chambers</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
