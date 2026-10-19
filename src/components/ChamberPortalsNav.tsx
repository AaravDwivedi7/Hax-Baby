import React from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, ArrowRight, Wand2, Compass, Music, BookOpen, Star, Users } from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';
import { TransitionMode } from '../utils/transitionStyles';

export interface ChamberRoute {
  path: string;
  name: string;
  chamberNumber: string;
  description: string;
  iconName: string;
  badge: string;
  preferredMorph: TransitionMode;
  accentColor: string;
}

export const OBSERVATORY_CHAMBERS: ChamberRoute[] = [
  {
    path: '/',
    name: 'Grand Foyer & Telescope',
    chamberNumber: 'Chamber I',
    description: 'Enter the main observatory hall, meet Pip, and check daily celestial logs.',
    iconName: 'telescope',
    badge: 'Central Gate',
    preferredMorph: 'celestial',
    accentColor: '#f5c96a',
  },
  {
    path: '/lore',
    name: "Pip's Lore & Bedtime Origin",
    chamberNumber: 'Chamber II',
    description: 'Explore Pip the Sloth’s interactive origin story, celestial satchel, and nursery milestones.',
    iconName: 'book',
    badge: 'Bedtime Archive',
    preferredMorph: 'liquid',
    accentColor: '#dba7b9',
  },
  {
    path: '/projects',
    name: 'Nocturnal Inventions Lab',
    chamberNumber: 'Chamber III',
    description: 'Play the Lullaby Synthesizer, adjust Nightlight glow hues, and trace Dream Delivery routes.',
    iconName: 'music',
    badge: 'Hackathon Works',
    preferredMorph: 'warp',
    accentColor: '#99e1d9',
  },
  {
    path: '/dream-shaper',
    name: 'Dream Matter Shaper',
    chamberNumber: 'Chamber IV',
    description: 'Sculpt reality with 6 morphing dream geometries, zero-g cursor gravity, and liquid tension.',
    iconName: 'wand',
    badge: 'Fluid Metamorphosis',
    preferredMorph: 'celestial',
    accentColor: '#c7b6df',
  },
  {
    path: '/observatory',
    name: 'Celestial Stargazer Vault',
    chamberNumber: 'Chamber V',
    description: 'Pan through the 360 star sky, trace custom constellations, and discover stellar harmonics.',
    iconName: 'star',
    badge: 'Deep Cosmos',
    preferredMorph: 'warp',
    accentColor: '#f5c96a',
  },
  {
    path: '/community',
    name: 'Nursery Registry & Guestbook',
    chamberNumber: 'Chamber VI',
    description: 'Sign the starry guestbook, track sleepy visitor odometers, and generate a baby Star Cadet Certificate.',
    iconName: 'users',
    badge: 'Community Slumber',
    preferredMorph: 'origami',
    accentColor: '#dba7b9',
  },
];

export const ChamberPortalsNav: React.FC<{
  currentPath?: string;
  title?: string;
  subtitle?: string;
}> = ({
  currentPath,
  title = 'Teleport to Another Chamber',
  subtitle = 'Click any chamber portal to initiate an unreal shape-morphing hyperjump across the observatory.',
}) => {
  const location = useLocation();
  const activePath = currentPath || location.pathname;
  const { navigateWithMorph } = usePageTransition();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'book':
        return <BookOpen className="w-5 h-5" />;
      case 'music':
        return <Music className="w-5 h-5" />;
      case 'wand':
        return <Wand2 className="w-5 h-5" />;
      case 'star':
        return <Star className="w-5 h-5" />;
      case 'users':
        return <Users className="w-5 h-5" />;
      default:
        return <Compass className="w-5 h-5" />;
    }
  };

  return (
    <section id="chambers-gateway" className="py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-transparent via-[#fff8f1]/50 to-[#fdf6ec] dark:via-[#201d39]/50 dark:to-[#1a1730] border-t border-[#f0dfcf]/70 dark:border-[#43395c]/70">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4d7df]/50 dark:bg-[#302847] text-[#a34063] dark:text-[#dba7b9] text-xs font-semibold uppercase tracking-wider mb-3 border border-[#f0dfcf] dark:border-[#43395c]">
            <Sparkles className="w-3.5 h-3.5 text-[#f5c96a]" />
            <span>Observatory Portal Network</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2]">
            {title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#6e544b] dark:text-[#dcd2ea]">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {OBSERVATORY_CHAMBERS.map((chamber) => {
            const isCurrent = activePath === chamber.path;
            return (
              <div
                key={chamber.path}
                className={`relative rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between group overflow-hidden border ${
                  isCurrent
                    ? 'bg-gradient-to-br from-[#fcf1d8]/80 to-[#f4d7df]/50 dark:from-[#3d3257] dark:to-[#28213d] border-[#f5c96a] shadow-lg ring-2 ring-[#f5c96a]/30'
                    : 'bg-white/70 dark:bg-[#252042]/70 hover:bg-white dark:hover:bg-[#2e264f] border-[#f0dfcf] dark:border-[#43395c] hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {/* Subtle cosmic aura */}
                <div
                  className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none transition-opacity group-hover:opacity-40"
                  style={{ backgroundColor: chamber.accentColor }}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-[#a34063] dark:text-[#dba7b9] uppercase tracking-wider">
                      {chamber.chamberNumber}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#fff8f1] dark:bg-[#1a1730] text-[#6e544b] dark:text-[#dcd2ea] border border-[#f0dfcf] dark:border-[#43395c]">
                      {chamber.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="p-3 rounded-2xl text-white shadow-sm flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6"
                      style={{
                        backgroundColor: chamber.accentColor === '#f5c96a' ? '#a34063' : chamber.accentColor,
                      }}
                    >
                      {getIcon(chamber.iconName)}
                    </div>
                    <h3 className="text-lg font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2] group-hover:text-[#a34063] dark:group-hover:text-[#dba7b9] transition-colors">
                      {chamber.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#6e544b] dark:text-[#dcd2ea] leading-relaxed mb-6">
                    {chamber.description}
                  </p>
                </div>

                <div>
                  {isCurrent ? (
                    <div className="w-full py-2.5 px-4 rounded-2xl bg-[#f5c96a]/20 text-[#6e544b] dark:text-[#fcf8f2] text-xs font-bold text-center border border-[#f5c96a]/40 flex items-center justify-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#f5c96a] animate-ping" />
                      <span>Currently Inside This Wing</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => navigateWithMorph(chamber.path, chamber.name, chamber.preferredMorph)}
                      className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#a34063] to-[#8f3454] dark:from-[#dba7b9] dark:to-[#c7b6df] text-white dark:text-[#201d39] text-xs font-bold shadow-md hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 group-hover:gap-3 cursor-pointer"
                    >
                      <span>Warp to {chamber.name.split(' ')[0]}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
