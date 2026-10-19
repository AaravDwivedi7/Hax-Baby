import React, { useState } from 'react';
import { Telescope, Sparkles, RotateCcw, Check, Star } from 'lucide-react';
import { playUiChime, playMagicChime } from '../utils/soundEffects';

interface ObservatoryProps {
  isMuted: boolean;
}

interface CelestialObject {
  id: string;
  name: string;
  myth: string;
  gift: string;
  x: number; // percentage
  y: number; // percentage
  color: string;
  magnitude: string;
}

const CELESTIAL_OBJECTS: CelestialObject[] = [
  {
    id: 'ursa-teddy',
    name: 'Ursa Minoris Lullaby',
    myth: 'The celestial teddy bear tucked under the north pole. It watches over young creatures sleeping away from home for the first time.',
    gift: 'Unlocked: Velvet Dream Shield against closet monsters',
    x: 22,
    y: 30,
    color: '#f5c96a',
    magnitude: '1.2 Mag (Warm Amber)',
  },
  {
    id: 'chamomile-teapot',
    name: 'The Teapot of Warm Chamomile',
    myth: 'Three stars shaped like an antique kettle. Legend says when its spout points toward earth, a gentle drowsiness settles over baby nursery cribs.',
    gift: 'Unlocked: Gentle Steam of Warm Honey and Cinnamon',
    x: 54,
    y: 24,
    color: '#dba7b9',
    magnitude: '2.1 Mag (Rose Glow)',
  },
  {
    id: 'north-cloud-feather',
    name: 'The Downy Feather of Zephyr',
    myth: 'A cluster of six sparkling stars drifting in an arc. It cushions sleepy skulls from heavy thoughts.',
    gift: 'Unlocked: Zero-Gravity Cloud Pillow Formula',
    x: 78,
    y: 45,
    color: '#c7b6df',
    magnitude: '1.8 Mag (Lavender Star)',
  },
  {
    id: 'golden-pacifier',
    name: 'The Amber Pacifier of Orion',
    myth: 'An ancient nursery constellation spotted only after midnight. It reminds dreamers that dawn always brings warm porridge.',
    gift: 'Unlocked: 100% Calming Melatonin Frequency',
    x: 35,
    y: 70,
    color: '#f5c96a',
    magnitude: '1.4 Mag (Golden Nova)',
  },
  {
    id: 'porridge-comet',
    name: 'The Comet of Warm Porridge',
    myth: 'A wandering friendly celestial snowball that leaves a trail of cinnamon sparkles once every 48 hours.',
    gift: 'Unlocked: Sweet Midnight Snack Voucher',
    x: 70,
    y: 75,
    color: '#f4d7df',
    magnitude: '0.9 Mag (Fast Orbit)',
  },
];

export const Observatory: React.FC<ObservatoryProps> = ({ isMuted }) => {
  const [discoveredIds, setDiscoveredIds] = useState<Set<string>>(new Set(['ursa-teddy']));
  const [activeObject, setActiveObject] = useState<CelestialObject>(CELESTIAL_OBJECTS[0]);

  const handleStarClick = (obj: CelestialObject) => {
    playMagicChime(isMuted);
    setActiveObject(obj);
    setDiscoveredIds((prev) => new Set([...prev, obj.id]));
  };

  const handleReset = () => {
    playUiChime(isMuted);
    setDiscoveredIds(new Set());
    setActiveObject(CELESTIAL_OBJECTS[0]);
  };

  return (
    <section
      id="observatory"
      className="py-16 md:py-24 bg-[#fff8f1] dark:bg-[#201d39] transition-colors"
      aria-label="Interactive Midnight Observatory"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-[#a34063] dark:text-[#dba7b9] uppercase tracking-wider mb-2">
            <Telescope className="w-3.5 h-3.5 text-[#f5c96a]" aria-hidden="true" />
            <span>Interactive Celestial Telescope</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2] tracking-tight">
            The Midnight Observatory Dome
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6e544b] dark:text-[#dcd2ea]">
            Pip’s brass telescope scans the sector sky for wandering dream constellations. Tap any star below to study its lore.
          </p>
        </div>

        {/* Observatory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Celestial Interactive Dome (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-[#1a1730] rounded-3xl p-6 sm:p-8 border border-[#43395c] shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[380px] sm:min-h-[440px]">
            {/* Header controls inside dome */}
            <div className="flex items-center justify-between z-10 text-xs">
              <div className="flex items-center gap-2 text-[#f5c96a] font-mono">
                <span className="w-2 h-2 rounded-full bg-[#f5c96a] animate-pulse"></span>
                <span>Telescope: Focal Length 800mm · Clear Sky</span>
              </div>
              <button
                onClick={handleReset}
                aria-label="Reset discovered constellations"
                className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-[#302847] hover:bg-[#392f50] text-[#dcd2ea] border border-[#43395c] transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset View</span>
              </button>
            </div>

            {/* Star Dome Canvas / SVG */}
            <div className="relative w-full h-72 sm:h-80 my-4 rounded-2xl bg-radial from-[#28213d] via-[#1a1730] to-[#141224] border border-[#392f50] flex items-center justify-center overflow-hidden">
              {/* Subtle orbital latitude and longitude lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" aria-hidden="true">
                <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#dba7b9" strokeDasharray="3 3" />
                <circle cx="50%" cy="50%" r="70%" fill="none" stroke="#c7b6df" strokeDasharray="4 4" />
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#43395c" />
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#43395c" />
              </svg>

              {/* Decorative background tiny static stars */}
              <span className="absolute top-6 left-12 text-[#fcf8f2] opacity-30 text-[10px]" aria-hidden="true">·</span>
              <span className="absolute top-16 right-16 text-[#fcf8f2] opacity-25 text-[10px]" aria-hidden="true">·</span>
              <span className="absolute bottom-8 left-24 text-[#fcf8f2] opacity-30 text-[10px]" aria-hidden="true">·</span>
              <span className="absolute bottom-16 right-32 text-[#fcf8f2] opacity-35 text-[10px]" aria-hidden="true">·</span>
              <span className="absolute top-36 left-48 text-[#fcf8f2] opacity-20 text-[10px]" aria-hidden="true">·</span>

              {/* Clickable Discoverable Stars */}
              {CELESTIAL_OBJECTS.map((obj) => {
                const isSelected = activeObject.id === obj.id;
                const isDiscovered = discoveredIds.has(obj.id);

                return (
                  <button
                    key={obj.id}
                    onClick={() => handleStarClick(obj)}
                    style={{
                      left: `${obj.x}%`,
                      top: `${obj.y}%`,
                    }}
                    aria-label={`Explore constellation: ${obj.name}`}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c96a]"
                  >
                    {/* Pulsing ring when selected */}
                    {isSelected && (
                      <span
                        className="absolute inset-0 rounded-full animate-ping opacity-75"
                        style={{
                          backgroundColor: obj.color,
                          width: '28px',
                          height: '28px',
                          margin: '-6px 0 0 -6px',
                        }}
                      />
                    )}

                    {/* Star Icon Body */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? 'scale-125 shadow-[0_0_15px_currentColor]'
                          : isDiscovered
                          ? 'scale-100 hover:scale-110'
                          : 'scale-90 hover:scale-105 opacity-80'
                      }`}
                      style={{
                        backgroundColor: isSelected ? obj.color : '#302847',
                        color: isSelected ? '#1a1730' : obj.color,
                        border: `1.5px solid ${obj.color}`,
                      }}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </div>

                    {/* Star Label Tag */}
                    <span
                      className={`absolute top-full mt-1.5 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[10px] font-medium px-2 py-0.5 rounded transition-all pointer-events-none ${
                        isSelected
                          ? 'bg-[#f5c96a] text-[#1a1730] font-bold shadow-xs'
                          : 'bg-[#28213d]/90 text-[#dcd2ea] group-hover:text-white'
                      }`}
                    >
                      {obj.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dome Footer discovery tracker */}
            <div className="flex items-center justify-between text-xs text-[#a69bb8] pt-2 border-t border-[#392f50]">
              <span>Discoveries logged: {discoveredIds.size} of {CELESTIAL_OBJECTS.length}</span>
              <span className="font-display italic text-[#f5c96a]">
                {discoveredIds.size === CELESTIAL_OBJECTS.length
                  ? 'All sector constellations discovered! ✦'
                  : 'Tap stars above to map the nursery sky'}
              </span>
            </div>
          </div>

          {/* Active Constellation Dossier (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-[#ffffff] dark:bg-[#302847] rounded-3xl p-6 sm:p-8 border border-[#f0dfcf] dark:border-[#43395c] shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
                  style={{
                    backgroundColor: `${activeObject.color}25`,
                    color: activeObject.color,
                  }}
                >
                  {activeObject.magnitude}
                </span>

                {discoveredIds.has(activeObject.id) ? (
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Cataloged</span>
                  </span>
                ) : (
                  <span className="text-xs font-medium text-[#9c8278]">Uncataloged</span>
                )}
              </div>

              <h3 className="text-2xl font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2] mb-3">
                {activeObject.name}
              </h3>

              <div className="space-y-4 text-sm text-[#6e544b] dark:text-[#dcd2ea]">
                <div>
                  <strong className="text-[#402c25] dark:text-[#fcf8f2] block mb-1">
                    Celestial Myth & Folklore:
                  </strong>
                  <p className="leading-relaxed bg-[#fff8f1] dark:bg-[#28213d] p-3.5 rounded-xl border border-[#f0dfcf] dark:border-[#43395c]">
                    {activeObject.myth}
                  </p>
                </div>

                <div>
                  <strong className="text-[#402c25] dark:text-[#fcf8f2] block mb-1">
                    Nursery Sleep Perk:
                  </strong>
                  <div className="p-3.5 rounded-xl bg-[#f4d7df]/40 dark:bg-[#392f50] border border-[#dba7b9]/40 text-[#a34063] dark:text-[#dba7b9] font-medium flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#f5c96a] shrink-0" />
                    <span>{activeObject.gift}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick action button to cycle stars */}
            <div className="mt-8 pt-4 border-t border-[#f0dfcf] dark:border-[#43395c]">
              <button
                onClick={() => {
                  const currIdx = CELESTIAL_OBJECTS.findIndex((c) => c.id === activeObject.id);
                  const nextIdx = (currIdx + 1) % CELESTIAL_OBJECTS.length;
                  handleStarClick(CELESTIAL_OBJECTS[nextIdx]);
                }}
                className="w-full py-3 px-4 rounded-xl text-xs font-medium text-white bg-[#a34063] hover:bg-[#8f3454] transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Rotate Telescope to Next Constellation</span>
                <span className="text-xs">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
