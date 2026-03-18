import type { StyleCardData } from '../types/content';

const chip = (label: string) => ({ label });

export const styleCards: StyleCardData[] = [
	{
		title: 'Glassmorphism',
		description:
			'Frosted translucent panels with background blur, layered over colorful gradients for depth.',
		chips: [chip('glassmorphism'), chip('frosted glass'), chip('backdrop blur'), chip('translucent panels')],
		demoKey: 'glass',
	},
	{
		title: 'Neumorphism',
		description:
			'Soft extruded UI where elements appear pushed out or pressed into the surface using dual shadows.',
		chips: [chip('neumorphism'), chip('soft UI'), chip('embossed'), chip('inset shadow')],
		demoKey: 'neumorph',
	},
	{
		title: 'Neubrutalism',
		description:
			'Bold black borders, hard drop shadows, clashing colors, and intentionally raw typography.',
		chips: [chip('neubrutalism'), chip('bold borders'), chip('hard shadow'), chip('raw aesthetic')],
		demoKey: 'neubrutalism',
	},
	{
		title: 'Minimalism',
		description:
			'Maximum whitespace, essential content only. Every element must earn its place.',
		chips: [chip('minimalist'), chip('whitespace'), chip('clean layout'), chip('reductive')],
		demoKey: 'minimal',
	},
	{
		title: 'Dark Luxury',
		description:
			'Rich dark backgrounds with gold or cream accents, serif typography, and understated opulence.',
		chips: [chip('dark luxury'), chip('gold accents'), chip('premium dark theme')],
		demoKey: 'darklux',
	},
	{
		title: 'Flat Design',
		description:
			'Zero shadows, zero gradients. Solid 2D shapes, bright colors, and crisp vector aesthetics.',
		chips: [chip('flat design'), chip('2D shapes'), chip('no shadows'), chip('solid colors')],
		demoKey: 'flat',
	},
	{
		title: 'Retro / Y2K',
		description:
			'Early 2000s nostalgia - neon glows, terminal aesthetics, pixel vibes, and CRT scan lines.',
		chips: [chip('Y2K aesthetic'), chip('retro digital'), chip('terminal style'), chip('pixel art')],
		demoKey: 'retro',
	},
	{
		title: 'Organic / Nature',
		description:
			'Soft curves, earthy palettes, blob shapes, and natural textures that feel alive.',
		chips: [chip('organic shapes'), chip('earthy tones'), chip('blob design'), chip('nature inspired')],
		demoKey: 'organic',
	},
	{
		title: 'Skeuomorphism',
		description:
			'Realistic textures mimicking physical objects - leather, wood, metal, stitching, and depth.',
		chips: [chip('skeuomorphic'), chip('realistic textures'), chip('physical materials')],
		demoKey: 'skeuo',
	},
	{
		title: 'Material Design',
		description:
			"Google's system: layered paper metaphor with elevation shadows, bold color, and purposeful motion.",
		chips: [chip('material design'), chip('elevation shadows'), chip('paper layers')],
		demoKey: 'material',
	},
	{
		title: 'Art Deco',
		description:
			'1920s luxury - geometric patterns, gold-on-dark palettes, symmetry, and ornamental precision.',
		chips: [chip('art deco'), chip('geometric patterns'), chip('gold and black'), chip('1920s style')],
		demoKey: 'artdeco',
	},
	{
		title: 'Cyberpunk',
		description:
			'Neon on black, glitch effects, scan lines, and a dystopian tech-noir atmosphere.',
		chips: [chip('cyberpunk'), chip('neon glow'), chip('glitch effect'), chip('scan lines')],
		demoKey: 'cyberpunk',
	},
	{
		title: 'Memphis',
		description:
			'1980s playful geometry - bold patterns, squiggles, polka dots, and clashing colors.',
		chips: [chip('memphis design'), chip('80s geometric'), chip('bold patterns'), chip('squiggles')],
		demoKey: 'memphis',
	},
	{
		title: 'Bauhaus',
		description:
			'Primary colors, geometric primitives, functional design. Form follows function - nothing more.',
		chips: [chip('bauhaus'), chip('primary colors'), chip('geometric forms'), chip('functional design')],
		demoKey: 'bauhaus',
	},
	{
		title: 'Vaporwave',
		description:
			'Purple-pink gradients, retro-futuristic grids, nostalgic surrealism, and digital decay.',
		chips: [chip('vaporwave'), chip('retro futurism'), chip('pink purple gradient'), chip('perspective grid')],
		demoKey: 'vaporwave',
	},
	{
		title: 'Claymorphism',
		description:
			'3D clay-like appearance, pastel colors, soft inflated shapes with subtle inner shadows.',
		chips: [chip('claymorphism'), chip('3D clay look'), chip('pastel inflated'), chip('soft 3D')],
		demoKey: 'clay',
	},
];
