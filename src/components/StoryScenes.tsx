import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Moon, Lightbulb, Compass, Heart } from 'lucide-react';
import { playUiChime } from '../utils/soundEffects';

interface StoryScenesProps {
  isMuted: boolean;
}

interface Scene {
  id: number;
  chapter: string;
  title: string;
  body: string;
  badge: string;
  icon: React.ElementType;
  illustrationBg: string;
  quote: string;
}

const STORY_SCENES: Scene[] = [
  {
    id: 1,
    chapter: 'Scene 01',
    title: 'The Restless Neighborhood',
    body: 'Before the observatory had its copper spire, twilight over Midnight Nursery was uncomfortably quiet. Pip sat on the low sill of the attic window, dangling two woolly socks into the cool dusk. Below, shadows pooled thick under cribs and birdhouses. Tiny field mice tossed and turned, unable to shake the day’s rustling anxieties, while little barn owls blinked anxiously at the dark forest edge. Dreams were drifting high above like lost silver kites, just out of reach.',
    badge: 'Twilight in Sector 4',
    icon: Moon,
    illustrationBg: 'from-[#201d39] to-[#392f50]',
    quote: '“The sky had plenty of stars, but nobody had taught them how to sing down here.”',
  },
  {
    id: 2,
    chapter: 'Scene 02',
    title: 'A Tiny Discovery',
    body: 'Pip realized something important: one bedtime routine never fits all creatures. When Barnaby the dormouse trembled at the dark, soft piano chords only made him twitch—what he needed was a warm amber glow nestled in his teacup. When the baby thrushes chirped fretfully, a lantern was too bright; they longed for the steady, hypnotic chime of a music box. Comfort wasn’t magic; it was listening with a tender heart.',
    badge: 'Attic Laboratory Experiments',
    icon: Lightbulb,
    illustrationBg: 'from-[#392f50] to-[#5c4033]',
    quote: '“A dream isn’t just a thought—it’s an address where hope goes to sleep.”',
  },
  {
    id: 3,
    chapter: 'Scene 03',
    title: 'The Midnight Observatory',
    body: 'With three brass gears, an alabaster crescent bowl, and a constellation map sketched on parchment, Pip built the Observatory cupola. Here, drifting evening breezes could be filtered, warm lullabies calibrated in key of C, and wayward starlight harvested into sealed glass jars. Pip placed his star nightcap on his smooth skull, pinned a gentle pink ribbon, and took the official title: Junior Dream Engineer.',
    badge: 'The First Spire Raised',
    icon: Compass,
    illustrationBg: 'from-[#302847] to-[#201d39]',
    quote: '“Every stray cloud can be steered if your compass is tuned to kindness.”',
  },
  {
    id: 4,
    chapter: 'Scene 04',
    title: 'The First Delivery',
    body: 'At precisely 17 minutes past midnight, Pip dispatched the first dream cloud toward the bakery chimney. It carried lavender scents and gentle kitten murmurs. Down below, yellow bedroom lamps dimmed to embers, small sighs turned to steady breathing, and peaceful dreams settled over the sleepy lane. Pip smiled his tiny crooked smile, pulled the duvet up to his chin, and made a promise to watch every night.',
    badge: '17:17 Midnight Milestone',
    icon: Heart,
    illustrationBg: 'from-[#28213d] to-[#402c25]',
    quote: '“When the last window goes dark, the nursery is truly at peace.”',
  },
];

export const StoryScenes: React.FC<StoryScenesProps> = ({ isMuted }) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);

  const activeScene = STORY_SCENES[activeSceneIndex];

  const handlePrev = () => {
    playUiChime(isMuted);
    setActiveSceneIndex((prev) => (prev > 0 ? prev - 1 : STORY_SCENES.length - 1));
  };

  const handleNext = () => {
    playUiChime(isMuted);
    setActiveSceneIndex((prev) => (prev < STORY_SCENES.length - 1 ? prev + 1 : 0));
  };

  const handleSelect = (idx: number) => {
    playUiChime(isMuted);
    setActiveSceneIndex(idx);
  };

  return (
    <section
      id="story"
      className="py-16 md:py-24 bg-[#fef4e8] dark:bg-[#1a1730] border-y border-[#f0dfcf] dark:border-[#43395c] transition-colors"
      aria-label="Pip's Origin Story"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-[#a34063] dark:text-[#dba7b9] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#f5c96a]" aria-hidden="true" />
            <span>Illustrated Chronicles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2] tracking-tight">
            How the Observatory Came to Be
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6e544b] dark:text-[#dcd2ea]">
            Four short chapters following a sleepy baby skull who turned attic rafters into a haven for sweet dreams.
          </p>
        </div>

        {/* Constellation Progress Line / Stepper */}
        <div className="flex items-center justify-center max-w-xl mx-auto mb-10 px-4">
          {STORY_SCENES.map((scene, idx) => {
            const isCurrent = activeSceneIndex === idx;
            const isPast = activeSceneIndex > idx;

            return (
              <React.Fragment key={scene.id}>
                <button
                  onClick={() => handleSelect(idx)}
                  aria-label={`Jump to ${scene.chapter}: ${scene.title}`}
                  className="flex flex-col items-center group focus:outline-none"
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      isCurrent
                        ? 'bg-[#a34063] text-white ring-4 ring-[#f4d7df] dark:ring-[#43395c] scale-110 shadow-sm'
                        : isPast
                        ? 'bg-[#f5c96a] text-[#5c4033]'
                        : 'bg-[#ffffff] dark:bg-[#302847] text-[#9c8278] dark:text-[#a69bb8] border border-[#f0dfcf] dark:border-[#43395c]'
                    }`}
                  >
                    0{scene.id}
                  </div>
                  <span className="hidden sm:block text-[11px] font-medium text-[#6e544b] dark:text-[#dcd2ea] mt-2 group-hover:text-[#a34063] transition-colors">
                    {scene.chapter}
                  </span>
                </button>

                {idx < STORY_SCENES.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 transition-colors duration-300 ${
                      isPast ? 'bg-[#f5c96a]' : 'bg-[#f0dfcf] dark:bg-[#43395c]'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Active Scene Card with morphing slide & fade */}
        <div
          key={activeScene.id}
          className="max-w-3xl mx-auto bg-[#ffffff] dark:bg-[#302847] rounded-3xl p-6 sm:p-10 border border-[#f0dfcf] dark:border-[#43395c] shadow-lg relative overflow-hidden transition-all duration-500 animate-in fade-in-50 slide-in-from-right-3"
        >
          {/* Decorative constellation path accent */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#f0dfcf] dark:border-[#43395c]">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-[#f4d7df]/50 dark:bg-[#392f50] text-[#a34063] dark:text-[#dba7b9] shadow-xs">
                <activeScene.icon className="w-5 h-5" aria-hidden="true" />
              </span>
              <div>
                <span className="text-xs font-bold text-[#a34063] dark:text-[#dba7b9] uppercase tracking-wider block">
                  {activeScene.chapter} · {activeScene.badge}
                </span>
                <h3 className="text-2xl font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2]">
                  {activeScene.title}
                </h3>
              </div>
            </div>

            <span className="text-xs font-mono text-[#9c8278] dark:text-[#a69bb8]">
              {activeSceneIndex + 1} of {STORY_SCENES.length}
            </span>
          </div>

          {/* Narrative Body */}
          <div className="space-y-4">
            <p className="text-base text-[#6e544b] dark:text-[#dcd2ea] leading-relaxed">
              {activeScene.body}
            </p>

            {/* In-character memorable quote with gentle hover lift */}
            <blockquote className="p-4 rounded-2xl bg-[#fff8f1] dark:bg-[#28213d] border-l-4 border-[#a34063] dark:border-[#f5c96a] text-sm font-display italic text-[#5c4033] dark:text-[#fcf8f2] shadow-xs hover:translate-x-1 transition-transform duration-200">
              {activeScene.quote}
            </blockquote>
          </div>

          {/* Stepper Controls */}
          <div className="mt-8 pt-6 border-t border-[#f0dfcf] dark:border-[#43395c] flex items-center justify-between">
            <button
              onClick={handlePrev}
              aria-label="Previous scene"
              className="py-2.5 px-4 rounded-xl text-xs font-medium text-[#6e544b] dark:text-[#dcd2ea] bg-[#fff8f1] dark:bg-[#28213d] border border-[#f0dfcf] dark:border-[#43395c] hover:bg-[#f4d7df]/30 flex items-center gap-1.5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Chapter</span>
            </button>

            <button
              onClick={handleNext}
              aria-label="Next scene"
              className="py-2.5 px-4 rounded-xl text-xs font-medium text-white bg-[#a34063] hover:bg-[#8f3454] flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Next Chapter</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
