/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Pip's Midnight Observatory - Master Application
 * haX.baby · Baby's First Website Hackathon (October 17–19, 2026)
 */

import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { TransitionProvider, usePageTransition } from './context/TransitionContext';
import { CrazyPageTransitionOverlay } from './components/CrazyPageTransitionOverlay';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { EasterEggModal } from './components/EasterEggModal';
import { SparkleTrail } from './components/SparkleTrail';
import { VisitorMemoryBadge } from './components/VisitorMemoryBadge';
import { PipChatDrawer } from './components/PipChatDrawer';
import { MessageCircle, Sparkles } from 'lucide-react';
import { playUiChime } from './utils/soundEffects';

// Dedicated Chamber Pages
import { HomePage } from './pages/HomePage';
import { LorePage } from './pages/LorePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { DreamShaperPage } from './pages/DreamShaperPage';
import { ObservatoryPage } from './pages/ObservatoryPage';
import { CommunityPage } from './pages/CommunityPage';

interface AppContentProps {
  isDark: boolean;
  toggleTheme: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  isChaos: boolean;
  toggleChaos: () => void;
  sparklesEnabled: boolean;
  isEasterEggOpen: boolean;
  setIsEasterEggOpen: (open: boolean) => void;
}

const AppContent: React.FC<AppContentProps> = ({
  isDark,
  toggleTheme,
  isMuted,
  toggleMute,
  isChaos,
  toggleChaos,
  sparklesEnabled,
  isEasterEggOpen,
  setIsEasterEggOpen,
}) => {
  const { isTransitioning, targetPageName, transitionMode } = usePageTransition();
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 relative ${
        isChaos ? 'chaos-active font-display' : ''
      }`}
    >
      {/* Unreal SVG Shape-Morphing Full-Screen Transition Overlay */}
      <CrazyPageTransitionOverlay
        isTransitioning={isTransitioning}
        targetPageName={targetPageName}
        mode={transitionMode}
      />

      {/* Optional Sparkle Trail Cursor Effect */}
      <SparkleTrail enabled={sparklesEnabled && !isDark} />

      {/* Retro Announcement Bar with Easter Egg Trigger */}
      <AnnouncementBar onStarClick={() => setIsEasterEggOpen(true)} />

      {/* Hyperlinked Navigation Bar */}
      <Navigation
        isDark={isDark}
        onToggleTheme={toggleTheme}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        isChaos={isChaos}
        onToggleChaos={toggleChaos}
      />

      {/* Visitor Memory Recognition & Returning Stargazer Custom Greeting */}
      <VisitorMemoryBadge
        isMuted={isMuted}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Chaos Mode Retro Indicator (if active) */}
      {isChaos && (
        <div
          role="region"
          aria-label="Chaos Mode Notice"
          className="bg-gradient-to-r from-[#f5c96a] via-[#dba7b9] to-[#c7b6df] text-[#402c25] py-2 px-4 text-center text-xs font-bold shadow-md flex items-center justify-center gap-3 animate-pulse"
        >
          <span>✦ A LITTLE CHAOS MODE ACTIVATED! (Early-Web Stardust Overdrive) ✦</span>
          <button
            onClick={toggleChaos}
            className="underline hover:opacity-80 text-xs px-2 py-0.5 rounded bg-white/40 cursor-pointer"
          >
            Turn Off Chaos
          </button>
        </div>
      )}

      {/* Main Multi-Page Route Outlet with Unreal Morph Presence */}
      <main id="main-content" className="flex-1 flex flex-col relative overflow-hidden">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage isMuted={isMuted} />} />
            <Route path="/lore" element={<LorePage isMuted={isMuted} />} />
            <Route
              path="/projects"
              element={<ProjectsPage isMuted={isMuted} onToggleMute={toggleMute} />}
            />
            <Route path="/dream-shaper" element={<DreamShaperPage isMuted={isMuted} />} />
            <Route path="/observatory" element={<ObservatoryPage isMuted={isMuted} />} />
            <Route path="/community" element={<CommunityPage isMuted={isMuted} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Observatory Footer */}
      <Footer
        isDark={isDark}
        onToggleTheme={toggleTheme}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        onOpenEasterEgg={() => setIsEasterEggOpen(true)}
      />

      {/* Floating Character Chat Trigger Button */}
      <aside aria-label="Observatory Communications">
        <button
          onClick={() => {
            playUiChime(isMuted);
            setIsChatOpen(true);
          }}
          aria-label="Chat with Pip the Junior Dream Engineer"
          className="fixed bottom-5 right-5 z-40 px-4 py-3 rounded-full bg-[#a34063] hover:bg-[#8f3454] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 cursor-pointer border border-[#f5c96a]/40 group"
        >
          <div className="relative">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 ring-2 ring-[#a34063]" />
            <MessageCircle className="w-5 h-5 text-[#f5c96a] group-hover:rotate-12 transition-transform" />
          </div>
          <span className="text-xs font-bold font-editorial tracking-wide">
            Chat with Pip
          </span>
        </button>
      </aside>

      {/* Pip Interactive Chat Drawer */}
      <PipChatDrawer
        isMuted={isMuted}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Hidden Easter Egg Modal */}
      <EasterEggModal
        isOpen={isEasterEggOpen}
        onClose={() => setIsEasterEggOpen(false)}
        isMuted={isMuted}
      />
    </div>
  );
};

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true); // Audio strictly never autoplays
  const [isChaos, setIsChaos] = useState<boolean>(false);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState<boolean>(false);
  const [sparklesEnabled, setSparklesEnabled] = useState<boolean>(true);

  // Synchronize dark theme class on document element
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('pip_observatory_theme');
      if (savedTheme === 'dark') {
        setIsDark(true);
        document.documentElement.classList.add('dark');
      } else {
        setIsDark(false);
        document.documentElement.classList.remove('dark');
      }

      const savedMute = localStorage.getItem('pip_observatory_muted');
      if (savedMute !== null) {
        setIsMuted(savedMute === 'true');
      }
    } catch {
      // Safe fallback
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        try {
          localStorage.setItem('pip_observatory_theme', 'dark');
        } catch {}
      } else {
        document.documentElement.classList.remove('dark');
        try {
          localStorage.setItem('pip_observatory_theme', 'light');
        } catch {}
      }
      return next;
    });
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('pip_observatory_muted', next.toString());
      } catch {}
      return next;
    });
  };

  const toggleChaos = () => {
    setIsChaos((prev) => !prev);
  };

  return (
    <HashRouter>
      <TransitionProvider isMuted={isMuted}>
        <AppContent
          isDark={isDark}
          toggleTheme={toggleTheme}
          isMuted={isMuted}
          toggleMute={toggleMute}
          isChaos={isChaos}
          toggleChaos={toggleChaos}
          sparklesEnabled={sparklesEnabled}
          isEasterEggOpen={isEasterEggOpen}
          setIsEasterEggOpen={setIsEasterEggOpen}
        />
      </TransitionProvider>
    </HashRouter>
  );
}
