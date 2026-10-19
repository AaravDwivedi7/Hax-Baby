# Pip's Midnight Observatory

> *“Every little dream deserves a little light.”*

A whimsical, interactive character portfolio created for the **haX.baby — Baby's First Website 48-Hour Hackathon** (October 17–19, 2026).

---

## 🌟 Overview

**Pip's Midnight Observatory** introduces **Pip**, the official haX.baby Skull Baby, in his role as **Junior Dream Engineer** at the Midnight Nursery. Tucked beneath the nursery rafters, Pip builds soothing lullabies, designs illuminated nightlights, and maps quiet flight corridors across neighborhood rooftops to tuck restless creatures into bed.

This project delivers a handcrafted, nostalgic, cozy corner of the web with authentic early-web soul, real interactive mechanisms, zero corporate slop, and strict adherence to Pip's official canon.

---

## ✦ Key Features & Interactions

1. **Meet Pip (Hero)**
   - Official character art (`pip_avatar_cloud.png`) floating with gentle ambient physics.
   - Interactive cursor-reactive amber pupil tracking on desktop with gentle blinking animation fallback.
   - Smooth-scrolling CTA triggers to explore projects and character details.

2. **Official Character Dossier (`#about`)**
   - Full character sheet (Species, Occupation, Personality, Quirks, Favorite Tools).
   - Official studio portrait render (`pip_portrait.png`).
   - Interactive speech bubble cycling through Pip's favorite bedtime thoughts.

3. **Three Showcase Works (`#projects`)**
   - **The Lullaby Lab**: Interactive music box (`pip_lullaby_box.png`) powered by synthesized harmonic tones via Web Audio API. Features 3 selectable melody moods (*Starlight Shimmer*, *Moonbeam Drift*, *Cloud Drift Whisper*), spinning winding key, and live note visualizer. Zero audio autoplay on load.
   - **The Nightlight Collection**: Interactive lantern showcase (`pip_dream_lantern.png`) with real ambient lighting shifts across three hand-carved designs (*Crescent Lull*, *Berry-Blush Beacon*, *Midnight Velvet Spire*).
   - **Dream Delivery Routes**: Illustrated SVG rooftop neighborhood flight map with clickable waypoints (*Bramble Cottage*, *Willow Belfry*, *Clover Street Bakery*, *Nursery Spire*, *Old Toby's Porch*) and animated dream dispatch cloud simulation.

4. **Origin Chronicles (`#story`)**
   - 4-scene connected narrative showing how Pip founded the observatory.
   - Constellation line stepper with previous/next controls.

5. **Midnight Observatory Star Sky (`#observatory`)**
   - Interactive brass telescope dome with 5 discoverable nursery constellations (*Ursa Minoris Lullaby*, *Chamomile Teapot*, *Downy Feather*, *Amber Pacifier*, *Porridge Comet*).
   - Star catalog tracker and reset function.

6. **Nursery Wall Growth Board (`#growth`)**
   - Whimsical wooden ruler chart logging Pip's bedtime engineering milestones (*Lullaby Harmonization*, *Lantern Physics*, *Cloud Navigation*, *Story Whispering*).

7. **Side Quests & Bonuses**
   - **Mechanical Visitor Odometer**: Fictional bedtime delivery log counter (`001,717`) with interactive increment button.
   - **Dream Wishbook (Local Guestbook)**: Browser-persisted journal where visitors can leave a sweet dream wish alongside friendly neighborhood creatures.
   - **Hidden Easter Egg**: Discover the tiny twinkling star in the announcement bar or footer to unlock Pip's secret message, sound chime, and gentle star confetti (*canvas-confetti*).
   - **Sparkle Cursor Trail**: Lightweight canvas stardust following cursor movements (disabled on touch & `prefers-reduced-motion`).
   - **Theme Switcher**: Seamless toggle between *Dream Theme* (warm cream, rich berry, blush) and *Night Theme* (deep indigo, golden dreamlight).
   - **Playful Chaos Mode**: Reversible 90s stardust overdrive toggle.

---

## 🎨 Visual System & Palette

- **Primary Warm Cream**: `#fff8f1`
- **Rich Berry**: `#a34063`
- **Deep Warm Brown**: `#5c4033`
- **Soft Blush**: `#f4d7df`
- **Dusty Rose**: `#dba7b9`
- **Golden Dreamlight**: `#f5c96a`
- **Night Sky Indigo**: `#201d39`
- **Night Surface**: `#302847`
- **Muted Lavender**: `#c7b6df`

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Server**: Vite 8
- **Styling**: Tailwind CSS v4 + CSS custom properties
- **Icons**: Lucide React
- **Audio Synthesis**: Pure Web Audio API (`AudioContext`, sine/triangle waves with exponential gain envelopes)
- **Confetti**: `canvas-confetti` (conditioned on `prefers-reduced-motion`)
- **Testing**: Built-in `node:test` + `node:assert/strict`

---

## ♿ Accessibility & Performance

- **WCAG 2.2 AA Contrast**: High legibility in both Dream Cream and Night Sky modes.
- **Semantic Structure**: Proper `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, and `<footer>` landmarks.
- **Keyboard Navigation**: Skip-to-content link, distinct `focus-visible` styling on all interactive controls.
- **Screen Reader Announcements**: `aria-live="polite"` regions for Easter egg alerts and odometer changes.
- **Reduced Motion**: All animations and particle systems gracefully disable when `prefers-reduced-motion: reduce` is detected.
- **Audio Policy**: Strictly user-initiated sound effects; global mute switch available in the top bar and footer.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run unit tests
node --test src/utils/dreamLogic.test.ts

# 3. Start development server
npm run dev

# 4. Build for production
npm run build
```

---

## 📜 Official Asset Credits & Attribution

All Pip character artwork and canon lore are provided courtesy of the **haX.baby** organizing committee for Track 1 of **Baby's First Website Hackathon**:
- `pip_avatar_cloud.png`
- `pip_lullaby_box.png`
- `pip_dream_lantern.png`
- `pip_portrait.png`
- Pack archive: `track1-pip-asset-pack.zip`

Licensed for use in official haX.baby hackathon entries.
