/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Pip's Midnight Observatory - Core Dream Engineering Logic
 */

export interface LullabyNote {
  freq: number;
  duration: number; // in seconds
  pause: number;    // pause after note in seconds
  name: string;
}

export interface LullabyMood {
  id: string;
  name: string;
  description: string;
  color: string;
  tempoBpm: number;
  notes: LullabyNote[];
}

export const LULLABY_MOODS: Record<string, LullabyMood> = {
  starlight: {
    id: 'starlight',
    name: 'Starlight Shimmer',
    description: 'Crisp, sparkling celestial chimes for wandering nighttime thoughts.',
    color: '#f5c96a',
    tempoBpm: 90,
    notes: [
      { freq: 523.25, duration: 0.35, pause: 0.15, name: 'C5' },
      { freq: 659.25, duration: 0.35, pause: 0.15, name: 'E5' },
      { freq: 783.99, duration: 0.45, pause: 0.20, name: 'G5' },
      { freq: 1046.50, duration: 0.60, pause: 0.30, name: 'C6' },
      { freq: 783.99, duration: 0.35, pause: 0.15, name: 'G5' },
      { freq: 880.00, duration: 0.50, pause: 0.25, name: 'A5' },
      { freq: 659.25, duration: 0.70, pause: 0.40, name: 'E5' },
    ],
  },
  moonbeam: {
    id: 'moonbeam',
    name: 'Moonbeam Drift',
    description: 'Slow, velvety harmonic waves that gently steady a busy baby skull.',
    color: '#c7b6df',
    tempoBpm: 72,
    notes: [
      { freq: 392.00, duration: 0.55, pause: 0.20, name: 'G4' },
      { freq: 440.00, duration: 0.55, pause: 0.20, name: 'A4' },
      { freq: 523.25, duration: 0.70, pause: 0.30, name: 'C5' },
      { freq: 587.33, duration: 0.55, pause: 0.20, name: 'D5' },
      { freq: 523.25, duration: 0.90, pause: 0.40, name: 'C5' },
    ],
  },
  cloudDrift: {
    id: 'cloudDrift',
    name: 'Cloud Drift Whisper',
    description: 'Airy, feather-light acoustic drops echoing across the sleepy nursery.',
    color: '#dba7b9',
    tempoBpm: 80,
    notes: [
      { freq: 440.00, duration: 0.40, pause: 0.15, name: 'A4' },
      { freq: 659.25, duration: 0.45, pause: 0.20, name: 'E5' },
      { freq: 587.33, duration: 0.40, pause: 0.15, name: 'D5' },
      { freq: 523.25, duration: 0.50, pause: 0.25, name: 'C5' },
      { freq: 440.00, duration: 0.80, pause: 0.40, name: 'A4' },
    ],
  },
};

export interface DeliveryDestination {
  id: string;
  name: string;
  occupant: string;
  dreamType: string;
  story: string;
  x: number; // 0-100 percentage on map
  y: number; // 0-100 percentage on map
  altitude: string;
  lightRequired: string;
}

export const DELIVERY_ROUTES: DeliveryDestination[] = [
  {
    id: 'bramble-cottage',
    name: 'Bramble Cottage Attic',
    occupant: 'Barnaby the Sleepless Dormouse',
    dreamType: 'Acorn Feast & Warm Cinnamon Tea',
    story: 'Barnaby woke up counting pinecones. Pip routes a warm cinnamon breeze and a quiet hearth glow over his tiny straw bed.',
    x: 18,
    y: 35,
    altitude: 'Low Rooftop (12m)',
    lightRequired: 'Soft Honey Amber',
  },
  {
    id: 'willow-belfry',
    name: 'Willow Belfry Tower',
    occupant: 'Oona the Baby Barn Owl',
    dreamType: 'Star Gliding Over Still Silver Lakes',
    story: 'First night out of the nest! Pip sends a reassuring, velvety silver cloud so Oona feels safe spreading her downy wings.',
    x: 48,
    y: 20,
    altitude: 'High Belfry (38m)',
    lightRequired: 'Crescent Moon Silver',
  },
  {
    id: 'cobblestone-bakery',
    name: 'Clover Street Bakery Chimney',
    occupant: 'Madam Whiskers & Her 3 Kittens',
    dreamType: 'Endless Skeins of Wool & Clotted Cream',
    story: 'The triplets were chasing flour dust until midnight. Pip delivers three tiny synchronized purr-lullabies right down the flue.',
    x: 75,
    y: 52,
    altitude: 'Chimney Hearth (16m)',
    lightRequired: 'Warm Peach Hearthlight',
  },
  {
    id: 'greenhouse-spire',
    name: 'Midnight Nursery Glasshouse Spire',
    occupant: 'Sprout the Fern Sprite',
    dreamType: 'Gentle Phosphor Rain & Dew Drops',
    story: 'Sprout stays up misting the moonflowers. Pip drops off an emerald starlight vial to tuck the sleeping petals in for the night.',
    x: 34,
    y: 72,
    altitude: 'Glass Cupola (24m)',
    lightRequired: 'Botanical Firefly Glow',
  },
  {
    id: 'astronomer-porch',
    name: "Old Toby's Weathercock Porch",
    occupant: 'Toby the Golden Retriever Puppy',
    dreamType: 'Chasing Friendly Star-Bunnies',
    story: 'Toby had a scary lightning dream last night. Pip recalibrates his nightlight to a cozy golden bone that never dims.',
    x: 85,
    y: 28,
    altitude: 'Gable Overhang (10m)',
    lightRequired: 'Golden Buttercup Glow',
  },
];

export interface LanternItem {
  id: string;
  name: string;
  type: string;
  description: string;
  glowColor: string;
  colorHex: string;
  glowRadius: string;
  bestFor: string;
  burnDuration: string;
  sparklePattern: string;
}

export const LANTERN_COLLECTION: LanternItem[] = [
  {
    id: 'crescent-lull',
    name: 'The Crescent Lull Lantern',
    type: 'Alabaster & Starlight',
    description: 'Forged from moonstone crystal and powdered stardust. Emits a tender, silver-white glow that chases away long shadows under cribs.',
    glowColor: 'rgba(245, 201, 106, 0.45)',
    colorHex: '#f5c96a',
    glowRadius: '28px',
    bestFor: 'Nursery corners with tall curtains',
    burnDuration: '8 bedtime hours',
    sparklePattern: 'Gentle pulse every 4 seconds',
  },
  {
    id: 'blush-ember',
    name: 'The Berry-Blush Dream Beacon',
    type: 'Rose Quartz & Hearth Ember',
    description: 'Infused with warm botanical blossom extracts. Casts a comforting rosy blush that makes chilly midnight rooms feel like a hug.',
    glowColor: 'rgba(219, 167, 185, 0.55)',
    colorHex: '#dba7b9',
    glowRadius: '34px',
    bestFor: 'Thunderstorm nights & little sniffles',
    burnDuration: 'Until morning milk',
    sparklePattern: 'Slow wave shimmer',
  },
  {
    id: 'nebula-twilight',
    name: 'The Midnight Velvet Spire',
    type: 'Deep Indigo Obsidian',
    description: 'A deep violet nightlight with micro-pinholes that project real constellation maps onto ceilings, calming overstimulated dreamers.',
    glowColor: 'rgba(199, 182, 223, 0.5)',
    colorHex: '#c7b6df',
    glowRadius: '40px',
    bestFor: 'Curious baby astronomers & star-watchers',
    burnDuration: 'All-night continuous orbit',
    sparklePattern: 'Constellation rotation',
  },
];

export interface GrowthMetric {
  id: string;
  skill: string;
  currentLevel: string;
  score: number; // 0-100
  note: string;
  iconName: string;
}

export const GROWTH_METRICS: GrowthMetric[] = [
  {
    id: 'lullaby',
    skill: 'Lullaby Harmonization',
    currentLevel: 'Master of the High C Chime',
    score: 94,
    note: 'Calmed 12 restless baby owls in a single session without dropping a single star key.',
    iconName: 'Music',
  },
  {
    id: 'lantern',
    skill: 'Lantern Illumination Physics',
    currentLevel: 'Grade 3 Glow Artisan',
    score: 88,
    note: 'Engineered zero-flicker starlight wicks. Approved by the Chief Nursery Matron.',
    iconName: 'Sparkles',
  },
  {
    id: 'delivery',
    skill: 'Rooftop Cloud Navigation',
    currentLevel: 'Breezeway Pilot Certified',
    score: 91,
    note: 'Discovered the quiet draft between chimney 4 and the bakery spire (0 turbulence).',
    iconName: 'Compass',
  },
  {
    id: 'story',
    skill: 'Sleepy Story Whispering',
    currentLevel: 'Senior Tale Weaver',
    score: 96,
    note: 'Specialty: Tales of benevolent moon rabbits who bake star-biscuits.',
    iconName: 'BookOpen',
  },
];

/**
 * Calculates total route flight path distance in meters (estimated)
 */
export function calculateRouteDistance(destinations: DeliveryDestination[]): number {
  if (destinations.length < 2) return 0;
  let totalDistance = 0;
  for (let i = 0; i < destinations.length - 1; i++) {
    const d1 = destinations[i];
    const d2 = destinations[i + 1];
    const dx = (d2.x - d1.x) * 10;
    const dy = (d2.y - d1.y) * 10;
    totalDistance += Math.hypot(dx, dy);
  }
  return Math.round(totalDistance);
}

/**
 * Formats a visitor odometer counter with leading zeroes
 */
export function formatOdometer(count: number): string {
  const safeCount = Math.max(0, Math.floor(count));
  return safeCount.toString().padStart(6, '0');
}

/**
 * Validates guestbook message submission
 */
export function validateGuestbookEntry(name: string, wish: string): { valid: boolean; error?: string } {
  const cleanName = name.trim();
  const cleanWish = wish.trim();
  if (!cleanName || cleanName.length < 2) {
    return { valid: false, error: 'Please enter a name or nickname (at least 2 letters).' };
  }
  if (!cleanWish || cleanWish.length < 5) {
    return { valid: false, error: 'Your dream wish must be at least 5 characters long.' };
  }
  if (cleanName.length > 40) {
    return { valid: false, error: 'Name must be 40 characters or less.' };
  }
  if (cleanWish.length > 280) {
    return { valid: false, error: 'Wish must be 280 characters or less.' };
  }
  return { valid: true };
}
