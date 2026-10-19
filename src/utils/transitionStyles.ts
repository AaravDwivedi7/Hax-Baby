/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Transition styles and SVG morph paths for unreal page transitions
 */

export type TransitionMode = 'celestial' | 'liquid' | 'warp' | 'origami';

export interface ShapeMorphPath {
  id: string;
  name: string;
  path: string;
  fill: string;
  viewBox: string;
}

// Highly stylized SVG paths normalized to a 200x200 viewBox for shape morphing
export const MORPH_SHAPES = {
  // 8-Point Cosmic Stardust Star
  star: 'M 100 0 L 124 76 L 200 100 L 124 124 L 100 200 L 76 124 L 0 100 L 76 76 Z',
  
  // Fluid Zero-Gravity Dream Droplet
  droplet: 'M 100 6 C 160 6 194 56 194 112 C 194 164 154 194 100 194 C 46 194 6 164 6 112 C 6 56 40 6 100 6 Z',
  
  // Slumber Crescent Moon
  crescent: 'M 100 12 C 165 24 192 84 172 144 C 150 192 88 198 38 176 C 98 156 122 104 112 54 C 108 34 94 18 100 12 Z',
  
  // Crystalline Hexagonal Dream Crystal
  crystal: 'M 100 10 L 180 55 L 180 145 L 100 190 L 20 145 L 20 55 Z',
  
  // Billowing Cumulus Dream Cloud
  cloud: 'M 55 145 C 22 145 10 118 26 96 C 20 72 52 50 82 62 C 102 36 144 42 158 68 C 188 68 198 98 182 124 C 192 144 172 160 152 154 C 132 164 72 164 55 145 Z',
  
  // Hyperspace Circular Stargate Iris
  iris: 'M 100 0 A 100 100 0 1 0 100 200 A 100 100 0 1 0 100 0 Z',
};

export const TRANSITION_PRESETS: Record<
  TransitionMode,
  {
    name: string;
    description: string;
    icon: string;
    morphSequence: string[];
    colors: string[];
  }
> = {
  celestial: {
    name: 'Celestial Stardust',
    description: 'Star to Moon to Radiant Sun iris with golden stardust rings',
    icon: '✨',
    morphSequence: [MORPH_SHAPES.star, MORPH_SHAPES.crescent, MORPH_SHAPES.cloud, MORPH_SHAPES.iris],
    colors: ['#f5c96a', '#dba7b9', '#a34063', '#201d39'],
  },
  liquid: {
    name: 'Liquid Dream Droplet',
    description: 'Bézier fluid undulation washing across dimensions',
    icon: '💧',
    morphSequence: [MORPH_SHAPES.droplet, MORPH_SHAPES.cloud, MORPH_SHAPES.star, MORPH_SHAPES.iris],
    colors: ['#c7b6df', '#f4d7df', '#f5c96a', '#1a1730'],
  },
  warp: {
    name: 'Cosmic Hyperspace',
    description: 'Radial warp tunnel with light-speed particle trails',
    icon: '🌌',
    morphSequence: [MORPH_SHAPES.star, MORPH_SHAPES.crystal, MORPH_SHAPES.iris],
    colors: ['#99e1d9', '#c7b6df', '#201d39', '#f5c96a'],
  },
  origami: {
    name: 'Crystalline Origami',
    description: 'Faceted geometric prism unfolding into new dreams',
    icon: '💎',
    morphSequence: [MORPH_SHAPES.crystal, MORPH_SHAPES.star, MORPH_SHAPES.crescent, MORPH_SHAPES.iris],
    colors: ['#f5c96a', '#a34063', '#473859', '#fff8f1'],
  },
};
