import React, { useState } from 'react';
import { MessageSquare, Sparkles, BookHeart, Compass, Moon } from 'lucide-react';
import { playUiChime } from '../utils/soundEffects';
import { Pip3DModel } from './Pip3DModel';

interface CharacterProfileProps {
  isMuted: boolean;
}

const PIP_QUOTES = [
  "Some dreams need a little tune. Others just need a nightlight.",
  "If you lose a dream under your pillow, don't worry. I have a long star-rake.",
  "The moon is basically a giant nursery nightlight that never needs new batteries.",
  "I tried counting sheep once, but they all fell asleep before I did.",
];

export const CharacterProfile: React.FC<CharacterProfileProps> = ({ isMuted }) => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const cycleQuote = () => {
    playUiChime(isMuted);
    setQuoteIndex((prev) => (prev + 1) % PIP_QUOTES.length);
  };

  const [view3D, setView3D] = useState(false);

  return (
    <section
      id="about"
      className="py-16 md:py-24 bg-[#fef4e8] dark:bg-[#1a1730] border-y border-[#f0dfcf] dark:border-[#43395c] transition-colors"
      aria-label="Character Profile"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-[#a34063] dark:text-[#dba7b9] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#f5c96a]" aria-hidden="true" />
            <span>Official Character Dossier</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2] tracking-tight">
            Meet the Resident Dream Engineer
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6e544b] dark:text-[#dcd2ea]">
            Tucked under the tallest nursery rafters, Pip works after bedtime keeping nighttime peaceful.
          </p>
        </div>

        {/* Character Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#ffffff] dark:bg-[#302847] rounded-3xl p-6 sm:p-8 md:p-10 border border-[#f0dfcf] dark:border-[#43395c] shadow-lg">
          {/* Portrait Column */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* View Switcher */}
            <div className="mb-3 flex items-center gap-2 p-1 rounded-xl bg-[#fff8f1] dark:bg-[#28213d] border border-[#f0dfcf] dark:border-[#43395c]">
              <button
                onClick={() => {
                  playUiChime(isMuted);
                  setView3D(false);
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  !view3D
                    ? 'bg-[#a34063] text-white shadow-2xs'
                    : 'text-[#6e544b] dark:text-[#dcd2ea]'
                }`}
              >
                Dossier Photo
              </button>
              <button
                onClick={() => {
                  playUiChime(isMuted);
                  setView3D(true);
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  view3D
                    ? 'bg-[#a34063] text-white shadow-2xs'
                    : 'text-[#6e544b] dark:text-[#dcd2ea]'
                }`}
              >
                <Sparkles className="w-3 h-3 text-[#f5c96a]" />
                <span>3D WebGL</span>
              </button>
            </div>

            {view3D ? (
              <div className="w-full max-w-[340px]">
                <Pip3DModel isMuted={isMuted} />
              </div>
            ) : (
              <div className="relative w-full max-w-[320px] aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-[#f4d7df]/50 to-[#fff8f1] dark:from-[#392f50] dark:to-[#28213d] p-4 flex items-center justify-center border border-[#f0dfcf] dark:border-[#43395c] group">
                <img
                  src="/assets/pip_portrait.png"
                  alt="Pip official portrait: cute, smooth round skull face, large soft eye sockets with gentle amber eyes, tiny crooked smile, and star-patterned nightcap with a pink bow"
                  className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 group-hover:-rotate-1 transition-all duration-300 ease-out cursor-pointer"
                  width="320"
                  height="320"
                  loading="lazy"
                />
                <span className="absolute bottom-3 right-3 text-xs font-mono text-[#9c8278] dark:text-[#a69bb8] bg-[#ffffff]/80 dark:bg-[#201d39]/80 px-2 py-0.5 rounded-md backdrop-blur-xs">
                  Canon · haX.baby
                </span>
              </div>
            )}

            {/* Interactive Speech Bubble with smooth morph transition */}
            <div className="mt-6 w-full max-w-[320px]">
              <button
                onClick={cycleQuote}
                aria-label="Click to hear another thought from Pip"
                className="w-full text-left relative p-4 rounded-2xl bg-[#fff8f1] dark:bg-[#28213d] border border-[#f0dfcf] dark:border-[#43395c] hover:border-[#dba7b9] dark:hover:border-[#dba7b9] hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer group shadow-xs active:scale-[0.98]"
              >
                <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold text-[#a34063] dark:text-[#dba7b9]">
                  <MessageSquare className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <span>Pip says... (tap for more)</span>
                </div>
                <blockquote
                  key={quoteIndex}
                  className="text-sm font-display italic text-[#5c4033] dark:text-[#fcf8f2] leading-snug animate-in fade-in-50 duration-200"
                >
                  “{PIP_QUOTES[quoteIndex]}”
                </blockquote>
              </button>
            </div>
          </div>

          {/* Dossier Details Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#fff8f1] dark:bg-[#28213d] border border-[#f0dfcf] dark:border-[#43395c]">
                <span className="text-xs font-medium text-[#9c8278] dark:text-[#a69bb8] block">Full Name</span>
                <span className="text-base font-semibold text-[#402c25] dark:text-[#fcf8f2]">Pip</span>
              </div>

              <div className="p-4 rounded-xl bg-[#fff8f1] dark:bg-[#28213d] border border-[#f0dfcf] dark:border-[#43395c]">
                <span className="text-xs font-medium text-[#9c8278] dark:text-[#a69bb8] block">Species</span>
                <span className="text-base font-semibold text-[#402c25] dark:text-[#fcf8f2]">Official Skull Baby</span>
              </div>

              <div className="p-4 rounded-xl bg-[#fff8f1] dark:bg-[#28213d] border border-[#f0dfcf] dark:border-[#43395c]">
                <span className="text-xs font-medium text-[#9c8278] dark:text-[#a69bb8] block">Occupation</span>
                <span className="text-base font-semibold text-[#402c25] dark:text-[#fcf8f2]">Junior Dream Engineer</span>
              </div>

              <div className="p-4 rounded-xl bg-[#fff8f1] dark:bg-[#28213d] border border-[#f0dfcf] dark:border-[#43395c]">
                <span className="text-xs font-medium text-[#9c8278] dark:text-[#a69bb8] block">Workshop</span>
                <span className="text-base font-semibold text-[#402c25] dark:text-[#fcf8f2]">Midnight Nursery Attic</span>
              </div>
            </div>

            {/* Narrative traits */}
            <div className="space-y-3 text-sm text-[#6e544b] dark:text-[#dcd2ea]">
              <div>
                <strong className="text-[#402c25] dark:text-[#fcf8f2] font-semibold">Personality: </strong>
                Gentle, curious, sleepy, quietly inventive. Loves soothing rhythms, warm blankets, and starlight.
              </div>
              <div>
                <strong className="text-[#402c25] dark:text-[#fcf8f2] font-semibold">Quirks: </strong>
                Collects stray stars that fall behind radiators, hums melodies while adjusting lantern wicks, and labels every dream jar with tiny handwritten notes.
              </div>
              <div>
                <strong className="text-[#402c25] dark:text-[#fcf8f2] font-semibold">Favorite Tools: </strong>
                A brass lullaby music box, an alabaster crescent dream lantern, and a constellation pocket notebook.
              </div>
              <div>
                <strong className="text-[#402c25] dark:text-[#fcf8f2] font-semibold">Character Voice: </strong>
                Soft, curious, warm, with occasional sleepy humor. Never scary or loud.
              </div>
            </div>

            {/* Quick badges */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1.5 rounded-lg bg-[#f4d7df]/50 dark:bg-[#392f50] text-[#a34063] dark:text-[#dba7b9] font-medium flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Bedtime Nightcap & Pink Bow</span>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#fcf1d8] dark:bg-[#3d3428] text-[#916b15] dark:text-[#f5c96a] font-medium flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Breezeway Route Certified</span>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#c7b6df]/30 dark:bg-[#392f50] text-[#5c4033] dark:text-[#dcd2ea] font-medium flex items-center gap-1.5">
                <BookHeart className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Zero Bad Dreams Guarantee</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
