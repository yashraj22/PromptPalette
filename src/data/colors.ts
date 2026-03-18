import type { ColorSchemeData } from '../types/content';

const chip = (label: string) => ({ label });

export const colorSchemes: ColorSchemeData[] = [
	{ name: 'Monochromatic', description: 'Variations of a single hue - unified and harmonious.', swatches: ['#1a3a5c', '#2a5a8c', '#3a7abc', '#6a9ad0', '#a0c4e8'], chips: [chip('monochromatic palette'), chip('single hue'), chip('tonal variation')] },
	{ name: 'Complementary', description: 'Opposite hues on the color wheel - maximum contrast and energy.', swatches: ['#e63946', '#f4a261', '#fefae0', '#457b9d', '#1d3557'], chips: [chip('complementary colors'), chip('high contrast palette'), chip('opposing hues')] },
	{ name: 'Analogous', description: 'Adjacent hues - naturally cohesive and easy on the eyes.', swatches: ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'], chips: [chip('analogous palette'), chip('adjacent hues'), chip('harmonious colors')] },
	{ name: 'Triadic', description: 'Three evenly spaced hues - vibrant yet balanced.', swatches: ['#ef476f', '#ffd166', '#06d6a0', '#118ab2', '#073b4c'], chips: [chip('triadic colors'), chip('three-color palette'), chip('vibrant balanced')] },
	{ name: 'Split-Complementary', description: 'A base hue plus two adjacent to its complement - versatile contrast.', swatches: ['#5f0f40', '#9a031e', '#fb8b24', '#e36414', '#0f4c5c'], chips: [chip('split complementary'), chip('versatile contrast'), chip('offset palette')] },
	{ name: 'Warm', description: 'Reds, oranges, yellows - energetic, inviting, and passionate.', swatches: ['#6a040f', '#9d0208', '#d00000', '#e85d04', '#faa307'], chips: [chip('warm colors'), chip('red orange palette'), chip('energetic tones')] },
	{ name: 'Cool', description: 'Blues, greens, purples - calming, professional, and serene.', swatches: ['#03045e', '#0077b6', '#00b4d8', '#90e0ef', '#caf0f8'], chips: [chip('cool colors'), chip('blue palette'), chip('calming tones')] },
	{ name: 'Pastel', description: 'Desaturated, soft tints - gentle, friendly, and approachable.', swatches: ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#a0c4ff'], chips: [chip('pastel colors'), chip('soft tints'), chip('gentle palette')] },
	{ name: 'Neon / Vibrant', description: 'Fully saturated, electric hues - attention-grabbing and bold.', swatches: ['#ff006e', '#fb5607', '#ffbe0b', '#8338ec', '#3a86ff'], chips: [chip('neon colors'), chip('vibrant palette'), chip('electric hues'), chip('saturated')] },
	{ name: 'Earth Tones', description: 'Natural browns, greens, tans - grounded, organic, and warm.', swatches: ['#582f0e', '#7f4f24', '#936639', '#a68a64', '#b6ad90'], chips: [chip('earth tones'), chip('natural palette'), chip('organic colors')] },
	{ name: 'Jewel Tones', description: 'Deep, rich hues like emerald, sapphire, ruby - luxurious and regal.', swatches: ['#6a0572', '#ab0d77', '#c71585', '#008080', '#004d40'], chips: [chip('jewel tones'), chip('rich colors'), chip('luxurious palette'), chip('regal hues')] },
	{ name: 'Neutral / Greyscale', description: 'Pure black-to-white scale - timeless, sophisticated, and versatile.', swatches: ['#111111', '#333333', '#666666', '#999999', '#cccccc'], chips: [chip('greyscale'), chip('neutral palette'), chip('monochrome'), chip('black and white')] },
	{ name: 'Duotone', description: 'Two contrasting colors applied over imagery - bold and graphic.', swatches: ['#0d0221', '#261447', '#6b1fb1', '#c471f5', '#f8ceec'], chips: [chip('duotone'), chip('two-color'), chip('gradient overlay')] },
	{ name: 'Dark Mode Palette', description: 'Low-luminance backgrounds with high-contrast foreground elements.', swatches: ['#000000', '#111111', '#1a1a1a', '#ededed', '#0070f3'], chips: [chip('dark mode'), chip('dark UI palette'), chip('low luminance'), chip('dark background')] },
];
