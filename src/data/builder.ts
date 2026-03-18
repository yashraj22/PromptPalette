import type { BuilderCategoryData } from '../types/content';

export const builderCategories: BuilderCategoryData[] = [
	{ label: 'Style', options: ['glassmorphism', 'neumorphism', 'neubrutalism', 'minimalist', 'dark luxury', 'flat design', 'cyberpunk', 'vaporwave', 'art deco', 'bauhaus', 'claymorphism', 'memphis'] },
	{ label: 'Layout', options: ['bento grid', 'split screen', 'card grid', 'sidebar layout', 'masonry', 'single column', 'full-bleed hero', 'asymmetric'] },
	{ label: 'Typography', options: ['serif', 'sans-serif', 'monospace', 'display type', 'handwritten', 'bold weight', 'light weight', 'condensed'] },
	{ label: 'Color', options: ['monochromatic', 'complementary', 'pastel', 'neon', 'earth tones', 'dark mode', 'warm palette', 'cool palette', 'jewel tones'] },
	{ label: 'Effects', options: ['gradient', 'grain texture', 'blur', 'neon glow', 'shadow elevation', 'parallax', 'glass overlay', 'dot grid', 'scan lines'] },
	{ label: 'Mood', options: ['elegant', 'playful', 'futuristic', 'minimal', 'luxurious', 'moody', 'energetic', 'serene', 'dramatic', 'sophisticated'] },
];
