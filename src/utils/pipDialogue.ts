/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Pip's Midnight Observatory - Character Dialogue & Chat Engine
 */

export interface PipMessage {
  id: string;
  sender: 'pip' | 'user';
  text: string;
  timestamp: string;
  mood?: 'happy' | 'sleepy' | 'curious' | 'starry' | 'comforting';
}

export const SUGGESTED_QUESTIONS = [
  "Why do you wear a nightcap with a bow?",
  "I can't fall asleep tonight...",
  "What is inside your starlight lantern?",
  "Tell me an observatory secret!",
  "What kind of creature are you?",
  "Can you inspect my dream?",
];

interface DialogueRule {
  keywords: string[];
  response: (visitorName: string, visitCount: number) => {
    text: string;
    mood: 'happy' | 'sleepy' | 'curious' | 'starry' | 'comforting';
  };
}

const DIALOGUE_RULES: DialogueRule[] = [
  {
    keywords: ['nightcap', 'hat', 'cap', 'bow', 'pink ribbon', 'wear', 'clothes'],
    response: () => ({
      text: "My starry nightcap keeps all the loose astronomical calculations from floating out of my head while I sleep! And the pink bow? Spun from dawn-light ribbons. It's official haX.baby dream gear!",
      mood: 'happy',
    }),
  },
  {
    keywords: ['sleep', 'insomnia', 'awake', 'restless', 'tired', 'cant sleep', "can't sleep", 'bedtime', 'rest'],
    response: (name) => ({
      text: `Deep breath, ${name}. Drop your shoulders three millimeters. Did you know 78% of late-night thoughts are just sleepy dust looking for a place to settle? Turn down the blue light, sip warm water, and listen to the Lullaby Lab. Pip's keeping watch.`,
      mood: 'comforting',
    }),
  },
  {
    keywords: ['lantern', 'lamp', 'light', 'glow', 'amber', 'crescent'],
    response: () => ({
      text: "This is my Crescent Lull Beacon! It's forged from pulverized moonstone and glowing honey stardust. It doesn't cast harsh shadows—only soft, rounded halos that make bedrooms feel like velvet blankets.",
      mood: 'starry',
    }),
  },
  {
    keywords: ['who are you', 'creature', 'skull', 'baby', 'what are you', 'origins', 'species'],
    response: () => ({
      text: "I am Pip, Junior Dream Engineer! Some call me an Official Skull Baby, but don't worry—I'm 100% made of soft pearl-stardust, curiosity, and sleepy cuddles. My job is ensuring no baby or weary adult gets left in the dark.",
      mood: 'happy',
    }),
  },
  {
    keywords: ['secret', 'mystery', 'telescope', 'hidden', 'easter egg'],
    response: () => ({
      text: "Psst! Come closer... Behind the brass dial of the Great Telescope, there's a hidden nest where a tiny moth named Bramble sleeps. Also, if you tap my 3D star crown three times, I do a little spin!",
      mood: 'curious',
    }),
  },
  {
    keywords: ['dream', 'inspect', 'nightmare', 'flying', 'wish'],
    response: (name) => ({
      text: `Let me aim the Dream Spectrum Sensor at your wish-frequency, ${name}... Beep-boop-chime! ✦ Sensors detect 94% gentle cloud matter with high concentrations of sweet adventures tomorrow. Approved by Sector 7!`,
      mood: 'starry',
    }),
  },
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'pip'],
    response: (name, count) => ({
      text: count > 1
        ? `Hello again, ${name}! Always warm to see your starry footsteps return to my dome for visit #${count}. What shall we engineer tonight?`
        : `Warm starlight greetings, ${name}! Welcome to the Midnight Nursery. Pip is so glad you wandered up our attic stairs!`,
      mood: 'happy',
    }),
  },
  {
    keywords: ['story', 'tale', 'tell me', 'fable'],
    response: () => ({
      text: "Once upon a quiet twilight, the youngest star fell behind a chimney flue. The town cat came by, nudged it with a velvet paw, and said: 'Don't cry little spark, sleep here until morning.' And that's why chimney tops stay warm all night.",
      mood: 'sleepy',
    }),
  },
  {
    keywords: ['sound', 'music', 'lullaby', 'tune', 'chime', 'song'],
    response: () => ({
      text: "In my Lullaby Lab, we tune frequencies to exactly 432 Hz—the natural resonance of a sleeping infant's heartbeat. You can press the interactive keys to weave your own sleepy sonata anytime!",
      mood: 'happy',
    }),
  },
];

const FALLBACK_RESPONSES = [
  "Pip tilts his nightcap curiously... That's a thoughtful midnight question! The stars tell me tomorrow is going to be remarkably gentle with you.",
  "I adjusted my brass telescope lenses while thinking about that! You know, every question asked after midnight shines like a newly discovered comet.",
  "Pip takes a tiny sip of chamomile-starlight tea. Let's tuck that idea into a dream jar and see what marvelous things blossom by sunrise.",
  "Mmm, sounds like wonderful dream-matter! The observatory registers a 98% cozy rating for your thought.",
];

/**
 * Generates an in-character response from Pip for a user message.
 */
export function getPipDialogueResponse(
  userText: string,
  visitorName: string = 'Little Dreamer',
  visitCount: number = 1
): { text: string; mood: 'happy' | 'sleepy' | 'curious' | 'starry' | 'comforting' } {
  const normalized = userText.toLowerCase().trim();

  if (!normalized) {
    return {
      text: "Pip listens to the quiet silence of the nursery. Sometimes just sitting together under the stars is enough.",
      mood: 'sleepy',
    };
  }

  // Check matching rules with word boundary matching
  for (const rule of DIALOGUE_RULES) {
    const matches = rule.keywords.some((kw) => {
      // Escape any regex special characters
      const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // If keyword is a phrase or has spaces, match includes; if single word, match word boundary
      if (kw.includes(' ')) {
        return normalized.includes(kw);
      }
      const regex = new RegExp(`\\b${escaped}\\b`, 'i');
      return regex.test(normalized);
    });

    if (matches) {
      return rule.response(visitorName, visitCount);
    }
  }

  // Fallback whimsical character answer
  const fallbackText = FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
  return {
    text: `${visitorName}, ${fallbackText}`,
    mood: 'curious',
  };
}
