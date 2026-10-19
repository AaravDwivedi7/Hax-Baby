import React from 'react';
import { Sparkles } from 'lucide-react';
import { LullabyLab } from './LullabyLab';
import { NightlightCollection } from './NightlightCollection';
import { DreamDeliveryMap } from './DreamDeliveryMap';

interface ProjectsShowcaseProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ isMuted, onToggleMute }) => {
  return (
    <section
      id="projects"
      className="py-16 md:py-24 bg-[#fff8f1] dark:bg-[#201d39] transition-colors"
      aria-label="Pip's Showcase Projects"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-[#a34063] dark:text-[#dba7b9] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#f5c96a]" aria-hidden="true" />
            <span>Interactive Workshop Inventions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2] tracking-tight">
            Dream Engineering Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6e544b] dark:text-[#dcd2ea]">
            Every project is tested thoroughly after twilight. Choose a project below to play, illuminate, or dispatch a dream.
          </p>
        </div>

        {/* 3 Interactive Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          <LullabyLab isMuted={isMuted} onToggleMute={onToggleMute} />
          <NightlightCollection isMuted={isMuted} />
          <DreamDeliveryMap isMuted={isMuted} />
        </div>
      </div>
    </section>
  );
};
