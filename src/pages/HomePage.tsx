import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { ShapeDivider } from '../components/ShapeDivider';
import { ChamberPortalsNav, OBSERVATORY_CHAMBERS } from '../components/ChamberPortalsNav';
import { PageTransitionWrapper } from '../components/PageTransitionWrapper';
import { usePageTransition } from '../context/TransitionContext';
import { Sparkles, Moon, Wand2, Compass, Music, BookOpen, Star, ShieldCheck, ArrowRight, Heart } from 'lucide-react';

interface HomePageProps {
  isMuted: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ isMuted }) => {
  const { navigateWithMorph } = usePageTransition();
  const [activeTab, setActiveTab] = useState<'welcome' | 'status' | 'hax'>('welcome');

  return (
    <PageTransitionWrapper pageId="home-page">
      {/* 1. Grand Hero Entrance with interactive Pip */}
      <Hero isMuted={isMuted} />

      {/* Cloud Shape Divider */}
      <ShapeDivider variant="clouds" />

      {/* 2. Observatory Live Status Board & Quick Chamber Gateways */}
      <section className="py-12 md:py-16 px-4 sm:px-6 bg-[#fdf6ec]/80 dark:bg-[#1f1b36] border-y border-[#f0dfcf] dark:border-[#43395c] transition-colors">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4d7df]/70 dark:bg-[#302847] text-[#a34063] dark:text-[#dba7b9] text-xs font-semibold uppercase tracking-wider mb-2 border border-[#f0dfcf] dark:border-[#43395c]">
                <Sparkles className="w-3.5 h-3.5 text-[#f5c96a]" />
                <span>Observatory Operations · Sector 7</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2]">
                Nightly Telemetry & Chamber Wings
              </h2>
              <p className="text-sm sm:text-base text-[#6e544b] dark:text-[#dcd2ea] mt-1">
                Select an observatory wing below to trigger an unreal shape-morphing transition across dimensions.
              </p>
            </div>

            {/* Quick Status Pill */}
            <div className="flex items-center gap-3 p-2 rounded-2xl bg-white dark:bg-[#28213d] border border-[#f0dfcf] dark:border-[#43395c] shadow-xs">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f5c96a] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#f5c96a]"></span>
              </span>
              <span className="text-xs font-semibold text-[#6e544b] dark:text-[#dcd2ea]">
                Lullaby Frequency: <span className="text-[#a34063] dark:text-[#f5c96a]">432 Hz Warm Pure</span>
              </span>
            </div>
          </div>

          {/* 4 Telemetry Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="p-5 rounded-2xl bg-white/90 dark:bg-[#28213d]/90 border border-[#f0dfcf] dark:border-[#43395c] shadow-xs">
              <div className="text-xs text-[#9c8278] dark:text-[#a69bb8] font-medium flex items-center gap-1.5 mb-1">
                <Moon className="w-3.5 h-3.5 text-[#f5c96a]" />
                <span>Lunar Phase</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-[#402c25] dark:text-[#fcf8f2] font-editorial">
                Waxing Crescent 78%
              </div>
              <div className="text-[11px] text-[#6e544b] dark:text-[#dcd2ea] mt-1">
                Optimal for starlight lullabies
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/90 dark:bg-[#28213d]/90 border border-[#f0dfcf] dark:border-[#43395c] shadow-xs">
              <div className="text-xs text-[#9c8278] dark:text-[#a69bb8] font-medium flex items-center gap-1.5 mb-1">
                <Wand2 className="w-3.5 h-3.5 text-[#dba7b9]" />
                <span>Dream Matter</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-[#402c25] dark:text-[#fcf8f2] font-editorial">
                6 Fluid Geometries
              </div>
              <div className="text-[11px] text-[#6e544b] dark:text-[#dcd2ea] mt-1">
                Ready in Shape Shaper
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/90 dark:bg-[#28213d]/90 border border-[#f0dfcf] dark:border-[#43395c] shadow-xs">
              <div className="text-xs text-[#9c8278] dark:text-[#a69bb8] font-medium flex items-center gap-1.5 mb-1">
                <Music className="w-3.5 h-3.5 text-[#99e1d9]" />
                <span>Active Synthesizer</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-[#402c25] dark:text-[#fcf8f2] font-editorial">
                BPM 60 Slumber
              </div>
              <div className="text-[11px] text-[#6e544b] dark:text-[#dcd2ea] mt-1">
                Baby heart-rate sync
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/90 dark:bg-[#28213d]/90 border border-[#f0dfcf] dark:border-[#43395c] shadow-xs">
              <div className="text-xs text-[#9c8278] dark:text-[#a69bb8] font-medium flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#f5c96a]" />
                <span>Hackathon Status</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-[#402c25] dark:text-[#fcf8f2] font-editorial">
                haX.baby Verified
              </div>
              <div className="text-[11px] text-[#6e544b] dark:text-[#dcd2ea] mt-1">
                Zero autoplay, 100% accessible
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slumber Waves Shape Divider */}
      <ShapeDivider variant="waves" />

      {/* 3. The 5 Portal Chamber Gateways with Hyperlinked Unreal Morph Transitions */}
      <ChamberPortalsNav
        currentPath="/"
        title="Step Into the Observatory Chambers"
        subtitle="Each chamber is an independent interactive world hyperlinked with unreal SVG morph transitions."
      />

      {/* Constellations Divider */}
      <ShapeDivider variant="constellations" />

      {/* 4. Pip's Observatory Manifesto */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-[#fff8f1] dark:bg-[#201d39] transition-colors">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex p-3 rounded-full bg-[#f4d7df]/60 dark:bg-[#302847] text-[#a34063] dark:text-[#dba7b9] mb-4">
            <Heart className="w-6 h-6 fill-current text-[#dba7b9]" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2] mb-4">
            “When the world is too loud, we build a softer sky.”
          </h2>
          <p className="text-base sm:text-lg text-[#6e544b] dark:text-[#dcd2ea] leading-relaxed max-w-2xl mx-auto mb-8 font-sans">
            Created for <strong className="text-[#a34063] dark:text-[#f5c96a]">haX.baby 2026</strong>. Pip’s Midnight Observatory combines gentle sensory acoustics, warm visual comfort, and tactile digital toy design for infants, toddlers, and weary parents.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigateWithMorph('/lore', "Pip's Lore & Origins", 'liquid')}
              className="px-6 py-3 rounded-2xl bg-[#a34063] text-white text-sm font-semibold shadow-md hover:bg-[#8f3454] transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>Read Pip's Origin Story</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigateWithMorph('/dream-shaper', 'Dream Matter Shaper', 'celestial')}
              className="px-6 py-3 rounded-2xl bg-[#f4d7df]/60 dark:bg-[#302847] border border-[#dba7b9]/60 dark:border-[#43395c] text-[#a34063] dark:text-[#f5c96a] text-sm font-semibold hover:bg-[#f4d7df] transition-all flex items-center gap-2 cursor-pointer group"
            >
              <Wand2 className="w-4 h-4 text-[#f5c96a]" />
              <span>Experiment in Shape Shaper</span>
            </button>
          </div>
        </div>
      </section>
    </PageTransitionWrapper>
  );
};
