/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Pip's Midnight Observatory - Visitor Recognition & Memory Engine
 */

export interface VisitorProfile {
  id: string;
  name: string;
  visitCount: number;
  firstVisitTimestamp: number;
  lastVisitTimestamp: number;
  wishesSubmitted: number;
  stardust: number;
  guardianConstellation: string;
  favoriteChamber: string;
}

export const VISITOR_STORAGE_KEY = 'pip_midnight_visitor_profile_v2';
export const LAST_ACTIVE_SESSION_KEY = 'pip_midnight_session_marker';

const CONSTELLATIONS = [
  'Ursa Lullaby',
  'Cradle Nebula',
  'The Slumber Ring',
  'Chamomile Corona',
  'Little Star-Fox',
  'Velvet Swan',
];

/**
 * Returns a warm, personalized greeting from Pip tailored to visit history & time of night.
 */
export function generateCustomGreeting(
  profile: VisitorProfile,
  currentHour: number = new Date().getHours()
): { greeting: string; subtext: string; badge: string } {
  const isNight = currentHour >= 21 || currentHour < 5;
  const isDawn = currentHour >= 5 && currentHour < 9;
  const isDay = currentHour >= 9 && currentHour < 18;
  const isTwilight = currentHour >= 18 && currentHour < 21;

  let timeFlavor = 'midnight';
  if (isDawn) timeFlavor = 'dawn';
  else if (isDay) timeFlavor = 'afternoon';
  else if (isTwilight) timeFlavor = 'twilight';

  if (profile.visitCount <= 1) {
    return {
      greeting: `Welcome, newcomer ${profile.name}! ✦`,
      subtext: `I'm Pip! I just brewed chamomile-starlight tea. Let me show you around the observatory.`,
      badge: 'First Stargaze',
    };
  }

  if (profile.visitCount === 2) {
    return {
      greeting: `Welcome back, ${profile.name}! 🌟`,
      subtext: `Pip remembered your footsteps! The telescope is already calibrated for your second nocturnal visit.`,
      badge: 'Returning Stargazer · Visit #2',
    };
  }

  if (profile.visitCount < 5) {
    const timeNotes: Record<string, string> = {
      midnight: `Late midnight wanderings! Pip has extra warm blankets ready for you.`,
      dawn: `Catching the morning twilight together! The first sunbeams are tickling the dome.`,
      afternoon: `A daylight visit! Pip is polishing the brass lenses, but always happy to chat.`,
      twilight: `Dusk is falling! The first stars are popping out right on schedule.`,
    };

    return {
      greeting: `Look who came back to the dome! Hello ${profile.name}! ✨`,
      subtext: timeNotes[timeFlavor] || `It's lovely seeing you again for visit #${profile.visitCount}.`,
      badge: `Observatory Regular · Visit #${profile.visitCount}`,
    };
  }

  // 5 or more visits = Observatory Veteran
  return {
    greeting: `Pip's Star Companion, ${profile.name}! 🏮`,
    subtext: `Visit #${profile.visitCount}! You're an honorary Dream Keeper now. The constellations shine brighter with you here.`,
    badge: `Honorary Dream Keeper · Visit #${profile.visitCount}`,
  };
}

/**
 * Loads or initializes the visitor profile from localStorage.
 */
export function loadVisitorProfile(): VisitorProfile {
  if (typeof window === 'undefined') {
    return createDefaultProfile();
  }

  try {
    const stored = localStorage.getItem(VISITOR_STORAGE_KEY);
    const now = Date.now();

    if (stored) {
      const parsed: VisitorProfile = JSON.parse(stored);
      // Check session to increment visit count on distinct visits (> 20 mins apart)
      const lastSession = localStorage.getItem(LAST_ACTIVE_SESSION_KEY);
      const lastSessionTime = lastSession ? parseInt(lastSession, 10) : 0;
      const isNewSession = !lastSessionTime || (now - lastSessionTime) > 20 * 60 * 1000;

      if (isNewSession) {
        parsed.visitCount = (parsed.visitCount || 1) + 1;
        parsed.lastVisitTimestamp = now;
        localStorage.setItem(LAST_ACTIVE_SESSION_KEY, now.toString());
        localStorage.setItem(VISITOR_STORAGE_KEY, JSON.stringify(parsed));
      }

      return parsed;
    }

    // First time visitor
    const newProfile = createDefaultProfile();
    localStorage.setItem(VISITOR_STORAGE_KEY, JSON.stringify(newProfile));
    localStorage.setItem(LAST_ACTIVE_SESSION_KEY, now.toString());
    return newProfile;
  } catch {
    return createDefaultProfile();
  }
}

/**
 * Creates a fresh default visitor profile.
 */
export function createDefaultProfile(): VisitorProfile {
  const randomConstellation = CONSTELLATIONS[Math.floor(Math.random() * CONSTELLATIONS.length)];
  return {
    id: `visitor-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name: 'Little Dreamer',
    visitCount: 1,
    firstVisitTimestamp: Date.now(),
    lastVisitTimestamp: Date.now(),
    wishesSubmitted: 0,
    stardust: 12,
    guardianConstellation: randomConstellation,
    favoriteChamber: 'The Great Telescope',
  };
}

/**
 * Updates the visitor's custom name/callsign in memory.
 */
export function updateVisitorProfileName(name: string): VisitorProfile {
  const current = loadVisitorProfile();
  const cleanName = name.trim().slice(0, 32) || 'Little Dreamer';
  current.name = cleanName;

  try {
    localStorage.setItem(VISITOR_STORAGE_KEY, JSON.stringify(current));
  } catch {}

  return current;
}

/**
 * Records a wish submission in the visitor's memory.
 */
export function recordVisitorWish(): VisitorProfile {
  const current = loadVisitorProfile();
  current.wishesSubmitted = (current.wishesSubmitted || 0) + 1;
  current.stardust = (current.stardust || 0) + 5; // Bonus stardust reward

  try {
    localStorage.setItem(VISITOR_STORAGE_KEY, JSON.stringify(current));
  } catch {}

  return current;
}

/**
 * Awards stardust for exploring chambers or interacting with 3D model.
 */
export function awardStardust(amount: number): VisitorProfile {
  const current = loadVisitorProfile();
  current.stardust = Math.max(0, (current.stardust || 0) + amount);

  try {
    localStorage.setItem(VISITOR_STORAGE_KEY, JSON.stringify(current));
  } catch {}

  return current;
}
