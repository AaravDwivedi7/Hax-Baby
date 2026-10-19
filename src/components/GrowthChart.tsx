import React from 'react';
import { Sparkles, Star, Music, Compass, BookOpen, Award, Check } from 'lucide-react';
import { GROWTH_METRICS } from '../utils/dreamLogic';

export const GrowthChart: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Music':
        return Music;
      case 'Sparkles':
        return Sparkles;
      case 'Compass':
        return Compass;
      case 'BookOpen':
        return BookOpen;
      default:
        return Sparkles;
    }
  };

  return (
    <section
      id="growth"
      className="py-16 md:py-24 bg-[#fef4e8] dark:bg-[#1a1730] border-y border-[#f0dfcf] dark:border-[#43395c] transition-colors"
      aria-label="Pip's Nursery Growth Chart"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-[#a34063] dark:text-[#dba7b9] uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5 text-[#f5c96a]" aria-hidden="true" />
            <span>Midnight Nursery Official Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2] tracking-tight">
            Nursery Wall Growth Board
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6e544b] dark:text-[#dcd2ea]">
            Penciled tick marks measured against the nursery doorframe. Fictional bedtime progress recorded by Chief Nursery Matron.
          </p>
        </div>

        {/* Nursery Wooden Ruler Board Container */}
        <div className="max-w-4xl mx-auto bg-[#ffffff] dark:bg-[#302847] rounded-3xl p-6 sm:p-10 border-2 border-[#f0dfcf] dark:border-[#43395c] shadow-xl relative overflow-hidden">
          {/* Decorative ruler notch strip on top */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b-2 border-dashed border-[#f0dfcf] dark:border-[#43395c] text-xs text-[#9c8278] dark:text-[#a69bb8] font-mono">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#f5c96a]" aria-hidden="true" />
              <span>MEASURING POST #04</span>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <span>| 10cm</span>
              <span>| 20cm</span>
              <span>| 30cm</span>
              <span>| 40cm</span>
              <span>| 50cm</span>
            </div>
            <span className="font-display italic text-[#a34063] dark:text-[#dba7b9]">
              “Still small enough to curl in a basket”
            </span>
          </div>

          {/* 4 Skill Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GROWTH_METRICS.map((metric) => {
              const IconComponent = getIcon(metric.iconName);

              return (
                <div
                  key={metric.id}
                  className="p-5 rounded-2xl bg-[#fff8f1] dark:bg-[#28213d] border border-[#f0dfcf] dark:border-[#43395c] flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-all duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="p-2 rounded-xl bg-[#f4d7df]/50 dark:bg-[#392f50] text-[#a34063] dark:text-[#dba7b9] shadow-2xs">
                          <IconComponent className="w-4 h-4" />
                        </span>
                        <div>
                          <h3 className="text-sm font-bold text-[#402c25] dark:text-[#fcf8f2]">
                            {metric.skill}
                          </h3>
                          <span className="text-xs text-[#a34063] dark:text-[#dba7b9] font-medium">
                            {metric.currentLevel}
                          </span>
                        </div>
                      </div>

                      {/* Whimsical progress tag */}
                      <span className="text-xs font-mono font-bold text-[#5c4033] dark:text-[#f5c96a] bg-[#ffffff] dark:bg-[#302847] px-2.5 py-1 rounded-md border border-[#f0dfcf] dark:border-[#43395c]">
                        {metric.score} pts
                      </span>
                    </div>

                    {/* Progress indicator bar styled like a warm measuring tape with light shimmer */}
                    <div className="w-full bg-[#f0dfcf] dark:bg-[#43395c] h-3.5 rounded-full overflow-hidden mb-3 relative">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#dba7b9] via-[#a34063] to-[#f5c96a] transition-all duration-1000 relative overflow-hidden"
                        style={{ width: `${metric.score}%` }}
                        role="progressbar"
                        aria-valuenow={metric.score}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${metric.skill} mastery: ${metric.score}%`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full h-full animate-shimmer pointer-events-none" />
                      </div>
                    </div>

                    <p className="text-xs text-[#6e544b] dark:text-[#dcd2ea] leading-relaxed italic">
                      "{metric.note}"
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#f0dfcf] dark:border-[#43395c] flex items-center justify-between text-[11px] text-[#9c8278] dark:text-[#a69bb8]">
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <Check className="w-3 h-3" />
                      <span>Certified After Bedtime</span>
                    </span>
                    <span>Season: Autumn '26</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Matron's note stamp */}
          <div className="mt-8 p-4 rounded-2xl bg-[#f4d7df]/30 dark:bg-[#28213d] border border-[#dba7b9]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#f5c96a] text-[#5c4033] flex items-center justify-center font-bold text-xs shrink-0">
                <Star className="w-4 h-4 fill-current text-[#5c4033]" />
              </span>
              <div>
                <span className="text-xs font-bold text-[#402c25] dark:text-[#fcf8f2] block">
                  Matron Marigold’s Inspection Seal:
                </span>
                <span className="text-xs text-[#6e544b] dark:text-[#dcd2ea]">
                  “Pip continues to show exceptional empathy for restless sleepers. Needs to remember to drink his warm milk before 11 PM.”
                </span>
              </div>
            </div>
            <span className="text-xs font-mono text-[#a34063] dark:text-[#dba7b9] whitespace-nowrap flex items-center gap-1">
              <span>Grade: Satisfactory</span>
              <Sparkles className="w-3.5 h-3.5 text-[#f5c96a]" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
