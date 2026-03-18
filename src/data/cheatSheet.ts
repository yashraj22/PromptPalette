import type { CheatCategoryData } from '../types/content';

const chip = (label: string) => ({ label });

export const cheatSheetCategories: CheatCategoryData[] = [
	{ category: 'Mood / Atmosphere', keywords: ['elegant', 'playful', 'futuristic', 'minimalist', 'luxurious', 'moody', 'vibrant', 'serene', 'dramatic', 'whimsical', 'sophisticated', 'energetic', 'cozy', 'ethereal'].map(chip) },
	{ category: 'Spacing / Density', keywords: ['generous whitespace', 'dense layout', 'compact', 'airy', 'breathing room', 'tight spacing', 'spacious', 'packed', 'open', 'cramped'].map(chip) },
	{ category: 'Surface / Material', keywords: ['matte', 'glossy', 'textured', 'frosted', 'metallic', 'glass', 'paper', 'fabric', 'ceramic', 'leather', 'wood grain', 'concrete'].map(chip) },
	{ category: 'Visual Hierarchy', keywords: ['focal point', 'contrast', 'emphasis', 'scale variation', 'color weight', 'type hierarchy', 'visual anchor', 'leading element', 'progressive disclosure'].map(chip) },
	{ category: 'Animation / Motion', keywords: ['fade in', 'slide up', 'parallax scroll', 'spring physics', 'stagger animation', 'morph transition', 'hover lift', 'elastic bounce', 'smooth ease', 'kinetic typography', 'auto-scroll', 'reveal on scroll'].map(chip) },
	{ category: 'Era / Movement', keywords: ['modernist', 'postmodern', 'art nouveau', 'swiss design', 'mid-century', 'brutalist', 'victorian', 'futurist', 'deconstructivist', 'psychedelic', 'industrial'].map(chip) },
	{ category: 'Composition', keywords: ['rule of thirds', 'golden ratio', 'symmetry', 'asymmetry', 'radial balance', 'grid alignment', 'negative space', 'visual flow', 'layered depth'].map(chip) },
	{ category: 'Texture', keywords: ['grain', 'noise', 'stipple', 'crosshatch', 'linen', 'canvas', 'rough', 'smooth', 'distressed', 'weathered'].map(chip) },
];
