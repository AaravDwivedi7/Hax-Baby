import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ProjectsShowcase } from '../components/ProjectsShowcase';
import { ShapeDivider } from '../components/ShapeDivider';
import { ChamberPortalsNav } from '../components/ChamberPortalsNav';
import { PageTransitionWrapper } from '../components/PageTransitionWrapper';
import { Music, Sparkles, Award, Lightbulb, MapPin, Zap } from 'lucide-react';

interface ProjectsPageProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ isMuted, onToggleMute }) => {
  return (
    <PageTransitionWrapper pageId="projects-page">
      {/* Chamber Header */}
      <PageHeader
        title="Nocturnal Inventions & Lullaby Lab"
        subtitle="Explore Pip’s three core hackathon projects: an acoustic Lullaby Synthesizer, an ambient Nightlight Color Harmonizer, and the Global Dream Delivery Route Map."
        chamberNumber="Chamber III"
        badge="haX.baby Hackathon Suite"
        icon={<Music className="w-8 h-8 text-[#99e1d9]" />}
      />

      {/* 1. Projects Showcase — Three Complete Interactive Projects */}
      <ProjectsShowcase isMuted={isMuted} onToggleMute={onToggleMute} />

      {/* Constellations Divider */}
      <ShapeDivider variant="constellations" />

      {/* 2. Hackathon Engineering Blueprints & Jury Rubric */}
      <section className="py-14 px-4 sm:px-6 bg-[#fff8f1] dark:bg-[#1a1730] border-t border-[#f0dfcf] dark:border-[#43395c] transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4d7df]/50 dark:bg-[#302847] text-[#a34063] dark:text-[#dba7b9] text-xs font-semibold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5 text-[#f5c96a]" />
              <span>Engineering Specifications</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2]">
              The haX.baby Invention Rubric
            </h2>
            <p className="text-sm text-[#6e544b] dark:text-[#dcd2ea] mt-1">
              Every invention is architected with strict adherence to infant safety, zero startling animations, and pure offline browser synthesis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#252042] border border-[#f0dfcf] dark:border-[#43395c] shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-[#f4d7df] dark:bg-[#3d3257] text-[#a34063] dark:text-[#dba7b9] flex items-center justify-center mb-4">
                <Music className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2]">
                Acoustic Harmonics
              </h3>
              <p className="text-xs sm:text-sm text-[#6e544b] dark:text-[#dcd2ea] mt-2 leading-relaxed">
                Tuned strictly with Web Audio sine oscillators and Bessel lowpass filtering to eliminate sharp transients that could startle an infant.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#252042] border border-[#f0dfcf] dark:border-[#43395c] shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-[#fcf1d8] dark:bg-[#3d3428] text-[#f5c96a] flex items-center justify-center mb-4">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2]">
                Circadian Photometrics
              </h3>
              <p className="text-xs sm:text-sm text-[#6e544b] dark:text-[#dcd2ea] mt-2 leading-relaxed">
                Nightlight spectrum operates in 2200K–2700K warm amber wavelengths, avoiding blue-spectrum melatonin suppression for better sleep.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#252042] border border-[#f0dfcf] dark:border-[#43395c] shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-[#e8f7f5] dark:bg-[#283842] text-[#99e1d9] flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2]">
                Global Slumber Routing
              </h3>
              <p className="text-xs sm:text-sm text-[#6e544b] dark:text-[#dcd2ea] mt-2 leading-relaxed">
                Calculates real-time solar terminator lines to deliver soothing dreams along the planetary twilight zone as each hemisphere sleeps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Waves Divider */}
      <ShapeDivider variant="waves" />

      {/* Chamber Portals Navigation */}
      <ChamberPortalsNav currentPath="/projects" />
    </PageTransitionWrapper>
  );
};
