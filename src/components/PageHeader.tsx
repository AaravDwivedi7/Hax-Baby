import React from 'react';
import { Sparkles, Wand2, ArrowLeft, Compass, ChevronRight, Layers } from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';
import { TRANSITION_PRESETS, TransitionMode } from '../utils/transitionStyles';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  chamberNumber: string;
  badge: string;
  icon?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  chamberNumber,
  badge,
  icon,
}) => {
  const { transitionMode, setTransitionMode, navigateWithMorph } = usePageTransition();

  const modes: TransitionMode[] = ['celestial', 'liquid', 'warp', 'origami'];

  return (
    <div className="relative pt-8 pb-10 px-4 sm:px-6 bg-gradient-to-b from-[#fdf6ec]/80 to-transparent dark:from-[#252042]/70 dark:to-transparent border-b border-[#f0dfcf]/60 dark:border-[#43395c]/60">
      <div className="max-w-6xl mx-auto">
        {/* Top breadcrumb & quick back */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 text-xs font-medium text-[#9c8278] dark:text-[#a69bb8]">
            <button
              onClick={() => navigateWithMorph('/', 'Grand Foyer')}
              className="hover:text-[#a34063] dark:hover:text-[#dba7b9] flex items-center gap-1 transition-colors group cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Observatory Foyer</span>
            </button>
            <ChevronRight className="w-3 h-3 opacity-50" />
            <span className="text-[#a34063] dark:text-[#dba7b9] font-semibold">{chamberNumber}</span>
          </div>

          {/* Morph Style Selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/80 dark:bg-[#302847]/80 backdrop-blur-sm border border-[#f0dfcf] dark:border-[#43395c] shadow-2xs">
            <span className="text-[11px] font-semibold text-[#6e544b] dark:text-[#dcd2ea] px-2 flex items-center gap-1">
              <Layers className="w-3 h-3 text-[#f5c96a]" />
              <span className="hidden sm:inline">Morph Effect:</span>
            </span>
            {modes.map((m) => {
              const active = transitionMode === m;
              const preset = TRANSITION_PRESETS[m];
              return (
                <button
                  key={m}
                  onClick={() => setTransitionMode(m)}
                  title={`${preset.name}: ${preset.description}`}
                  className={`px-2 py-1 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                    active
                      ? 'bg-[#a34063] text-white shadow-[0_0_10px_rgba(163,64,99,0.4)] scale-105'
                      : 'text-[#6e544b] dark:text-[#dcd2ea] hover:bg-[#f4d7df]/50 dark:hover:bg-[#43395c]'
                  }`}
                >
                  <span>{preset.icon}</span>
                  <span className="text-[11px] hidden md:inline">{preset.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f4d7df]/60 dark:bg-[#3d3257] text-[#a34063] dark:text-[#dba7b9] text-xs font-semibold tracking-wide uppercase mb-3 border border-[#f0dfcf] dark:border-[#4f436e]">
              <Sparkles className="w-3.5 h-3.5 text-[#f5c96a]" />
              <span>{badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#402c25] dark:text-[#fcf8f2] font-editorial leading-tight">
              {title}
            </h1>
            <p className="mt-2.5 text-base sm:text-lg text-[#6e544b] dark:text-[#dcd2ea] leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Large decorative chamber icon badge */}
          {icon && (
            <div className="shrink-0 p-4 rounded-3xl bg-gradient-to-br from-white/90 to-[#fdf6ec] dark:from-[#302847] dark:to-[#252042] border border-[#f0dfcf] dark:border-[#43395c] shadow-md flex items-center justify-center self-start md:self-center">
              {icon}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
