import React from 'react';
import { Sparkles, Heart, Moon, Volume2, VolumeX, ArrowUp } from 'lucide-react';
import { playUiChime } from '../utils/soundEffects';
import { usePageTransition } from '../context/TransitionContext';

interface FooterProps {
  isDark: boolean;
  onToggleTheme: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenEasterEgg: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  isDark,
  onToggleTheme,
  isMuted,
  onToggleMute,
  onOpenEasterEgg,
}) => {
  const { navigateWithMorph } = usePageTransition();

  const scrollToTop = () => {
    playUiChime(isMuted);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { name: 'Grand Foyer (Home)', path: '/', mode: 'celestial' as const },
    { name: 'About Pip & Bedtime Lore', path: '/lore', mode: 'liquid' as const },
    { name: 'Nocturnal Inventions Lab', path: '/projects', mode: 'warp' as const },
    { name: 'Dream Matter Shaper', path: '/dream-shaper', mode: 'celestial' as const },
    { name: 'Interactive Star Sky Dome', path: '/observatory', mode: 'warp' as const },
    { name: 'Sleep Logs & Cadet Certificates', path: '/community', mode: 'origami' as const },
  ];

  return (
    <footer className="bg-[#fff8f1] dark:bg-[#1a1730] border-t border-[#f0dfcf] dark:border-[#43395c] pt-14 pb-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand & Sign-off Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold font-editorial text-[#a34063] dark:text-[#dba7b9]">
                Pip's Midnight Observatory
              </span>
              <button
                onClick={onOpenEasterEgg}
                aria-label="Twinkling footer star (Easter egg)"
                className="text-[#f5c96a] hover:scale-125 transition-transform p-1 focus:outline-none cursor-pointer"
                title="A tiny twinkling star..."
              >
                <Sparkles className="w-4 h-4 text-[#f5c96a]" aria-hidden="true" />
              </button>
            </div>

            <p className="text-sm font-display italic text-[#5c4033] dark:text-[#fcf8f2] leading-relaxed">
              “Every little dream deserves a little light.”
            </p>

            <p className="text-xs text-[#6e544b] dark:text-[#dcd2ea] leading-relaxed max-w-sm">
              Engineered with warm tea, starlight wicks, and gentle melodies at Midnight Nursery Attic. Watching over sleepy creatures from twilight until morning porridge.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-xs font-semibold text-[#402c25] dark:text-[#fcf8f2] uppercase tracking-wider block mb-3">
              Chamber Directory
            </span>
            <ul className="space-y-2 text-xs text-[#6e544b] dark:text-[#dcd2ea]">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => navigateWithMorph(link.path, link.name, link.mode)}
                    className="hover:text-[#a34063] dark:hover:text-[#f5c96a] transition-colors cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span>✦</span>
                    <span>{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Controls & Quick Actions */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs font-semibold text-[#402c25] dark:text-[#fcf8f2] uppercase tracking-wider block">
              Preferences
            </span>
            <div className="flex flex-col gap-2">
              <button
                onClick={onToggleTheme}
                className="py-2 px-3 rounded-xl text-xs text-left bg-[#ffffff] dark:bg-[#302847] border border-[#f0dfcf] dark:border-[#43395c] text-[#6e544b] dark:text-[#dcd2ea] hover:bg-[#fef4e8] dark:hover:bg-[#392f50] flex items-center justify-between cursor-pointer"
              >
                <span>Theme: {isDark ? 'Night Sky' : 'Dream Cream'}</span>
                <Moon className="w-3.5 h-3.5 text-[#a34063] dark:text-[#f5c96a]" />
              </button>

              <button
                onClick={onToggleMute}
                className="py-2 px-3 rounded-xl text-xs text-left bg-[#ffffff] dark:bg-[#302847] border border-[#f0dfcf] dark:border-[#43395c] text-[#6e544b] dark:text-[#dcd2ea] hover:bg-[#fef4e8] dark:hover:bg-[#392f50] flex items-center justify-between cursor-pointer"
              >
                <span>Audio: {isMuted ? 'Muted' : 'Harmonic Chimes'}</span>
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 text-[#9c8278]" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-[#a34063] dark:text-[#f5c96a]" />
                )}
              </button>

              <button
                onClick={scrollToTop}
                aria-label="Scroll back to top of the observatory"
                className="py-2 px-3 rounded-xl text-xs text-left bg-[#ffffff] dark:bg-[#302847] border border-[#f0dfcf] dark:border-[#43395c] text-[#6e544b] dark:text-[#dcd2ea] hover:bg-[#fef4e8] dark:hover:bg-[#392f50] flex items-center justify-between group cursor-pointer"
              >
                <span>Back to Rafters</span>
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Attribution & Legal Notice */}
        <div className="pt-8 border-t border-[#f0dfcf] dark:border-[#43395c] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9c8278] dark:text-[#a69bb8]">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>Built with care for haX.baby · Baby's First Website Hackathon (October 17–19, 2026).</span>
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-[#a34063] fill-[#a34063]" aria-hidden="true" />
              <span>for dreamers everywhere</span>
            </span>
          </div>

          <div className="text-center sm:text-right">
            <span>Pip character canon & official assets © haX.baby Track 1.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
