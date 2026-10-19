import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPipDialogueResponse } from './src/utils/pipDialogue.ts';
import { validateGuestbookEntry } from './src/utils/dreamLogic.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const WISHES_FILE = path.join(DATA_DIR, 'wishes.json');

app.use(express.json());

// Ensure data directory and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface WishRecord {
  id: string;
  name: string;
  wish: string;
  timestamp: string;
  starColor: string;
  category: string;
  reactions: { sparkle: number; heart: number };
}

const INITIAL_WISHES: WishRecord[] = [
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

function readWishes(): WishRecord[] {
  try {
    if (fs.existsSync(WISHES_FILE)) {
      const content = fs.readFileSync(WISHES_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed reading wishes file, re-seeding:', err);
  }

  // Seed default wishes
  fs.writeFileSync(WISHES_FILE, JSON.stringify(INITIAL_WISHES, null, 2), 'utf-8');
  return INITIAL_WISHES;
}

function saveWishes(wishes: WishRecord[]) {
  try {
    fs.writeFileSync(WISHES_FILE, JSON.stringify(wishes, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed saving wishes to disk:', err);
  }
}

// 1. Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    observatory: 'Pip Midnight Observatory · Sector 7',
    timestamp: Date.now(),
  });
});

// 2. GET all wishes
app.get('/api/wishes', (_req, res) => {
  const wishes = readWishes();
  res.json({
    success: true,
    wishes,
    count: wishes.length,
    serverLive: true,
  });
});

// 3. POST new wish
app.post('/api/wishes', (req, res) => {
  const { name, wish, category = 'Rest & Warmth', starColor } = req.body || {};

  const validation = validateGuestbookEntry(name || '', wish || '');
  if (!validation.valid) {
    res.status(400).json({ success: false, error: validation.error });
    return;
  }

  const validColors = ['#f5c96a', '#dba7b9', '#c7b6df', '#f4d7df', '#99e1d9'];
  const color = validColors.includes(starColor)
    ? starColor
    : validColors[Math.floor(Math.random() * validColors.length)];

  const now = new Date();
  const timeString = `${now.getHours() % 12 || 12}:${now.getMinutes().toString().padStart(2, '0')} ${
    now.getHours() >= 12 ? 'PM' : 'AM'
  }`;

  const newEntry: WishRecord = {
    id: `wish-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name: String(name).trim(),
    wish: String(wish).trim(),
    timestamp: timeString,
    starColor: color,
    category: String(category).trim() || 'Rest & Warmth',
    reactions: { sparkle: 1, heart: 1 },
  };

  const wishes = readWishes();
  const updated = [newEntry, ...wishes].slice(0, 100); // keep up to 100 live wishes
  saveWishes(updated);

  res.status(201).json({
    success: true,
    wish: newEntry,
    message: 'Wish safely archived in the Midnight Observatory backend!',
  });
});

// 4. POST wish reaction
app.post('/api/wishes/:id/reaction', (req, res) => {
  const { id } = req.params;
  const { type = 'sparkle' } = req.body || {};
  const wishes = readWishes();

  const targetIndex = wishes.findIndex((w) => w.id === id);
  if (targetIndex === -1) {
    res.status(404).json({ success: false, error: 'Wish not found' });
    return;
  }

  if (type === 'sparkle') {
    wishes[targetIndex].reactions.sparkle = (wishes[targetIndex].reactions.sparkle || 0) + 1;
  } else if (type === 'heart') {
    wishes[targetIndex].reactions.heart = (wishes[targetIndex].reactions.heart || 0) + 1;
  }

  saveWishes(wishes);
  res.json({
    success: true,
    reactions: wishes[targetIndex].reactions,
  });
});

// 5. POST character chat back (AI / Rule-based)
app.post('/api/chat', async (req, res) => {
  const { message = '', visitorName = 'Little Dreamer', visitCount = 1 } = req.body || {};

  // If Gemini API key is configured, we can optionally use @google/genai
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.length > 10) {
    try {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `You are Pip, the Junior Dream Engineer at Midnight Nursery from haX.baby. You are a gentle, adorable Skull Baby who wears a nightcap decorated with stars and a pink bow. You speak with warm bedtime humor, curious wonder, sleepy celestial metaphors, and reassuring sweetness. Never be scary or loud. The visitor's name is "${visitorName}" and this is their visit #${visitCount}. Keep your answer under 3 sentences.\nVisitor: ${message}`,
              },
            ],
          },
        ],
      });

      const replyText = response.text?.trim();
      if (replyText) {
        res.json({
          success: true,
          reply: replyText,
          mood: 'happy',
          source: 'ai',
        });
        return;
      }
    } catch (err) {
      console.warn('Gemini chat call failed, gracefully falling back to rule-based engine:', err);
    }
  }

  // Resilient rule-based dialogue engine
  const dialogue = getPipDialogueResponse(message, visitorName, visitCount);
  res.json({
    success: true,
    reply: dialogue.text,
    mood: dialogue.mood,
    source: 'engine',
  });
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`✦ Pip Midnight Observatory Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
