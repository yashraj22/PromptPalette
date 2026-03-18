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
];
