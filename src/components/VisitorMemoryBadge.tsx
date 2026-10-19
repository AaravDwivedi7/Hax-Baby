import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  UserCheck,
  Edit2,
  Check,
  Star,
  MessageCircle,
  Heart,
  Compass,
} from 'lucide-react';
import {
  loadVisitorProfile,
  updateVisitorProfileName,
  generateCustomGreeting,
  type VisitorProfile,
} from '../utils/visitorMemory';
import { playUiChime, playMagicChime } from '../utils/soundEffects';

interface VisitorMemoryBadgeProps {
  isMuted: boolean;
  onOpenChat?: () => void;
}

export const VisitorMemoryBadge: React.FC<VisitorMemoryBadgeProps> = ({
  isMuted,
  onOpenChat,
}) => {
  const [profile, setProfile] = useState<VisitorProfile | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    const loaded = loadVisitorProfile();
    setProfile(loaded);
    setNameInput(loaded.name);
  }, []);

  if (!profile) return null;

  const { greeting, subtext, badge } = generateCustomGreeting(profile);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    playMagicChime(isMuted);
    const updated = updateVisitorProfileName(nameInput);
    setProfile(updated);
    setIsEditingName(false);
  };

  return (
    <div className="w-full bg-[#fcf5eb] dark:bg-[#251e3a] border-b border-[#f0dfcf] dark:border-[#43395c] py-2.5 px-4 sm:px-6 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Left: Custom Greeting & Visit Counter */}
        <div className="flex items-center gap-2.5 text-center md:text-left flex-wrap justify-center md:justify-start">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f4d7df] dark:bg-[#302847] text-[#a34063] dark:text-[#f5c96a] font-bold text-[11px] shadow-2xs">
            <UserCheck className="w-3.5 h-3.5" />
            <span>{badge}</span>
          </span>

          <span className="font-semibold text-[#402c25] dark:text-[#fcf8f2]">
            {greeting}
          </span>
          <span className="hidden lg:inline text-[#6e544b] dark:text-[#dcd2ea] text-[11px]">
            — {subtext}
          </span>
        </div>

        {/* Right: Personalization Actions & Stardust Counter */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Stardust Jar */}
          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white dark:bg-[#302847] border border-[#f0dfcf] dark:border-[#43395c] text-[11px] font-semibold text-[#916b15] dark:text-[#f5c96a]"
            title="Stardust collected from interacting with Pip and leaving wishes"
          >
            <Star className="w-3 h-3 fill-current text-[#f5c96a]" />
            <span>{profile.stardust} Stardust</span>
          </div>

          {/* Name Editor */}
          {isEditingName ? (
            <form onSubmit={handleSaveName} className="flex items-center gap-1">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                maxLength={24}
                className="w-28 text-xs px-2 py-0.5 rounded-lg border border-[#a34063] dark:border-[#f5c96a] bg-white dark:bg-[#1a1730] text-[#402c25] dark:text-white focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                aria-label="Save name"
                className="p-1 rounded-lg bg-[#a34063] text-white hover:bg-[#8f3454] cursor-pointer"
              >
                <Check className="w-3 h-3" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => {
                playUiChime(isMuted);
                setIsEditingName(true);
              }}
              aria-label="Edit your dreamer callsign"
              className="px-2.5 py-1 rounded-xl bg-white dark:bg-[#302847] border border-[#f0dfcf] dark:border-[#43395c] text-[11px] font-medium text-[#6e544b] dark:text-[#dcd2ea] hover:text-[#a34063] dark:hover:text-[#f5c96a] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Edit2 className="w-2.5 h-2.5" />
              <span>Callsign: <strong>{profile.name}</strong></span>
            </button>
          )}

          {/* Quick Chat Orb Trigger */}
          {onOpenChat && (
            <button
              onClick={() => {
                playUiChime(isMuted);
                onOpenChat();
              }}
              aria-label="Chat with Pip"
              className="px-3 py-1 rounded-xl bg-[#a34063] hover:bg-[#8f3454] text-white text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
            >
              <MessageCircle className="w-3 h-3" />
              <span>Chat Pip</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
