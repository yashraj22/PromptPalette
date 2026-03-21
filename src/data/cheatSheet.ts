import type { CheatCategoryData } from '../types/content';

const chip = (label: string) => ({ label });

export const cheatSheetCategories: CheatCategoryData[] = [
	{ category: 'Mood', keywords: ['elegant', 'playful', 'futuristic', 'minimal', 'luxurious', 'moody', 'energetic', 'serene', 'dramatic', 'sophisticated', 'cinematic', 'editorial', 'raw', 'calm', 'optimistic', 'mysterious'].map(chip) },
	{ category: 'Product', keywords: ['SaaS dashboard', 'portfolio site', 'ecommerce storefront', 'agency landing page', 'finance app', 'developer tool', 'knowledge base', 'AI product UI', 'course platform', 'healthcare portal'].map(chip) },
	{ category: 'Content', keywords: ['product-led copy', 'utility-first labels', 'editorial storytelling', 'concise microcopy', 'premium brand voice', 'conversion-focused messaging', 'technical documentation tone'].map(chip) },
	{ category: 'Spacing / Density', keywords: ['generous whitespace', 'dense layout', 'compact', 'airy', 'breathing room', 'tight spacing', 'spacious', 'packed', 'open', 'cramped', 'modular rhythm', 'tight gutters', 'wide margins', 'balanced density'].map(chip) },
	{ category: 'Surface / Material', keywords: ['matte', 'glossy', 'textured', 'frosted', 'metallic', 'glass', 'paper', 'fabric', 'ceramic', 'leather', 'wood grain', 'concrete', 'chrome', 'brushed steel', 'stone', 'liquid sheen'].map(chip) },
	{ category: 'Visual Hierarchy', keywords: ['focal point', 'contrast', 'emphasis', 'scale variation', 'color weight', 'type hierarchy', 'visual anchor', 'leading element', 'progressive disclosure', 'clear CTA emphasis', 'section rhythm', 'headline dominance'].map(chip) },
	{ category: 'Animation / Motion', keywords: ['fade in', 'slide up', 'parallax scroll', 'spring physics', 'stagger animation', 'morph transition', 'hover lift', 'elastic bounce', 'smooth ease', 'kinetic typography', 'auto-scroll', 'reveal on scroll', 'scroll snap', 'ambient loop', 'shared transition'].map(chip) },
	{ category: 'Era / Movement', keywords: ['modernist', 'postmodern', 'art nouveau', 'swiss design', 'mid-century', 'brutalist', 'victorian', 'futurist', 'deconstructivist', 'psychedelic', 'industrial', 'art deco', 'y2k', 'retro futurism', 'scandinavian modern'].map(chip) },
	{ category: 'Composition', keywords: ['rule of thirds', 'golden ratio', 'symmetry', 'asymmetry', 'radial balance', 'grid alignment', 'negative space', 'visual flow', 'layered depth', 'editorial crop', 'edge-to-edge framing', 'stacked modules'].map(chip) },
	{ category: 'Texture', keywords: ['grain', 'noise', 'stipple', 'crosshatch', 'linen', 'canvas', 'rough', 'smooth', 'distressed', 'weathered', 'halftone', 'paper fiber', 'frosted haze', 'tactile finish'].map(chip) },
	{ category: 'Color Direction', keywords: ['high contrast palette', 'muted neutrals', 'warm sunset hues', 'cool blue system', 'earth-tone palette', 'acid brights', 'jewel tones', 'greyscale base', 'duotone treatment', 'brand accent restraint'].map(chip) },
	{ category: 'UI Patterns', keywords: ['sticky sidebar', 'tabbed interface', 'command palette', 'search-first layout', 'floating CTA', 'dashboard rail', 'split hero', 'bento modules', 'comparison table', 'wizard flow', 'timeline section', 'gallery carousel'].map(chip) },
];
