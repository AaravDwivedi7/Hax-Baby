import React, { useState, useEffect } from 'react';
import { MoonStar, Sparkles } from 'lucide-react';
import { formatOdometer } from '../utils/dreamLogic';
import { playUiChime } from '../utils/soundEffects';

interface VisitorOdometerProps {
  isMuted: boolean;
}

const STORAGE_KEY = 'pip_midnight_dreams_odometer';
const INITIAL_COUNT = 1717;

export const VisitorOdometer: React.FC<VisitorOdometerProps> = ({ isMuted }) => {
  const [count, setCount] = useState<number>(INITIAL_COUNT);
  const [recentlyIncremented, setRecentlyIncremented] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= INITIAL_COUNT) {
          setCount(parsed);
        }
      }
    } catch {
      // Safe fallback if localStorage is restricted
    }
  }, []);

  const handleIncrement = () => {
    playUiChime(isMuted);
    setCount((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem(STORAGE_KEY, next.toString());
      } catch {}
      return next;
    });

    setRecentlyIncremented(true);
    setTimeout(() => setRecentlyIncremented(false), 600);
  };

  const digits = formatOdometer(count).split('');

  return (
    <div className="bg-[#ffffff] dark:bg-[#302847] rounded-3xl p-6 sm:p-8 border border-[#f0dfcf] dark:border-[#43395c] shadow-md flex flex-col justify-between transition-colors">
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <MoonStar className="w-4 h-4 text-[#a34063] dark:text-[#f5c96a]" aria-hidden="true" />
            <span className="text-xs font-semibold text-[#a34063] dark:text-[#dba7b9] uppercase tracking-wider">
              Nursery Sleep Log Odometer
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#9c8278] dark:text-[#a69bb8]">
            Fictional Bedtime Counter
          </span>
        </div>

        <h3 className="text-xl font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2] mb-2">
          Dreams Delivered Tonight
        </h3>
        <p className="text-xs text-[#6e544b] dark:text-[#dcd2ea] leading-relaxed mb-6">
          Every time a child or sleepy owl yawns, Pip clicks the brass counter on the observatory ledge.
        </p>

        {/* Retro Mechanical Odometer Display */}
        <div
          className="flex items-center justify-center gap-1.5 p-4 rounded-2xl bg-[#201d39] border-2 border-[#43395c] shadow-inner mb-6"
          role="status"
          aria-label={`Dreams delivered counter: ${count}`}
        >
          {digits.map((digit, idx) => (
            <div
              key={idx}
              className={`w-9 h-12 rounded-lg bg-[#302847] border border-[#43395c] flex items-center justify-center text-xl font-bold font-mono text-[#f5c96a] shadow-xs transition-transform duration-200 ${
                recentlyIncremented && idx === digits.length - 1 ? 'scale-110 -translate-y-1' : ''
              }`}
            >
              {digit}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleIncrement}
        aria-label="Click to record one more dream delivered to the nursery"
        className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white bg-[#a34063] hover:bg-[#8f3454] transition-all flex items-center justify-center gap-2 shadow-xs active:scale-[0.99]"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#f5c96a]" aria-hidden="true" />
        <span>Tally One More Sleepy Dream</span>
      </button>
    </div>
  );
};
