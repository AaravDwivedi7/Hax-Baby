import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { CharacterProfile } from '../components/CharacterProfile';
import { StoryScenes } from '../components/StoryScenes';
import { GrowthChart } from '../components/GrowthChart';
import { ShapeDivider } from '../components/ShapeDivider';
import { ChamberPortalsNav } from '../components/ChamberPortalsNav';
import { PageTransitionWrapper } from '../components/PageTransitionWrapper';
import { BookOpen, Sparkles, Watch, Package, Compass, Bell, Info } from 'lucide-react';
import { playUiChime } from '../utils/soundEffects';

interface LorePageProps {
  isMuted: boolean;
}

export const LorePage: React.FC<LorePageProps> = ({ isMuted }) => {
  const [inspectedItem, setInspectedItem] = useState<{
    name: string;
    description: string;
    lore: string;
  } | null>(null);

  const inventoryItems = [
    {
      name: 'Starlight Moonwatch',
      icon: <Watch className="w-5 h-5 text-[#f5c96a]" />,
      description: 'Clockwork chronometer measuring dream tides rather than hours.',
      lore: 'Calibrated to the 90-minute infant REM sleep cycle. It chimes in soft C-major whenever a deep dream commences.',
    },
    {
      name: 'Star Catcher Satchel',
      icon: <Package className="w-5 h-5 text-[#dba7b9]" />,
      description: 'Hand-woven pouch made from spun interstellar mist.',
      lore: 'Holds up to 40 fallen star fragments without losing their gentle room-temperature glow.',
    },
    {
      name: 'Brass Dream Compass',
      icon: <Compass className="w-5 h-5 text-[#99e1d9]" />,
      description: 'Points not North, but toward the nearest restful nursery.',
      lore: 'Always directs Pip towards little dreamers tossing and turning so he can deliver soothing lullabies.',
    },
    {
      name: 'Slumber Chime Bell',
      icon: <Bell className="w-5 h-5 text-[#c7b6df]" />,
      description: 'Forged from harmonic meteorite bronze.',
      lore: 'When struck lightly with a wooden mallet, its 432 Hz resonance settles fluttering eyelashes in seconds.',
    },
  ];

  return (
    <PageTransitionWrapper pageId="lore-page">
      {/* Chamber Header */}
      <PageHeader
        title="Pip's Lore & Bedtime Chronicles"
        subtitle="Discover the legend of Pip the Star-Catching Sloth, explore interactive bedtime story chapters, and view nursery growth milestones."
        chamberNumber="Chamber II"
        badge="Origin & Character Archives"
        icon={<BookOpen className="w-8 h-8 text-[#dba7b9]" />}
      />

      {/* 1. Character Profile — Who Pip is */}
      <CharacterProfile isMuted={isMuted} />

      {/* Shape Divider */}
      <ShapeDivider variant="clouds" />

      {/* 2. Interactive Celestial Inventory Deck */}
      <section className="py-12 px-4 sm:px-6 bg-[#fdf6ec]/80 dark:bg-[#1f1b36] border-y border-[#f0dfcf] dark:border-[#43395c] transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4d7df]/50 dark:bg-[#302847] text-[#a34063] dark:text-[#dba7b9] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#f5c96a]" />
              <span>Pip's Satchel Gear</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2]">
              Interactive Celestial Inventory
            </h2>
            <p className="text-sm text-[#6e544b] dark:text-[#dcd2ea] mt-1">
              Tap any piece of Pip's equipment to inspect its dream lore and mechanical specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {inventoryItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  playUiChime(isMuted);
                  setInspectedItem(item);
                }}
                className="p-5 rounded-2xl bg-white/90 dark:bg-[#28213d]/90 border border-[#f0dfcf] dark:border-[#43395c] hover:border-[#a34063] dark:hover:border-[#f5c96a] shadow-xs hover:shadow-md transition-all text-left group cursor-pointer"
              >
                <div className="p-3 rounded-xl bg-[#fff8f1] dark:bg-[#302847] w-fit mb-3 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-bold text-sm text-[#402c25] dark:text-[#fcf8f2] group-hover:text-[#a34063] dark:group-hover:text-[#f5c96a] transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-[#6e544b] dark:text-[#dcd2ea] mt-1 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-3 text-[11px] font-semibold text-[#a34063] dark:text-[#dba7b9] flex items-center gap-1">
                  <span>Inspect Lore</span>
                  <Info className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>

          {/* Inspected Item Modal */}
          {inspectedItem && (
            <div className="mt-6 p-6 rounded-3xl bg-white dark:bg-[#28213d] border-2 border-[#f5c96a] shadow-lg max-w-xl mx-auto animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase text-[#a34063] dark:text-[#dba7b9]">
                  Inventory Inspect
                </span>
                <button
                  onClick={() => setInspectedItem(null)}
                  className="text-xs font-semibold text-[#9c8278] hover:text-[#402c25] dark:hover:text-white px-2 py-0.5 rounded cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>
              <h4 className="text-lg font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2]">
                {inspectedItem.name}
              </h4>
              <p className="text-sm text-[#6e544b] dark:text-[#dcd2ea] mt-2 italic bg-[#fff8f1] dark:bg-[#201d39] p-3 rounded-xl border border-[#f0dfcf] dark:border-[#43395c]">
                “{inspectedItem.lore}”
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Wave Shape Divider */}
      <ShapeDivider variant="waves" />

      {/* 3. Pip's Origin Story — Interactive Scroll Narrative */}
      <StoryScenes isMuted={isMuted} />

      {/* Constellations Divider */}
      <ShapeDivider variant="constellations" />

      {/* 4. Playful Nursery Growth Chart */}
      <GrowthChart />

      {/* Dunes Divider */}
      <ShapeDivider variant="dunes" />

      {/* Chamber Portals Navigation */}
      <ChamberPortalsNav currentPath="/lore" />
    </PageTransitionWrapper>
  );
};
