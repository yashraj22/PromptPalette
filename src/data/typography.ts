import type { TypographyCardData } from '../types/content';

const chip = (label: string) => ({ label });

export const typographyCards: TypographyCardData[] = [
	{ title: 'Serif vs Sans-Serif', description: 'Serifs add formality and tradition; sans-serifs feel modern and neutral. The foundational choice.', chips: [chip('serif font'), chip('sans-serif'), chip('editorial typography'), chip('modern type')], demoKey: 'serifSans', featured: true },
	{ title: 'Font Weight Spectrum', description: 'Weight creates hierarchy - from hairline to black, each step shifts visual importance.', chips: [chip('bold typography'), chip('light weight font'), chip('weight contrast')], demoKey: 'weight' },
	{ title: 'Display / Hero Type', description: 'Oversized headline typography designed for impact. Tight tracking, heavy weight, maximum presence.', chips: [chip('display typography'), chip('hero text'), chip('oversized headline')], demoKey: 'display' },
	{ title: 'Monospace', description: 'Fixed-width characters. Technical, precise, code-like. Signals developer tools and data.', chips: [chip('monospace font'), chip('code typography'), chip('terminal font')], demoKey: 'mono' },
	{ title: 'Letter Spacing', description: 'Tracking (letter-spacing) controls density and mood - tight for headlines, wide for labels.', chips: [chip('tight tracking'), chip('wide letter spacing'), chip('spaced uppercase')], demoKey: 'spacing' },
	{ title: 'Case & Transform', description: 'Text transforms set tone: uppercase screams, lowercase whispers, small caps add formality.', chips: [chip('uppercase text'), chip('small caps'), chip('title case')], demoKey: 'case' },
	{ title: 'Variable Fonts', description: 'Single font file with continuous weight/width axes. Smoother transitions, smaller files.', chips: [chip('variable font'), chip('fluid typography'), chip('weight axis')], demoKey: 'variable' },
	{ title: 'Handwritten / Script', description: 'Calligraphic and brush script fonts that add personality, warmth, and human touch.', chips: [chip('handwritten font'), chip('script typography'), chip('calligraphic')], demoKey: 'script' },
	{ title: 'Slab Serif', description: 'Thick, block-like serifs. Strong, confident, and industrial. Great for headlines and branding.', chips: [chip('slab serif'), chip('block serif'), chip('industrial type')], demoKey: 'slab' },
	{ title: 'Condensed / Extended', description: 'Narrow condensed faces pack more text; extended faces feel spacious and editorial.', chips: [chip('condensed font'), chip('extended width'), chip('narrow type')], demoKey: 'width' },
	{ title: 'Font Pairing', description: 'Contrasting typefaces that complement - usually serif + sans, or display + body.', chips: [chip('font pairing'), chip('type contrast'), chip('serif sans pair')], demoKey: 'pairing' },
	{ title: 'Editorial Italics', description: 'Italic faces add cadence, sophistication, and a human editorial note when used as contrast rather than default body text.', chips: [chip('editorial italics'), chip('italic contrast'), chip('fashion typography')], demoKey: 'script' },
	{ title: 'Numerical Systems', description: 'Tabular numerals, oldstyle figures, and monospaced numbers matter in finance, dashboards, and data-heavy interfaces.', chips: [chip('tabular numerals'), chip('data typography'), chip('numeric alignment')], demoKey: 'mono' },
	{ title: 'Readable Body Copy', description: 'Measure, line height, and comfortable paragraph rhythm are what make long-form text feel effortless to scan.', chips: [chip('readable body copy'), chip('comfortable line height'), chip('editorial readability')], demoKey: 'pairing' },
	{ title: 'Micro Labels', description: 'Small uppercase labels and interface metadata create structure, grouping, and product polish when kept restrained.', chips: [chip('micro labels'), chip('small uppercase'), chip('interface metadata')], demoKey: 'case' },
	{ title: 'High-Contrast Pairing', description: 'Deliberately mixing a dramatic display face with quiet utility text creates premium tension and hierarchy.', chips: [chip('high-contrast typography'), chip('display plus body'), chip('premium type pairing')], demoKey: 'display' },
	{ title: 'Responsive Type Scale', description: 'Typography should expand and compress with the viewport so hierarchy survives from mobile to desktop.', chips: [chip('responsive typography'), chip('fluid type scale'), chip('viewport-based sizing')], demoKey: 'variable' },
];
