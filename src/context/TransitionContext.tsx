import React, { createContext, useContext, useState, useCallback, useTransition } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TransitionMode, TRANSITION_PRESETS } from '../utils/transitionStyles';
import { playUiChime } from '../utils/soundEffects';

interface TransitionContextType {
  transitionMode: TransitionMode;
  setTransitionMode: (mode: TransitionMode) => void;
  isTransitioning: boolean;
  targetPageName: string;
  navigateWithMorph: (path: string, pageName: string, customMode?: TransitionMode) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const TransitionProvider: React.FC<{
  children: React.ReactNode;
  isMuted: boolean;
}> = ({ children, isMuted }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [transitionMode, setTransitionMode] = useState<TransitionMode>('celestial');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [targetPageName, setTargetPageName] = useState<string>('Next Chamber');
  const [, startTransition] = useTransition();

  const navigateWithMorph = useCallback(
    (path: string, pageName: string, customMode?: TransitionMode) => {
      // If already on the target path, smooth scroll to top
      if (location.pathname === path) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (customMode) {
        setTransitionMode(customMode);
      }

      setTargetPageName(pageName);
      setIsTransitioning(true);
      playUiChime(isMuted);

      // Halfway through the shape morph expansion, switch the route
      setTimeout(() => {
        startTransition(() => {
          navigate(path);
          window.scrollTo({ top: 0, behavior: 'instant' });
        });
      }, 420);

      // Finish transition overlay
      setTimeout(() => {
        setIsTransitioning(false);
      }, 820);
    },
    [navigate, location.pathname, isMuted]
  );

  return (
    <TransitionContext.Provider
      value={{
        transitionMode,
        setTransitionMode,
        isTransitioning,
        targetPageName,
        navigateWithMorph,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export const usePageTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('usePageTransition must be used within a TransitionProvider');
  }
  return context;
};
