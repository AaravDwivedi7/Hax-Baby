import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Observatory } from '../components/Observatory';
import { ShapeDivider } from '../components/ShapeDivider';
import { ChamberPortalsNav } from '../components/ChamberPortalsNav';
import { PageTransitionWrapper } from '../components/PageTransitionWrapper';
import { Star, Sparkles, Compass, Eye, Radio, Orbit } from 'lucide-react';

interface ObservatoryPageProps {
  isMuted: boolean;
}

export const ObservatoryPage: React.FC<ObservatoryPageProps> = ({ isMuted }) => {
  const celestialObjects = [
    {
      name: 'Ursa Lullaby',
      type: 'Major Constellation',
      coordinates: 'RA 11h 03m / Dec +61°',
      note: 'Generates a soft humming tone in G-minor that calms colicky infants.',
    },
    {
      name: 'Cradle Nebula (NGC 7023)',
      type: 'Reflection Nebula',
      coordinates: 'RA 21h 01m / Dec +68°',
      note: 'A soft lavender-pink stellar nursery where baby stars form inside dust blankets.',
    },
    {
      name: 'The Slumber Ring',
      type: 'Planetary Ring System',
      coordinates: 'RA 18h 44m / Dec -06°',
      note: 'Particles composed of icy chamomile crystals scattering warm golden starlight.',
    },
  ];

  return (
    <PageTransitionWrapper pageId="observatory-page">
      {/* Chamber Header */}
      <PageHeader
        title="Celestial Stargazer Vault"
        subtitle="Ascend to the observatory dome. Pan through the 360-degree interactive star field, connect constellations, and listen to the music of celestial spheres."
        chamberNumber="Chamber V"
        badge="Deep Cosmos & Stargazer Dome"
        icon={<Star className="w-8 h-8 text-[#f5c96a]" />}
      />

      {/* 1. Main Interactive Observatory Sky Component */}
      <Observatory isMuted={isMuted} />

      {/* Constellations Divider */}
      <ShapeDivider variant="constellations" />

      {/* 2. Deep Sky Catalog */}
      <section className="py-14 px-4 sm:px-6 bg-[#fff8f1] dark:bg-[#1a1730] border-t border-[#f0dfcf] dark:border-[#43395c] transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4d7df]/50 dark:bg-[#302847] text-[#a34063] dark:text-[#dba7b9] text-xs font-semibold uppercase tracking-wider mb-2">
              <Orbit className="w-3.5 h-3.5 text-[#f5c96a]" />
              <span>Sky Registry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2]">
              Tonight's Celestial Coordinates
            </h2>
            <p className="text-sm text-[#6e544b] dark:text-[#dcd2ea] mt-1">
              Stellar bodies currently aligned with Pip's brass observatory telescope.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {celestialObjects.map((obj) => (
              <div
                key={obj.name}
                className="p-6 rounded-3xl bg-white dark:bg-[#252042] border border-[#f0dfcf] dark:border-[#43395c] shadow-xs"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-[#a34063] dark:text-[#dba7b9] uppercase tracking-wider">
                    {obj.type}
                  </span>
                  <span className="text-[11px] font-mono text-[#9c8278] dark:text-[#a69bb8]">
                    {obj.coordinates}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2] mb-2">
                  {obj.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#6e544b] dark:text-[#dcd2ea] leading-relaxed">
                  {obj.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clouds Divider */}
      <ShapeDivider variant="clouds" />

      {/* Chamber Portals Navigation */}
      <ChamberPortalsNav currentPath="/observatory" />
    </PageTransitionWrapper>
  );
};
