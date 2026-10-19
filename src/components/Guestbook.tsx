import React, { useState, useEffect } from 'react';
import { BookHeart, Send, Sparkles, AlertCircle } from 'lucide-react';
import { validateGuestbookEntry } from '../utils/dreamLogic';
import { playUiChime, playMagicChime } from '../utils/soundEffects';

interface GuestbookProps {
  isMuted: boolean;
}

interface WishEntry {
  id: string;
  name: string;
  wish: string;
  timestamp: string;
  starColor: string;
}

const STORAGE_KEY = 'pip_midnight_guestbook_wishes';

const INITIAL_WISHES: WishEntry[] = [
  {
    id: 'seed-1',
    name: 'Barnaby the Dormouse',
    wish: 'May the wind keep the chimney warm and all acorns stay sweet until spring.',
    timestamp: '11:42 PM',
    starColor: '#f5c96a',
  },
  {
    id: 'seed-2',
    name: 'Oona the Owl',
    wish: 'Wishing for gentle updrafts over the lake so my wings don’t tire before moonset.',
    timestamp: '12:05 AM',
    starColor: '#c7b6df',
  },
  {
    id: 'seed-3',
    name: 'Starlight Weaver',
    wish: 'For every restless thinker to remember that tomorrow is fresh and kind.',
    timestamp: '1:14 AM',
    starColor: '#dba7b9',
  },
];

export const Guestbook: React.FC<GuestbookProps> = ({ isMuted }) => {
  const [wishes, setWishes] = useState<WishEntry[]>(INITIAL_WISHES);
  const [name, setName] = useState<string>('');
  const [wish, setWish] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setWishes(parsed);
        }
      }
    } catch {
      // Safe fallback
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const validation = validateGuestbookEntry(name, wish);
    if (!validation.valid) {
      setError(validation.error || 'Please check your inputs.');
      playUiChime(isMuted);
      return;
    }

    playMagicChime(isMuted);

    const colors = ['#f5c96a', '#dba7b9', '#c7b6df', '#f4d7df'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const now = new Date();
    const timeString = `${now.getHours() % 12 || 12}:${now.getMinutes().toString().padStart(2, '0')} ${
      now.getHours() >= 12 ? 'PM' : 'AM'
    }`;

    const newEntry: WishEntry = {
      id: `wish-${Date.now()}`,
      name: name.trim(),
      wish: wish.trim(),
      timestamp: timeString,
      starColor: randomColor,
    };

    const updated = [newEntry, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.slice(0, 30)));
    } catch {}

    setName('');
    setWish('');
    setSuccessMessage('Your dream wish has been tucked into Pip’s bedside jar! ✦');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  return (
    <div
      id="guestbook"
      className="bg-[#ffffff] dark:bg-[#302847] rounded-3xl p-6 sm:p-8 border border-[#f0dfcf] dark:border-[#43395c] shadow-md flex flex-col justify-between transition-colors"
    >
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <BookHeart className="w-4 h-4 text-[#a34063] dark:text-[#f5c96a]" aria-hidden="true" />
            <span className="text-xs font-semibold text-[#a34063] dark:text-[#dba7b9] uppercase tracking-wider">
              Nursery Dream Wishbook
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#9c8278] dark:text-[#a69bb8]">
            Local Browser Diary
          </span>
        </div>

        <h3 className="text-xl font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2] mb-2">
          Leave a Bedtime Wish for Pip
        </h3>
        <p className="text-xs text-[#6e544b] dark:text-[#dcd2ea] leading-relaxed mb-6">
          Write a comforting wish for the neighborhood or yourself. Entries are stored in your browser's local journal.
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-3 mb-6">
          <div>
            <label htmlFor="guest-name" className="text-xs font-medium text-[#5c4033] dark:text-[#fcf8f2] block mb-1">
              Your Name or Dream Pseudonym
            </label>
            <input
              id="guest-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sleepless Firefly, Aster, Little Bear"
              maxLength={40}
              className="w-full text-xs py-2 px-3 rounded-xl bg-[#fff8f1] dark:bg-[#28213d] border border-[#f0dfcf] dark:border-[#43395c] text-[#402c25] dark:text-[#fcf8f2] placeholder-[#9c8278] focus:border-[#a34063] dark:focus:border-[#f5c96a] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="guest-wish" className="text-xs font-medium text-[#5c4033] dark:text-[#fcf8f2] block mb-1">
              Your Bedtime Wish
            </label>
            <textarea
              id="guest-wish"
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              placeholder="Write a sweet, calming bedtime thought..."
              rows={2}
              maxLength={280}
              className="w-full text-xs py-2 px-3 rounded-xl bg-[#fff8f1] dark:bg-[#28213d] border border-[#f0dfcf] dark:border-[#43395c] text-[#402c25] dark:text-[#fcf8f2] placeholder-[#9c8278] focus:border-[#a34063] dark:focus:border-[#f5c96a] focus:outline-none transition-colors resize-none"
            />
          </div>

          {error && (
            <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 p-2 rounded-lg">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg font-medium">
              <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#f5c96a]" />
              <span>{successMessage}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#a34063] hover:bg-[#8f3454] transition-all flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Tuck Wish into Jar</span>
          </button>
        </form>

        {/* Recent Wishes Carousel / List */}
        <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
          <span className="text-[11px] font-semibold text-[#9c8278] dark:text-[#a69bb8] block">
            Recent Nursery Wishes ({wishes.length}):
          </span>

          {wishes.slice(0, 4).map((entry) => (
            <div
              key={entry.id}
              className="p-3 rounded-xl bg-[#fff8f1] dark:bg-[#28213d] border border-[#f0dfcf] dark:border-[#43395c] text-xs space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#402c25] dark:text-[#fcf8f2] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.starColor }} />
                  {entry.name}
                </span>
                <span className="text-[10px] text-[#9c8278] dark:text-[#a69bb8] font-mono">
                  {entry.timestamp}
                </span>
              </div>
              <p className="text-[#6e544b] dark:text-[#dcd2ea] italic">
                "{entry.wish}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
