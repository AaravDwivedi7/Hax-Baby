import React from 'react';

interface ShapeDividerProps {
  position?: 'top' | 'bottom';
  variant?: 'clouds' | 'waves' | 'constellations' | 'dunes';
  className?: string;
}

export const ShapeDivider: React.FC<ShapeDividerProps> = ({
  position = 'bottom',
  variant = 'clouds',
  className = '',
}) => {
  const isTop = position === 'top';

  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none z-10 relative ${
        isTop ? '-mt-1' : '-mb-1'
      } ${className}`}
      aria-hidden="true"
    >
      {/* Variant 1: Organic Morphing Clouds */}
      {variant === 'clouds' && (
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className={`w-full h-10 sm:h-14 md:h-20 text-[#fef4e8] dark:text-[#1a1730] transition-colors duration-500 fill-current ${
            isTop ? 'transform rotate-180' : ''
          }`}
        >
          {/* Layer 1: Distant soft cloud shelf with subtle float morph */}
          <path
            d="M0,0 C150,55 350,15 500,45 C650,75 800,25 950,50 C1100,75 1180,30 1200,40 L1200,120 L0,120 Z"
            opacity="0.35"
            className="animate-wave-morph"
          />
          {/* Layer 2: Middle rounded cumulus puffs with counter-rhythm */}
          <path
            d="M0,20 C180,75 320,30 480,68 C640,98 780,40 920,72 C1060,98 1150,48 1200,58 L1200,120 L0,120 Z"
            opacity="0.65"
            className="animate-wave-morph"
            style={{ animationDelay: '-3s' }}
          />
          {/* Layer 3: Foreground crisp cloud horizon with billowing lobes */}
          <path
            d="M0,45 C120,88 240,58 360,82 C480,102 600,62 720,86 C840,106 960,68 1080,92 C1140,102 1180,82 1200,88 L1200,120 L0,120 Z"
            opacity="1"
          />
        </svg>
      )}

      {/* Variant 2: Slumber Tide Ocean Waves */}
      {variant === 'waves' && (
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className={`w-full h-10 sm:h-14 md:h-18 text-[#fff8f1] dark:text-[#201d39] transition-colors duration-500 fill-current ${
            isTop ? 'transform rotate-180' : ''
          }`}
        >
          {/* Deep tidal undercurrent */}
          <path
            d="M0,0 C220,80 440,15 660,65 C880,115 1060,35 1200,50 L1200,120 L0,120 Z"
            opacity="0.35"
            className="animate-wave-morph"
          />
          {/* Mid-crest harmonic swell */}
          <path
            d="M0,25 C300,95 580,20 860,80 C1020,110 1140,40 1200,55 L1200,120 L0,120 Z"
            opacity="0.65"
            className="animate-wave-morph"
            style={{ animationDelay: '-2.5s' }}
          />
          {/* Surface sleep wave */}
          <path
            d="M0,45 C250,100 500,42 750,88 C1000,132 1120,68 1200,78 L1200,120 L0,120 Z"
            opacity="1"
          />
        </svg>
      )}

      {/* Variant 3: Constellation Peaks (Star Geometry Crests) */}
      {variant === 'constellations' && (
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className={`w-full h-10 sm:h-14 md:h-18 text-[#fef4e8] dark:text-[#1a1730] transition-colors duration-500 fill-current ${
            isTop ? 'transform rotate-180' : ''
          }`}
        >
          <path
            d="M0,30 L150,75 L300,20 L450,70 L600,15 L750,65 L900,25 L1050,75 L1200,35 L1200,120 L0,120 Z"
            opacity="0.35"
            className="animate-wave-morph"
          />
          <path
            d="M0,50 L180,85 L360,40 L540,88 L720,35 L900,82 L1080,45 L1200,75 L1200,120 L0,120 Z"
            opacity="1"
          />
        </svg>
      )}

      {/* Variant 4: Rolling Dream Dunes */}
      {variant === 'dunes' && (
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className={`w-full h-10 sm:h-14 md:h-18 text-[#fff8f1] dark:text-[#201d39] transition-colors duration-500 fill-current ${
            isTop ? 'transform rotate-180' : ''
          }`}
        >
          <path
            d="M0,10 Q350,90 700,25 T1200,60 L1200,120 L0,120 Z"
            opacity="0.4"
            className="animate-wave-morph"
          />
          <path
            d="M0,45 Q450,110 850,40 T1200,75 L1200,120 L0,120 Z"
            opacity="1"
          />
        </svg>
      )}
    </div>
  );
};
