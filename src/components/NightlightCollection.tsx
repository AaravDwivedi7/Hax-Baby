import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lamp, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { LANTERN_COLLECTION, LanternItem } from '../utils/dreamLogic';
import { playUiChime } from '../utils/soundEffects';

interface NightlightCollectionProps {
  isMuted: boolean;
}

const LANTERN_SHAPES: Record<string, string> = {
  'crescent-lull': '68% 32% 38% 62% / 55% 65% 35% 45%', // Crescent curve
  'blush-ember': '50% 50% 62% 38% / 40% 40% 60% 60%',    // Heart / blossom teardrop
  'nebula-twilight': '45% 45% 20% 20% / 55% 55% 20% 20%', // Celestial vault arch
};

export const NightlightCollection: React.FC<NightlightCollectionProps> = ({ isMuted }) => {
  const [selectedLanternId, setSelectedLanternId] = useState<string>('crescent-lull');

  const selectedLantern: LanternItem =
    LANTERN_COLLECTION.find((l) => l.id === selectedLanternId) || LANTERN_COLLECTION[0];

  const handleSelect = (id: string) => {
    playUiChime(isMuted);
    setSelectedLanternId(id);
  };

  return (
    <div
      id="nightlight-collection"
      className="bg-[#ffffff] dark:bg-[#302847] rounded-3xl p-6 sm:p-8 border border-[#f0dfcf] dark:border-[#43395c] shadow-md flex flex-col justify-between transition-colors relative overflow-hidden"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f5c96a]" aria-hidden="true"></span>
            <span className="text-xs font-semibold text-[#a34063] dark:text-[#dba7b9] uppercase tracking-wider">
              Project 02 · Luminescence Craft
            </span>
          </div>
          <span className="text-xs font-mono text-[#9c8278] dark:text-[#a69bb8]">
            3 Hand-Carved Editions
          </span>
        </div>

        <h3 className="text-2xl font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2] mb-2">
          The Nightlight Collection
        </h3>
        <p className="text-sm text-[#6e544b] dark:text-[#dcd2ea] leading-relaxed mb-6">
          Little pockets of light for corners where the night feels a bit too big.
        </p>

        {/* Dynamic Illumination Chamber with unreal spring-morphing shape */}
        <motion.div
          animate={{
            borderRadius: LANTERN_SHAPES[selectedLantern.id] || '24px',
            backgroundColor: selectedLantern.id === 'nebula-twilight' ? '#181428' : '#28213d',
            borderColor: selectedLantern.colorHex,
            boxShadow: `0 0 45px ${selectedLantern.glowColor}`,
          }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 15,
            mass: 0.8,
          }}
          className="relative p-6 border-2 flex flex-col items-center justify-center mb-6 overflow-hidden"
        >
          {/* Ambient glow bloom radiating and morphing behind the lantern */}
          <div
            className="absolute inset-2 rounded-full filter blur-3xl opacity-80 transition-all duration-700 pointer-events-none animate-aura-morph"
            style={{
              backgroundColor: selectedLantern.colorHex,
            }}
            aria-hidden="true"
          />

          {/* Official Lantern Artwork with floating reaction */}
          <div className="relative z-10 w-44 h-44 flex items-center justify-center">
            <img
              src="/assets/pip_dream_lantern.png"
              alt="Pip's glowing crescent moon nightlight lantern"
              className="w-36 h-36 object-contain filter drop-shadow-[0_4px_20px_rgba(245,201,106,0.6)] transition-all duration-500 hover:scale-108 hover:rotate-1"
              style={{
                filter: `drop-shadow(0 0 28px ${selectedLantern.colorHex})`,
              }}
              width="144"
              height="144"
              loading="lazy"
            />
          </div>

          {/* Active lantern title in dark chamber */}
          <div className="relative z-10 mt-3 text-center">
            <span
              className="text-xs font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-full transition-colors duration-300"
              style={{
                backgroundColor: `${selectedLantern.colorHex}25`,
                color: selectedLantern.colorHex,
              }}
            >
              {selectedLantern.type}
            </span>
            <div className="text-white text-sm font-semibold mt-1">
              {selectedLantern.name}
            </div>
          </div>
        </motion.div>

        {/* Lantern Selector Cards with soft hover lift and color glow */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
          {LANTERN_COLLECTION.map((lantern) => {
            const isSelected = selectedLanternId === lantern.id;
            return (
              <button
                key={lantern.id}
                onClick={() => handleSelect(lantern.id)}
                aria-pressed={isSelected}
                className={`p-3 rounded-xl text-left transition-all duration-200 transform hover:-translate-y-1 border ${
                  isSelected
                    ? 'bg-[#fff8f1] dark:bg-[#28213d] border-[#a34063] dark:border-[#dba7b9] shadow-sm ring-1 ring-[#a34063]/30 dark:ring-[#dba7b9]/30'
                    : 'bg-[#ffffff] dark:bg-[#302847] border-[#f0dfcf] dark:border-[#43395c] hover:border-[#dba7b9] hover:shadow-xs'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{
                      backgroundColor: lantern.colorHex,
                      boxShadow: isSelected ? `0 0 8px ${lantern.colorHex}` : 'none',
                    }}
                    aria-hidden="true"
                  />
                  <div className="text-xs font-bold text-[#402c25] dark:text-[#fcf8f2] truncate">
                    {lantern.name.split(' ')[1] || lantern.name}
                  </div>
                </div>
                <p className="text-[11px] text-[#9c8278] dark:text-[#a69bb8] line-clamp-1">
                  {lantern.bestFor}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Specs Dossier */}
        <div className="p-4 rounded-2xl bg-[#fff8f1] dark:bg-[#28213d] border border-[#f0dfcf] dark:border-[#43395c] text-xs space-y-2 mb-6">
          <p className="text-[#5c4033] dark:text-[#dcd2ea] leading-relaxed">
            {selectedLantern.description}
          </p>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#f0dfcf] dark:border-[#43395c]">
            <div className="flex items-center gap-1.5 text-[#6e544b] dark:text-[#a69bb8]">
              <Clock className="w-3.5 h-3.5 text-[#a34063] dark:text-[#dba7b9]" aria-hidden="true" />
              <span>{selectedLantern.burnDuration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#6e544b] dark:text-[#a69bb8]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#a34063] dark:text-[#dba7b9]" aria-hidden="true" />
              <span>{selectedLantern.sparklePattern}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Trigger to Illuminate nursery */}
      <button
        onClick={() => {
          playUiChime(isMuted);
          // Cycle to next lantern
          const currentIndex = LANTERN_COLLECTION.findIndex((l) => l.id === selectedLanternId);
          const nextIndex = (currentIndex + 1) % LANTERN_COLLECTION.length;
          setSelectedLanternId(LANTERN_COLLECTION[nextIndex].id);
        }}
        className="w-full py-3.5 px-4 rounded-xl font-medium text-sm text-white bg-[#a34063] hover:bg-[#8f3454] transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.99]"
      >
        <Lamp className="w-4 h-4" aria-hidden="true" />
        <span>Switch Lantern Glow</span>
        <Sparkles className="w-3.5 h-3.5 text-[#f5c96a]" aria-hidden="true" />
      </button>
    </div>
  );
};
