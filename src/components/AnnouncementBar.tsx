import React from 'react';
import { Sparkles, Star } from 'lucide-react';

interface AnnouncementBarProps {
  onStarClick?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onStarClick }) => {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <aside
        aria-label="Observatory announcement"
        className="w-full bg-[#f4d7df] dark:bg-[#392f50] text-[#5c4033] dark:text-[#fcf8f2] text-xs sm:text-sm py-2 px-4 transition-colors border-b border-[#f0dfcf] dark:border-[#43395c]"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-medium tracking-wide mx-auto">
            <Sparkles className="w-4 h-4 text-[#a34063] dark:text-[#f5c96a] shrink-0" aria-hidden="true" />
            <span className="flex items-center gap-1.5">
              <span>Midnight Observatory is open</span>
              <Star className="w-3 h-3 text-[#a34063] dark:text-[#f5c96a] fill-current inline shrink-0" aria-hidden="true" />
              <span>Dream deliveries welcome!</span>
            </span>
            <span className="hidden sm:inline text-xs opacity-75">· Midnight Nursery Sector 4</span>
          </div>
          {onStarClick && (
            <button
              onClick={onStarClick}
              aria-label="Tiny mysterious shining star (Easter egg)"
              className="text-[#a34063] dark:text-[#f5c96a] hover:scale-125 transition-transform p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a34063]"
              title="A tiny twinkling star..."
            >
              <Star className="w-3.5 h-3.5 fill-current animate-pulse" aria-hidden="true" />
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
