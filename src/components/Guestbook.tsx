import React, { useState, useEffect } from 'react';
import {
  BookHeart,
  Send,
  Sparkles,
  AlertCircle,
  Heart,
  Radio,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { validateGuestbookEntry } from '../utils/dreamLogic';
import { playUiChime, playMagicChime } from '../utils/soundEffects';
import { recordVisitorWish, loadVisitorProfile } from '../utils/visitorMemory';

interface GuestbookProps {
  isMuted: boolean;
}

export interface WishEntry {
  id: string;
  name: string;
  wish: string;
  timestamp: string;
  starColor: string;
  category?: string;
  reactions?: { sparkle: number; heart: number };
}

const STORAGE_KEY = 'pip_midnight_guestbook_wishes';

const SEED_WISHES: WishEntry[] = [
  {
    id: 'wish-seed-1',
    name: 'Barnaby the Dormouse',
    wish: 'May the wind keep the chimney warm and all acorns stay sweet until spring.',
    timestamp: '11:42 PM',
    starColor: '#f5c96a',
    category: 'Rest & Warmth',
    reactions: { sparkle: 14, heart: 8 },
  },
  {
    id: 'wish-seed-2',
    name: 'Oona the Owl',
    wish: 'Wishing for gentle updrafts over the lake so my wings don’t tire before moonset.',
    timestamp: '12:05 AM',
    starColor: '#c7b6df',
    category: 'Little Ones',
    reactions: { sparkle: 21, heart: 12 },
  },
  {
    id: 'wish-seed-3',
    name: 'Starlight Weaver',
    wish: 'For every restless thinker to remember that tomorrow is fresh and kind.',
    timestamp: '1:14 AM',
    starColor: '#dba7b9',
    category: 'Hope & Courage',
    reactions: { sparkle: 39, heart: 27 },
  },
  {
    id: 'wish-seed-4',
    name: 'Captain Flufftail',
    wish: 'Soft cloud pillows for all the newborns crying their first teeth in.',
    timestamp: '2:30 AM',
    starColor: '#f5c96a',
    category: 'Little Ones',
    reactions: { sparkle: 18, heart: 15 },
  },
];

const CATEGORIES = ['All', 'Rest & Warmth', 'Hope & Courage', 'Little Ones'];

export const Guestbook: React.FC<GuestbookProps> = ({ isMuted }) => {
  const [wishes, setWishes] = useState<WishEntry[]>(SEED_WISHES);
  const [name, setName] = useState<string>('');
  const [wish, setWish] = useState<string>('');
  const [category, setCategory] = useState<string>('Rest & Warmth');
  const [selectedStarColor, setSelectedStarColor] = useState<string>('#f5c96a');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(true);

  // Pre-fill name from visitor profile if set
  useEffect(() => {
    const profile = loadVisitorProfile();
    if (profile && profile.name && profile.name !== 'Little Dreamer') {
      setName(profile.name);
    }
  }, []);

  // Fetch real wishes from backend
  const fetchWishes = async () => {
    try {
      const response = await fetch('/api/wishes');
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.wishes) && data.wishes.length > 0) {
          setWishes(data.wishes);
          setIsLiveConnected(true);
          // Cache in localStorage as offline mirror
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data.wishes));
          return;
        }
      }
    } catch {
      // Backend unavailable; fallback to localStorage
      setIsLiveConnected(false);
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setWishes(parsed);
          }
        }
      } catch {}
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const validation = validateGuestbookEntry(name, wish);
    if (!validation.valid) {
      setError(validation.error || 'Please check your inputs.');
      playUiChime(isMuted);
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      wish: wish.trim(),
      category,
      starColor: selectedStarColor,
    };

    try {
      const response = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        playMagicChime(isMuted);
        recordVisitorWish();

        const newWish: WishEntry = data.wish || {
          id: `wish-${Date.now()}`,
          ...payload,
          timestamp: 'Just now',
          reactions: { sparkle: 1, heart: 1 },
        };

        const updated = [newWish, ...wishes.filter((w) => w.id !== newWish.id)];
        setWishes(updated);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.slice(0, 50)));
        } catch {}

        setWish('');
        setSuccessMessage('✦ Your wish is permanently sealed in the Observatory Backend! ✦');
        setTimeout(() => setSuccessMessage(null), 5000);
        setIsSubmitting(false);
        return;
      }
    } catch {
      // Offline fallback
    }

    // Local fallback if server unreachable
    playMagicChime(isMuted);
    recordVisitorWish();
    const now = new Date();
    const fallbackEntry: WishEntry = {
      id: `wish-${Date.now()}`,
      name: name.trim(),
      wish: wish.trim(),
      category,
      starColor: selectedStarColor,
      timestamp: `${now.getHours() % 12 || 12}:${now.getMinutes().toString().padStart(2, '0')} ${
        now.getHours() >= 12 ? 'PM' : 'AM'
      }`,
      reactions: { sparkle: 1, heart: 1 },
    };

    const updated = [fallbackEntry, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.slice(0, 50)));
    } catch {}

    setWish('');
    setSuccessMessage('✦ Your wish is tucked into Pip’s bedside jar! ✦');
    setTimeout(() => setSuccessMessage(null), 5000);
    setIsSubmitting(false);
  };

  const handleReaction = async (wishId: string, type: 'sparkle' | 'heart') => {
    playUiChime(isMuted);

    // Optimistic update
    setWishes((prev) =>
      prev.map((w) => {
        if (w.id === wishId) {
          const reactions = { ...(w.reactions || { sparkle: 0, heart: 0 }) };
          reactions[type] = (reactions[type] || 0) + 1;
          return { ...w, reactions };
        }
        return w;
      })
    );

    try {
      await fetch(`/api/wishes/${wishId}/reaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });
    } catch {
      // Server reaction sync fallback
    }
  };

  const filteredWishes =
    activeFilter === 'All'
      ? wishes
      : wishes.filter((w) => w.category === activeFilter);

  return (
    <div
      id="guestbook"
      className="bg-[#ffffff] dark:bg-[#252042] rounded-3xl p-6 sm:p-8 border border-[#f0dfcf] dark:border-[#43395c] shadow-lg flex flex-col justify-between transition-colors"
      data-testid="live-dream-guestbook"
    >
      <div>
        {/* Header with live backend badge */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <BookHeart className="w-5 h-5 text-[#a34063] dark:text-[#f5c96a]" aria-hidden="true" />
            <span className="text-xs font-semibold text-[#a34063] dark:text-[#dba7b9] uppercase tracking-wider">
              Live Dream Guestbook
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-[11px] font-mono text-emerald-700 dark:text-emerald-300">
            <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
            <span>{isLiveConnected ? 'Live Backend API' : 'Cached Relay'}</span>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2] mb-2">
          Leave a Bedtime Wish for Pip & the Nursery
        </h3>
        <p className="text-xs text-[#6e544b] dark:text-[#dcd2ea] leading-relaxed mb-6">
          Every wish is transmitted to the observatory server and woven into the nightly telemetry sky.
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="guest-name"
                className="text-xs font-medium text-[#5c4033] dark:text-[#fcf8f2] block mb-1"
              >
                Dreamer Name / Callsign
              </label>
              <input
                id="guest-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sleepless Firefly, Aster"
                maxLength={40}
                required
                className="w-full text-xs py-2 px-3 rounded-xl bg-[#fff8f1] dark:bg-[#1a1730] border border-[#f0dfcf] dark:border-[#43395c] text-[#402c25] dark:text-[#fcf8f2] placeholder-[#9c8278] focus:border-[#a34063] dark:focus:border-[#f5c96a] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="guest-category"
                className="text-xs font-medium text-[#5c4033] dark:text-[#fcf8f2] block mb-1"
              >
                Wish Realm
              </label>
              <select
                id="guest-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs py-2 px-3 rounded-xl bg-[#fff8f1] dark:bg-[#1a1730] border border-[#f0dfcf] dark:border-[#43395c] text-[#402c25] dark:text-[#fcf8f2] focus:outline-none"
              >
                <option value="Rest & Warmth">Rest & Warmth</option>
                <option value="Hope & Courage">Hope & Courage</option>
                <option value="Little Ones">Little Ones</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="guest-wish"
              className="text-xs font-medium text-[#5c4033] dark:text-[#fcf8f2] block mb-1"
            >
              Your Bedtime Wish
            </label>
            <textarea
              id="guest-wish"
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              placeholder="Write a sweet, calming bedtime thought..."
              rows={2}
              maxLength={280}
              required
              className="w-full text-xs py-2 px-3 rounded-xl bg-[#fff8f1] dark:bg-[#1a1730] border border-[#f0dfcf] dark:border-[#43395c] text-[#402c25] dark:text-[#fcf8f2] placeholder-[#9c8278] focus:border-[#a34063] dark:focus:border-[#f5c96a] focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Color palette selector */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-[#6e544b] dark:text-[#dcd2ea]">
              Star Hue:
            </span>
            <div className="flex gap-2">
              {['#f5c96a', '#dba7b9', '#c7b6df', '#99e1d9'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedStarColor(c)}
                  className={`w-5 h-5 rounded-full transition-all cursor-pointer ${
                    selectedStarColor === c
                      ? 'ring-2 ring-offset-2 ring-[#a34063] scale-110'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c }}
                  aria-label={`Select star color ${c}`}
                />
              ))}
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-xl">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl font-medium animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
              <span>{successMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#a34063] hover:bg-[#8f3454] disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-[0.99]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Transmitting to Server...' : 'Send Live Wish to Pip'}</span>
          </button>
        </form>

        {/* Filter Bar */}
        <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-[#f0dfcf] dark:border-[#43395c]">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-[#9c8278] dark:text-[#a69bb8]">
            <Filter className="w-3 h-3" />
            <span>Filter:</span>
          </div>
          <div className="flex gap-1 overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-[#a34063] text-white shadow-2xs'
                    : 'bg-[#fff8f1] dark:bg-[#1a1730] text-[#6e544b] dark:text-[#dcd2ea] hover:bg-[#f0dfcf]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Wishes Feed */}
        <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
          {filteredWishes.map((entry) => (
            <div
              key={entry.id}
              className="p-3 rounded-2xl bg-[#fff8f1] dark:bg-[#1a1730] border border-[#f0dfcf] dark:border-[#43395c] text-xs space-y-1.5 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#402c25] dark:text-[#fcf8f2] flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shadow-xs"
                    style={{ backgroundColor: entry.starColor }}
                  />
                  {entry.name}
                </span>
                <span className="text-[10px] text-[#9c8278] dark:text-[#a69bb8] font-mono">
                  {entry.timestamp}
                </span>
              </div>

              <p className="text-[#6e544b] dark:text-[#dcd2ea] italic leading-relaxed">
                "{entry.wish}"
              </p>

              {/* Reaction Buttons */}
              <div className="flex items-center justify-between pt-1 text-[11px]">
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#f4d7df]/50 dark:bg-[#302847] text-[#a34063] dark:text-[#dba7b9]">
                  {entry.category || 'Rest & Warmth'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleReaction(entry.id, 'sparkle')}
                    aria-label={`Send sparkles to wish from ${entry.name}`}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-lg hover:bg-white dark:hover:bg-[#252042] text-[#916b15] dark:text-[#f5c96a] transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-[#f5c96a]" />
                    <span>{entry.reactions?.sparkle || 0}</span>
                  </button>

                  <button
                    onClick={() => handleReaction(entry.id, 'heart')}
                    aria-label={`Send heart to wish from ${entry.name}`}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-lg hover:bg-white dark:hover:bg-[#252042] text-rose-500 transition-all cursor-pointer"
                  >
                    <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />
                    <span>{entry.reactions?.heart || 0}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
