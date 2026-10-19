import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Cloud, Moon, Star, Coffee, Wand2, RefreshCw, Compass, Droplet, Play, Pause, Sliders } from 'lucide-react';
import { playMagicChime, playUiChime } from '../utils/soundEffects';

interface DreamShaperProps {
  isMuted: boolean;
}

export interface DreamGeometry {
  id: string;
  name: string;
  role: string;
  description: string;
  icon: React.ElementType;
  color: string;
  secondaryColor: string;
  glowColor: string;
  stats: {
    buoyancy: string;
    warmth: string;
    frequency: string;
    surfaceTension: string;
  };
  borderRadius: string;
  rotate: number;
  scale: number;
  nodes: { x: number; y: number }[]; // Coordinates for floating stardust vertices
}

const DREAM_GEOMETRIES: DreamGeometry[] = [
  {
    id: 'cloud',
    name: 'Cumulus Cloud Pillow',
    role: 'Zero-Gravity Slumber',
    description: 'A soft, sculpted cumulus puff that catches heavy eyelids and floats them gently above worries.',
    icon: Cloud,
    color: '#dba7b9',
    secondaryColor: '#f4d7df',
    glowColor: 'rgba(219, 167, 185, 0.65)',
    stats: {
      buoyancy: '98% Loft',
      warmth: '24°C Featherdown',
      frequency: '432 Hz Calm',
      surfaceTension: '0.12 N/m (Ultra-soft)',
    },
    borderRadius: '65% 35% 58% 42% / 48% 62% 38% 52%',
    rotate: 0,
    scale: 1,
    nodes: [
      { x: 25, y: 35 },
      { x: 50, y: 20 },
      { x: 75, y: 35 },
      { x: 80, y: 65 },
      { x: 50, y: 80 },
      { x: 20, y: 65 },
    ],
  },
  {
    id: 'crescent',
    name: 'Crescent Moon Cradle',
    role: 'Night Sky Harbor',
    description: 'A slender alabaster boat designed to gently rock wandering star thoughts until early sunrise.',
    icon: Moon,
    color: '#f5c96a',
    secondaryColor: '#fff8f1',
    glowColor: 'rgba(245, 201, 106, 0.7)',
    stats: {
      buoyancy: '85% Orbit',
      warmth: '22°C Starlight',
      frequency: '528 Hz Drift',
      surfaceTension: '0.45 N/m (Smooth arc)',
    },
    borderRadius: '72% 28% 28% 72% / 62% 38% 62% 38%',
    rotate: -14,
    scale: 1.05,
    nodes: [
      { x: 35, y: 15 },
      { x: 65, y: 30 },
      { x: 80, y: 50 },
      { x: 65, y: 75 },
      { x: 30, y: 85 },
      { x: 45, y: 50 },
    ],
  },
  {
    id: 'star',
    name: 'Radiant Star Blossom',
    role: 'Breezeway Guide',
    description: 'A four-pointed crystalline compass that guides sleepy flyers along the quietest rooftop chimney draft.',
    icon: Star,
    color: '#c7b6df',
    secondaryColor: '#e9e1f5',
    glowColor: 'rgba(199, 182, 223, 0.7)',
    stats: {
      buoyancy: '92% Vector',
      warmth: '26°C Stardust',
      frequency: '639 Hz Harmony',
      surfaceTension: '0.78 N/m (Crystalline)',
    },
    borderRadius: '25% 75% 25% 75% / 75% 25% 75% 25%',
    rotate: 45,
    scale: 0.98,
    nodes: [
      { x: 50, y: 10 },
      { x: 90, y: 50 },
      { x: 50, y: 90 },
      { x: 10, y: 50 },
      { x: 50, y: 50 },
    ],
  },
  {
    id: 'vessel',
    name: 'Chamomile Honey Chalice',
    role: 'Hearth Comfort',
    description: 'A cozy porcelain chalice steaming with golden clover honey and powdered chamomile flower petals.',
    icon: Coffee,
    color: '#f4d7df',
    secondaryColor: '#f5c96a',
    glowColor: 'rgba(244, 215, 223, 0.75)',
    stats: {
      buoyancy: '78% Anchor',
      warmth: '38°C Cinnamon',
      frequency: '396 Hz Peace',
      surfaceTension: '0.52 N/m (Viscous honey)',
    },
    borderRadius: '45% 45% 55% 55% / 35% 35% 65% 65%',
    rotate: 0,
    scale: 1,
    nodes: [
      { x: 20, y: 25 },
      { x: 80, y: 25 },
      { x: 75, y: 70 },
      { x: 50, y: 85 },
      { x: 25, y: 70 },
    ],
  },
  {
    id: 'lantern',
    name: 'Prismatic Starlight Prism',
    role: 'Shadow Chaser',
    description: 'A faceted geometric starlight prism that refracts night fears into kaleidoscopic pastel rainbows.',
    icon: Compass,
    color: '#a34063',
    secondaryColor: '#dba7b9',
    glowColor: 'rgba(163, 64, 99, 0.65)',
    stats: {
      buoyancy: '88% Lattice',
      warmth: '29°C Lantern Core',
      frequency: '741 Hz Clarity',
      surfaceTension: '0.86 N/m (Faceted diamond)',
    },
    borderRadius: '32% 68% 40% 60% / 60% 30% 70% 40%',
    rotate: 22,
    scale: 1.02,
    nodes: [
      { x: 50, y: 15 },
      { x: 85, y: 35 },
      { x: 85, y: 75 },
      { x: 50, y: 92 },
      { x: 15, y: 75 },
      { x: 15, y: 35 },
    ],
  },
  {
    id: 'dewdrop',
    name: 'Zero-G Slumber Dewdrop',
    role: 'Fluid Restorer',
    description: 'A pearlescent suspended teardrop of pure condensed sweet dreams, oscillating with gentle fluid inertia.',
    icon: Droplet,
    color: '#f5c96a',
    secondaryColor: '#c7b6df',
    glowColor: 'rgba(245, 201, 106, 0.65)',
    stats: {
      buoyancy: '95% Capillary',
      warmth: '25°C Springwater',
      frequency: '852 Hz Pure',
      surfaceTension: '0.34 N/m (Elastic pearl)',
    },
    borderRadius: '50% 50% 35% 65% / 65% 35% 65% 35%',
    rotate: -8,
    scale: 1.04,
    nodes: [
      { x: 50, y: 12 },
      { x: 78, y: 48 },
      { x: 70, y: 82 },
      { x: 50, y: 90 },
      { x: 30, y: 82 },
      { x: 22, y: 48 },
    ],
  },
];

export const DreamShaper: React.FC<DreamShaperProps> = ({ isMuted }) => {
  const [activeShapeId, setActiveShapeId] = useState<string>('cloud');
  const [isLiquidFlow, setIsLiquidFlow] = useState<boolean>(true);
  const [isAutoCycle, setIsAutoCycle] = useState<boolean>(false);
  const [elasticity, setElasticity] = useState<number>(75); // Spring stiffness control
  const [morphCounter, setMorphCounter] = useState<number>(0);
  const [cursorOffset, setCursorOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isWobbling, setIsWobbling] = useState<boolean>(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const activeShape = DREAM_GEOMETRIES.find((s) => s.id === activeShapeId) || DREAM_GEOMETRIES[0];

  // Auto-Metamorphosis Cycle loop
  useEffect(() => {
    if (!isAutoCycle) return;
    const interval = setInterval(() => {
      setActiveShapeId((currentId) => {
        const currIndex = DREAM_GEOMETRIES.findIndex((g) => g.id === currentId);
        const nextIndex = (currIndex + 1) % DREAM_GEOMETRIES.length;
        setMorphCounter((c) => c + 1);
        playMagicChime(isMuted);
        return DREAM_GEOMETRIES[nextIndex].id;
      });
    }, 4200);

    return () => clearInterval(interval);
  }, [isAutoCycle, isMuted]);

  // Handle direct shape selection
  const handleSelect = (shape: DreamGeometry) => {
    playMagicChime(isMuted);
    setActiveShapeId(shape.id);
    setMorphCounter((c) => c + 1);
    setIsWobbling(true);
    setTimeout(() => setIsWobbling(false), 700);
  };

  // Interactive zero-gravity magnetic cursor pull
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const pullX = (e.clientX - centerX) / (rect.width / 2);
    const pullY = (e.clientY - centerY) / (rect.height / 2);

    // Clamped magnetic displacement
    setCursorOffset({
      x: Math.max(-12, Math.min(12, pullX * 12)),
      y: Math.max(-12, Math.min(12, pullY * 12)),
    });
  };

  const handleMouseLeave = () => {
    setCursorOffset({ x: 0, y: 0 });
  };

  return (
    <section
      id="dream-shaper"
      className="py-16 md:py-24 bg-[#fef4e8] dark:bg-[#1a1730] border-y border-[#f0dfcf] dark:border-[#43395c] transition-colors relative overflow-hidden"
      aria-label="Interactive Dream Shaper Laboratory"
    >
      {/* Background ambient starlight dust */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden" aria-hidden="true">
        <span className="absolute top-10 left-[8%] text-[#f5c96a] star-twinkle text-sm">✦</span>
        <span className="absolute top-36 right-[10%] text-[#dba7b9] star-twinkle text-xs" style={{ animationDelay: '1.4s' }}>✧</span>
        <span className="absolute bottom-16 left-[15%] text-[#c7b6df] star-twinkle text-base" style={{ animationDelay: '2.1s' }}>✦</span>
        <span className="absolute bottom-24 right-[12%] text-[#f5c96a] star-twinkle text-sm" style={{ animationDelay: '0.8s' }}>✧</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold text-[#a34063] dark:text-[#dba7b9] bg-[#f4d7df]/50 dark:bg-[#302847] uppercase tracking-wider mb-3">
            <Wand2 className="w-3.5 h-3.5 text-[#f5c96a]" aria-hidden="true" />
            <span>Fluid Metamorphosis Workshop</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2] tracking-tight">
            Pip’s Dream Matter Shaper
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6e544b] dark:text-[#dcd2ea] leading-relaxed">
            Raw dream stardust has no fixed form. Pip sculpts it into whatever a restless creature needs. Select any geometry below to witness unreal, buttery-smooth fluid metamorphosis.
          </p>
        </div>

        {/* Shaper Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#ffffff] dark:bg-[#302847] rounded-3xl p-6 sm:p-10 border border-[#f0dfcf] dark:border-[#43395c] shadow-2xl relative">
          {/* Top Stage Bar: Mode Badges */}
          <div className="lg:col-span-12 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#f0dfcf] dark:border-[#43395c]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f5c96a] animate-pulse" />
              <span className="text-xs font-bold font-display uppercase tracking-wider text-[#a34063] dark:text-[#dba7b9]">
                Zero-G Physics Engine: Active
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Auto-Metamorphosis Cycle Toggle */}
              <button
                onClick={() => {
                  playUiChime(isMuted);
                  setIsAutoCycle(!isAutoCycle);
                }}
                className={`py-1.5 px-3 rounded-xl text-xs font-medium transition-all duration-300 flex items-center gap-1.5 shadow-2xs ${
                  isAutoCycle
                    ? 'bg-[#a34063] text-white ring-2 ring-[#f5c96a]'
                    : 'bg-[#fff8f1] dark:bg-[#28213d] text-[#6e544b] dark:text-[#dcd2ea] hover:bg-[#f4d7df]/50'
                }`}
                title={isAutoCycle ? 'Pause auto-morph' : 'Start automatic shape cycle'}
              >
                {isAutoCycle ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isAutoCycle ? 'Auto-Morphing...' : 'Auto Metamorphosis'}</span>
              </button>

              <span className="text-xs font-mono text-[#9c8278] dark:text-[#a69bb8] hidden sm:inline">
                Transitions: #{morphCounter}
              </span>
            </div>
          </div>

          {/* Left Column: Interactive Morphing Canvas */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            {/* The Morphing Canvas Stage with Cursor Tracking */}
            <div
              ref={canvasRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center p-6 select-none"
            >
              {/* Layer 1: Outer cosmic blur aura morphing smoothly */}
              <motion.div
                animate={{
                  borderRadius: activeShape.borderRadius,
                  rotate: isLiquidFlow ? [activeShape.rotate, activeShape.rotate + 10, activeShape.rotate] : activeShape.rotate,
                  scale: [activeShape.scale, activeShape.scale * 1.08, activeShape.scale],
                  x: cursorOffset.x * 0.7,
                  y: cursorOffset.y * 0.7,
                }}
                transition={{
                  type: 'spring',
                  stiffness: elasticity,
                  damping: 18,
                  mass: 0.85,
                  rotate: { repeat: Infinity, duration: 9, ease: 'easeInOut' },
                  scale: { repeat: Infinity, duration: 6, ease: 'easeInOut' },
                }}
                className="absolute inset-4 filter blur-3xl opacity-60 pointer-events-none transition-colors duration-700"
                style={{
                  backgroundColor: activeShape.color,
                }}
                aria-hidden="true"
              />

              {/* Layer 2: Intermediate Caustic Stardust Halo */}
              <motion.div
                animate={{
                  borderRadius: activeShape.borderRadius,
                  rotate: -activeShape.rotate * 0.6,
                  scale: activeShape.scale * 1.03,
                }}
                transition={{
                  type: 'spring',
                  stiffness: elasticity * 0.8,
                  damping: 20,
                  mass: 1,
                }}
                className="absolute inset-8 rounded-full filter blur-xl opacity-40 pointer-events-none transition-colors duration-700"
                style={{
                  backgroundColor: activeShape.secondaryColor,
                }}
                aria-hidden="true"
              />

              {/* Layer 3: Main Morphing Solid Body with Unreal Elastic Spring Metamorphosis */}
              <motion.div
                animate={{
                  borderRadius: isLiquidFlow
                    ? ['62% 38% 54% 46% / 44% 59% 41% 56%', activeShape.borderRadius, '54% 46% 65% 35% / 41% 58% 42% 59%']
                    : activeShape.borderRadius,
                  rotate: activeShape.rotate,
                  scale: activeShape.scale,
                  x: cursorOffset.x,
                  y: cursorOffset.y,
                }}
                transition={{
                  type: 'spring',
                  stiffness: elasticity,
                  damping: 15,
                  mass: 0.85,
                  borderRadius: isLiquidFlow
                    ? { repeat: Infinity, duration: 11, ease: 'easeInOut' }
                    : { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                }}
                className={`relative z-10 w-56 h-56 sm:w-68 sm:h-68 flex flex-col items-center justify-center cursor-pointer shadow-2xl overflow-hidden group border-2 border-white/60 dark:border-white/20 transition-all duration-300 ${
                  isWobbling ? 'animate-liquid-wobble' : ''
                }`}
                style={{
                  background: `radial-gradient(circle at 32% 32%, #ffffff 0%, ${activeShape.secondaryColor} 25%, ${activeShape.color} 70%, #402c25 150%)`,
                  boxShadow: `0 25px 60px -10px ${activeShape.glowColor}, inset 0 2px 14px rgba(255,255,255,0.7)`,
                }}
                onClick={() => {
                  playMagicChime(isMuted);
                  // Direct click cycles through shapes
                  const currIdx = DREAM_GEOMETRIES.findIndex((s) => s.id === activeShape.id);
                  const nextIdx = (currIdx + 1) % DREAM_GEOMETRIES.length;
                  handleSelect(DREAM_GEOMETRIES[nextIdx]);
                }}
                title="Click shape to morph to next geometry"
              >
                {/* Floating liquid refraction sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/35 to-transparent pointer-events-none animate-shimmer" />

                {/* Stardust Nodes that migrate to the shape's vertex points */}
                {activeShape.nodes.map((node, i) => (
                  <motion.span
                    key={i}
                    animate={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.4, 0.9, 0.4],
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 90,
                      damping: 14,
                      scale: { repeat: Infinity, duration: 3 + (i % 3), ease: 'easeInOut' },
                      opacity: { repeat: Infinity, duration: 2.5 + (i % 2), ease: 'easeInOut' },
                    }}
                    className="absolute w-2 h-2 rounded-full bg-[#f5c96a] shadow-[0_0_8px_#f5c96a] pointer-events-none -translate-x-1/2 -translate-y-1/2"
                  />
                ))}

                {/* Center Geometry Icon with spring swap */}
                <motion.div
                  key={activeShape.id}
                  initial={{ scale: 0.4, rotate: -25, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0.4, rotate: 25, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="relative z-20 flex flex-col items-center text-center p-4 text-[#402c25]"
                >
                  <activeShape.icon className="w-14 h-14 mb-2 drop-shadow-lg text-[#402c25]" />
                  <span className="text-xs font-bold font-display uppercase tracking-wider text-[#402c25]">
                    {activeShape.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] font-mono opacity-80 mt-0.5">
                    Click to Morph
                  </span>
                </motion.div>
              </motion.div>

              {/* Orbiting celestial star particles */}
              <div className="absolute inset-0 pointer-events-none z-20" aria-hidden="true">
                <span className="absolute top-4 left-8 text-xs text-[#f5c96a] star-twinkle">✦</span>
                <span className="absolute bottom-6 right-8 text-sm text-[#dba7b9] star-twinkle" style={{ animationDelay: '1.2s' }}>✧</span>
                <span className="absolute top-12 right-12 text-xs text-[#c7b6df] star-twinkle" style={{ animationDelay: '2s' }}>✦</span>
              </div>
            </div>

            {/* Bottom Controls: Fluid Flow & Elasticity Slider */}
            <div className="mt-4 w-full max-w-sm flex flex-col items-center gap-3">
              <div className="flex items-center justify-between w-full text-xs">
                <button
                  onClick={() => {
                    playUiChime(isMuted);
                    setIsLiquidFlow(!isLiquidFlow);
                  }}
                  className={`py-1.5 px-3.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                    isLiquidFlow
                      ? 'bg-[#a34063] text-white shadow-xs'
                      : 'bg-[#fff8f1] dark:bg-[#28213d] text-[#6e544b] dark:text-[#dcd2ea] border border-[#f0dfcf] dark:border-[#43395c]'
                  }`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLiquidFlow ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                  <span>{isLiquidFlow ? 'Liquid Undulation: On' : 'Rigid Geometry'}</span>
                </button>

                <div className="flex items-center gap-1.5 text-[#6e544b] dark:text-[#dcd2ea]">
                  <Sliders className="w-3.5 h-3.5 text-[#f5c96a]" />
                  <span className="text-[11px] font-mono">Tension: {elasticity}</span>
                </div>
              </div>

              {/* Elasticity Slider */}
              <input
                type="range"
                min="40"
                max="130"
                value={elasticity}
                onChange={(e) => setElasticity(Number(e.target.value))}
                className="w-full h-1.5 bg-[#f0dfcf] dark:bg-[#43395c] rounded-lg appearance-none cursor-pointer accent-[#a34063]"
                aria-label="Shape spring tension stiffness"
              />
            </div>
          </div>

          {/* Right Column: 6 Geometry Selector Buttons & Live Telemetry Dossier */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#a34063] dark:text-[#dba7b9] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#f5c96a]" />
                  <span>Morph Between 6 Stardust Shapes:</span>
                </span>
                <span className="text-[11px] font-mono text-[#9c8278] dark:text-[#a69bb8]">
                  Select to Morph
                </span>
              </div>

              {/* 6 Shape Selection Grid with soft transforms and alive hover states */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {DREAM_GEOMETRIES.map((shape) => {
                  const isSelected = activeShapeId === shape.id;
                  const Icon = shape.icon;

                  return (
                    <button
                      key={shape.id}
                      onClick={() => handleSelect(shape)}
                      aria-pressed={isSelected}
                      className={`p-3 rounded-2xl text-left transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.97] border flex flex-col gap-2 group relative overflow-hidden ${
                        isSelected
                          ? 'bg-[#fff8f1] dark:bg-[#28213d] border-[#a34063] dark:border-[#f5c96a] shadow-lg ring-2 ring-[#a34063]/30 dark:ring-[#f5c96a]/30'
                          : 'bg-[#ffffff] dark:bg-[#302847] border-[#f0dfcf] dark:border-[#43395c] hover:border-[#dba7b9] hover:shadow-xs'
                      }`}
                    >
                      {/* Active glowing indicator pill */}
                      {isSelected && (
                        <motion.div
                          layoutId="active-shape-indicator"
                          className="absolute inset-0 bg-gradient-to-br from-[#f4d7df]/30 via-transparent to-[#f5c96a]/20 pointer-events-none"
                        />
                      )}

                      <div className="flex items-center justify-between">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                          style={{
                            backgroundColor: `${shape.color}35`,
                            color: isSelected ? '#a34063' : shape.color,
                          }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#f5c96a] animate-ping" />
                        )}
                      </div>

                      <div className="truncate">
                        <div className="text-xs font-bold text-[#402c25] dark:text-[#fcf8f2] truncate">
                          {shape.name.split(' ')[0]}
                        </div>
                        <div className="text-[10px] text-[#9c8278] dark:text-[#a69bb8] truncate">
                          {shape.role}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Geometry Specs Card with animated morph cross-fade */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeShape.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="p-6 rounded-2xl bg-[#fff8f1] dark:bg-[#28213d] border border-[#f0dfcf] dark:border-[#43395c] space-y-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#a34063] dark:text-[#f5c96a]">
                      Active Shape Specification
                    </span>
                    <h4 className="text-lg font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2] mt-0.5">
                      {activeShape.name}
                    </h4>
                  </div>
                  <div
                    className="p-2 rounded-xl"
                    style={{ backgroundColor: `${activeShape.color}30` }}
                  >
                    <activeShape.icon className="w-5 h-5" style={{ color: activeShape.color }} />
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#6e544b] dark:text-[#dcd2ea] leading-relaxed">
                  {activeShape.description}
                </p>

                {/* Telemetry Strip with 4 stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-[#f0dfcf] dark:border-[#43395c] text-center">
                  <div className="p-2.5 rounded-xl bg-white/80 dark:bg-[#302847]/80 shadow-2xs">
                    <span className="text-[10px] text-[#9c8278] dark:text-[#a69bb8] block">Buoyancy</span>
                    <span className="text-xs font-bold font-mono text-[#402c25] dark:text-[#fcf8f2]">
                      {activeShape.stats.buoyancy}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/80 dark:bg-[#302847]/80 shadow-2xs">
                    <span className="text-[10px] text-[#9c8278] dark:text-[#a69bb8] block">Warmth</span>
                    <span className="text-xs font-bold font-mono text-[#402c25] dark:text-[#fcf8f2]">
                      {activeShape.stats.warmth}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/80 dark:bg-[#302847]/80 shadow-2xs">
                    <span className="text-[10px] text-[#9c8278] dark:text-[#a69bb8] block">Resonance</span>
                    <span className="text-xs font-bold font-mono text-[#402c25] dark:text-[#fcf8f2]">
                      {activeShape.stats.frequency}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/80 dark:bg-[#302847]/80 shadow-2xs">
                    <span className="text-[10px] text-[#9c8278] dark:text-[#a69bb8] block">Tension</span>
                    <span className="text-xs font-bold font-mono text-[#402c25] dark:text-[#fcf8f2] truncate">
                      {activeShape.stats.surfaceTension.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
