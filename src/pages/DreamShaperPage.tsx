import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { DreamShaper } from '../components/DreamShaper';
import { ShapeDivider } from '../components/ShapeDivider';
import { ChamberPortalsNav } from '../components/ChamberPortalsNav';
import { PageTransitionWrapper } from '../components/PageTransitionWrapper';
import { Wand2, Sparkles, Sliders, Play, Share2, Layers, Check, Volume2 } from 'lucide-react';
import { playUiChime } from '../utils/soundEffects';

interface DreamShaperPageProps {
  isMuted: boolean;
}

export const DreamShaperPage: React.FC<DreamShaperPageProps> = ({ isMuted }) => {
  const [copiedPreset, setCopiedPreset] = useState<string | null>(null);

  const presets = [
    {
      name: 'Nocturnal Cumulus Shelf',
      geometry: 'Cumulus Soft Cloud',
      resonance: '528 Hz Love Tone',
      splineType: 'Cubic Bézier (3 Shelves)',
      feel: 'Pillowy & Weightless',
    },
    {
      name: 'Slumber Crescent Arc',
      geometry: 'Crescent Moon Curve',
      resonance: '432 Hz Earth Calm',
      splineType: 'Parabolic Inverse Sweep',
      feel: 'Cradling & Protective',
    },
    {
      name: 'Radiant Dawn Prism',
      geometry: '8-Point Radiant Sunburst',
      resonance: '639 Hz Harmonic Union',
      splineType: 'Alternating Radial Splines',
      feel: 'Warm & Reassuring',
    },
    {
      name: 'Zero-G Stardust Dewdrop',
      geometry: 'Zero-Gravity Dewdrop',
      resonance: '174 Hz Deep Foundation',
      splineType: 'Dynamic Surface Tension Spline',
      feel: 'Fluid & Morphic',
    },
  ];

  const handleCopyPreset = (name: string) => {
    playUiChime(isMuted);
    setCopiedPreset(name);
    setTimeout(() => setCopiedPreset(null), 2500);
  };

  return (
    <PageTransitionWrapper pageId="dream-shaper-page">
      {/* Chamber Header */}
      <PageHeader
        title="The Dream Matter Shaper"
        subtitle="Manipulate fluid SVG Bézier geometries in real-time. Experience spring-driven shape morphs, zero-gravity cursor physics, and sonic dream resonances."
        chamberNumber="Chamber IV"
        badge="Interactive Metamorphosis Laboratory"
        icon={<Wand2 className="w-8 h-8 text-[#c7b6df]" />}
      />

      {/* 1. Main Interactive Dream Shaper Component */}
      <DreamShaper isMuted={isMuted} />

      {/* Clouds Divider */}
      <ShapeDivider variant="clouds" />

      {/* 2. Shape Alchemist Workshop — Preset Cards */}
      <section className="py-14 px-4 sm:px-6 bg-[#fdf6ec]/80 dark:bg-[#1a1730] border-y border-[#f0dfcf] dark:border-[#43395c] transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4d7df]/50 dark:bg-[#302847] text-[#a34063] dark:text-[#dba7b9] text-xs font-semibold uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5 text-[#f5c96a]" />
              <span>Stardust Topology</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2]">
              Dream Geometry Matrix
            </h2>
            <p className="text-sm text-[#6e544b] dark:text-[#dcd2ea] mt-1">
              Every shape in the observatory is mapped to a specific sensory texture and mathematical spline curve.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {presets.map((preset) => (
              <div
                key={preset.name}
                className="p-5 rounded-3xl bg-white dark:bg-[#252042] border border-[#f0dfcf] dark:border-[#43395c] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-[#a34063] dark:text-[#dba7b9] uppercase tracking-wider mb-1">
                    {preset.geometry}
                  </div>
                  <h3 className="text-base font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2] mb-3">
                    {preset.name}
                  </h3>

                  <div className="space-y-1.5 text-xs text-[#6e544b] dark:text-[#dcd2ea] border-t border-[#f0dfcf]/60 dark:border-[#43395c]/60 pt-3">
                    <div>
                      <span className="text-[#9c8278] dark:text-[#a69bb8]">Spline:</span> {preset.splineType}
                    </div>
                    <div>
                      <span className="text-[#9c8278] dark:text-[#a69bb8]">Texture:</span> {preset.feel}
                    </div>
                    <div className="flex items-center gap-1 text-[#a34063] dark:text-[#f5c96a] font-semibold">
                      <Volume2 className="w-3 h-3" />
                      <span>{preset.resonance}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <button
                    onClick={() => handleCopyPreset(preset.name)}
                    className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-[#fff8f1] dark:bg-[#302847] border border-[#f0dfcf] dark:border-[#43395c] text-[#6e544b] dark:text-[#dcd2ea] hover:bg-[#f4d7df]/50 hover:text-[#a34063] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {copiedPreset === preset.name ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">Preset Linked!</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-[#f5c96a]" />
                        <span>Tune to this Shape</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dunes Divider */}
      <ShapeDivider variant="dunes" />

      {/* Chamber Portals Navigation */}
      <ChamberPortalsNav currentPath="/dream-shaper" />
    </PageTransitionWrapper>
  );
};
