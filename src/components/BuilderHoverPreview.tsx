import { colorSchemes } from '../data/colors';
import { effects } from '../data/effects';
import { layoutCards } from '../data/layouts';
import { styleCards } from '../data/styles';
import { typographyCards } from '../data/typography';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import type { LayoutCardData, StyleCardData, TypographyCardData } from '../types/content';

export interface BuilderPreview {
	keyword: string;
	title: string;
	category: string;
	description: string;
	tags: string[];
	swatches?: string[];
	styleDemoKey?: StyleCardData['demoKey'];
	layoutDemoKey?: LayoutCardData['demoKey'];
	typographyDemoKey?: TypographyCardData['demoKey'];
	effectDemoHtml?: string;
	effectDemoStyle?: string;
	moodDemoKey?: string;
	productDemoKey?: string;
	contentDemoKey?: string;
	keywordSceneCategory?: string;
	keywordSceneLabel?: string;
}

export interface HoverPreviewState {
	preview: BuilderPreview;
	left: number;
	top: number;
	placement: 'top' | 'bottom';
}

const normalize = (value: string) => value.trim().toLowerCase();
const previewMap = new Map<string, BuilderPreview>();

const registerPreview = (aliases: string[], preview: BuilderPreview) => {
	for (const alias of aliases) {
		previewMap.set(normalize(alias), preview);
	}
};

for (const card of styleCards) {
	registerPreview([card.title, ...card.chips.map((chip) => chip.label)], {
		keyword: card.chips[0]?.label ?? card.title,
		title: card.title,
		category: 'Style',
		description: card.description,
		tags: card.chips.slice(0, 3).map((chip) => chip.label),
		styleDemoKey: card.demoKey,
	});
}

for (const card of layoutCards) {
	registerPreview([card.title, ...card.chips.map((chip) => chip.label)], {
		keyword: card.chips[0]?.label ?? card.title,
		title: card.title,
		category: 'Layout',
		description: card.description,
		tags: card.chips.slice(0, 3).map((chip) => chip.label),
		layoutDemoKey: card.demoKey,
	});
}

for (const card of typographyCards) {
	registerPreview([card.title, ...card.chips.map((chip) => chip.label)], {
		keyword: card.chips[0]?.label ?? card.title,
		title: card.title,
		category: 'Typography',
		description: card.description,
		tags: card.chips.slice(0, 3).map((chip) => chip.label),
		typographyDemoKey: card.demoKey,
	});
}

for (const scheme of colorSchemes) {
	registerPreview([scheme.name, ...scheme.chips.map((chip) => chip.label)], {
		keyword: scheme.chips[0]?.label ?? scheme.name,
		title: scheme.name,
		category: 'Color',
		description: scheme.description,
		tags: scheme.chips.slice(0, 3).map((chip) => chip.label),
		swatches: scheme.swatches,
	});
}

for (const effect of effects) {
	registerPreview([effect.name, ...effect.chips.map((chip) => chip.label)], {
		keyword: effect.chips[0]?.label ?? effect.name,
		title: effect.name,
		category: 'Effect',
		description: effect.description,
		tags: effect.chips.slice(0, 3).map((chip) => chip.label),
		effectDemoHtml: effect.demoHtml,
		effectDemoStyle: effect.demoStyle,
	});
}

const aliasPreviews: Record<string, Partial<BuilderPreview>> = {
	serif: { title: 'Serif Type', category: 'Typography', typographyDemoKey: 'serifSans' },
	'sans-serif': { title: 'Sans-Serif Type', category: 'Typography', typographyDemoKey: 'serifSans' },
	'display type': { title: 'Display / Hero Type', category: 'Typography', typographyDemoKey: 'display' },
	handwritten: { title: 'Handwritten / Script', category: 'Typography', typographyDemoKey: 'script' },
	'bold weight': { title: 'Font Weight Spectrum', category: 'Typography', typographyDemoKey: 'weight' },
	'light weight': { title: 'Font Weight Spectrum', category: 'Typography', typographyDemoKey: 'weight' },
	condensed: { title: 'Condensed / Extended', category: 'Typography', typographyDemoKey: 'width' },
	'fluid type scale': { title: 'Responsive Type Scale', category: 'Typography', typographyDemoKey: 'variable' },
	neon: { title: 'Neon / Vibrant', category: 'Color', swatches: ['#ff006e', '#fb5607', '#ffbe0b', '#8338ec', '#3a86ff'] },
	'dark mode': { title: 'Dark Mode Palette', category: 'Color', swatches: ['#000000', '#111111', '#1a1a1a', '#ededed', '#0070f3'] },
	'warm palette': { title: 'Warm Palette', category: 'Color', swatches: ['#6a040f', '#9d0208', '#d00000', '#e85d04', '#faa307'] },
	'cool palette': { title: 'Cool Palette', category: 'Color', swatches: ['#03045e', '#0077b6', '#00b4d8', '#90e0ef', '#caf0f8'] },
	blur: { title: 'Blur / Depth of Field', category: 'Effect', effectDemoHtml: effects.find((item) => item.name === 'Blur / Depth of Field')?.demoHtml },
	'shadow elevation': { title: 'Shadow / Elevation', category: 'Effect', effectDemoHtml: effects.find((item) => item.name === 'Shadow / Elevation')?.demoHtml },
	'glass overlay': { title: 'Glassmorphism Overlay', category: 'Effect', effectDemoHtml: effects.find((item) => item.name === 'Glassmorphism Overlay')?.demoHtml },
	'reflection gloss': { title: 'Reflection / Gloss', category: 'Effect', effectDemoHtml: effects.find((item) => item.name === 'Reflection / Gloss')?.demoHtml },
};

const moodDescriptions: Record<string, string> = {
	elegant: 'Shapes the interface toward refined spacing, restrained motion, and polished visual hierarchy.',
	playful: 'Pushes the UI toward brighter accents, lighter tone, and more expressive interactions.',
	futuristic: 'Leans into forward-looking visuals, sharper contrast, and high-tech presentation.',
	minimal: 'Reduces noise and emphasizes clean structure, breathing room, and focused content.',
	luxurious: 'Signals premium quality through rich materials, elevated contrast, and composed pacing.',
	moody: 'Introduces darker atmosphere, lower-key lighting, and more dramatic visual restraint.',
	energetic: 'Adds momentum with stronger color, bolder contrast, and faster-feeling composition.',
	serene: 'Favors calm spacing, softer tones, and a quieter reading rhythm.',
	dramatic: 'Builds tension with bold contrast, cinematic framing, and high-emphasis moments.',
	sophisticated: 'Balances confidence and restraint with crisp typography and editorial structure.',
	cinematic: 'Frames the experience with immersive composition, contrast, and storytelling cues.',
	editorial: 'Brings magazine-style hierarchy, expressive type, and narrative pacing to the UI.',
	raw: 'Keeps the interface intentionally unpolished, direct, and assertive.',
	calm: 'Supports a low-friction, reassuring interface with soft pacing and visual clarity.',
	optimistic: 'Steers the design toward upbeat color, positive tone, and approachable presentation.',
	mysterious: 'Creates intrigue through shadow, contrast, and selective information reveal.',
};

const productDescriptions: Record<string, string> = {
	'SaaS dashboard': 'Frames the prompt around metrics, navigation density, and a productivity-focused workspace.',
	'portfolio site': 'Centers the preview on personal branding, case study storytelling, and visual identity.',
	'ecommerce storefront': 'Orients the interface toward product discovery, merchandising, and conversion flow.',
	'agency landing page': 'Focuses on positioning, trust signals, service framing, and lead capture.',
	'finance app': 'Prioritizes clarity, confidence, structured data, and trustworthy interaction patterns.',
	'developer tool': 'Pushes the UI toward precision, information density, and workflow efficiency.',
	'knowledge base': 'Emphasizes navigation, scanability, and documentation-first organization.',
	'AI product UI': 'Shapes the preview around prompt input, generated output, and assistive workflows.',
	'course platform': 'Frames the interface around lessons, progress, and guided learning structure.',
	'healthcare portal': 'Prioritizes trust, accessibility, and clear task completion for sensitive workflows.',
};

const contentDescriptions: Record<string, string> = {
	'product-led copy': 'Keeps the language focused on capabilities, outcomes, and clear product value.',
	'utility-first labels': 'Pushes copy toward direct labels, short commands, and task-oriented wording.',
	'editorial storytelling': 'Turns the interface voice more narrative, layered, and story-driven.',
	'concise microcopy': 'Tightens every line so the UI feels efficient, clear, and lightweight.',
	'premium brand voice': 'Adds a more elevated, composed tone with selective, high-confidence language.',
	'conversion-focused messaging': 'Shapes headlines and supporting text around action, proof, and momentum.',
	'technical documentation tone': 'Makes the content precise, explanatory, and optimized for accuracy.',
};

const moodDemoKeys: Record<string, string> = {
	elegant: 'elegant',
	playful: 'playful',
	futuristic: 'futuristic',
	minimal: 'minimal',
	luxurious: 'luxurious',
	moody: 'moody',
	energetic: 'energetic',
	serene: 'serene',
	dramatic: 'dramatic',
	sophisticated: 'sophisticated',
	cinematic: 'cinematic',
	editorial: 'editorial',
	raw: 'raw',
	calm: 'calm',
	optimistic: 'optimistic',
	mysterious: 'mysterious',
};

const productDemoKeys: Record<string, string> = {
	'SaaS dashboard': 'dashboard',
	'portfolio site': 'portfolio',
	'ecommerce storefront': 'commerce',
	'agency landing page': 'landing',
	'finance app': 'finance',
	'developer tool': 'devtool',
	'knowledge base': 'docs',
	'AI product UI': 'ai',
	'course platform': 'course',
	'healthcare portal': 'health',
};

const contentDemoKeys: Record<string, string> = {
	'product-led copy': 'product',
	'utility-first labels': 'utility',
	'editorial storytelling': 'editorial',
	'concise microcopy': 'concise',
	'premium brand voice': 'premium',
	'conversion-focused messaging': 'conversion',
	'technical documentation tone': 'technical',
};

const colorDirectionSwatches: Record<string, string[]> = {
	'high contrast palette': ['#0b0b0c', '#f5f1e8', '#d72638', '#2e294e'],
	'muted neutrals': ['#f3efe7', '#d8d2c4', '#9d9487', '#544f47'],
	'warm sunset hues': ['#511730', '#b33951', '#f26b38', '#ffb24c'],
	'cool blue system': ['#102542', '#1f4e79', '#3e92cc', '#d9f0ff'],
	'earth-tone palette': ['#42322b', '#7d5a50', '#b4846c', '#d9c7a2'],
	'acid brights': ['#101820', '#d0ff00', '#00f5d4', '#ff006e'],
	'jewel tones': ['#2d033b', '#5c0f8b', '#0f766e', '#d4af37'],
	'greyscale base': ['#0f1115', '#4b5563', '#9ca3af', '#f3f4f6'],
	'duotone treatment': ['#0f172a', '#2563eb', '#f8fafc', '#38bdf8'],
	'brand accent restraint': ['#f8fafc', '#cbd5e1', '#64748b', '#0f172a'],
};

function toTitleCase(value: string) {
	return value
		.split(' ')
		.map((part) => (part ? `${part[0].toUpperCase()}${part.slice(1)}` : part))
		.join(' ');
}

function describeSpacingDensity(option: string) {
	const map: Record<string, string> = {
		'generous whitespace': 'Opens up the layout so modules breathe and the interface feels premium and calm.',
		'dense layout': 'Compresses the canvas to fit more information while keeping scanning efficient.',
		compact: 'Tightens component footprints so the UI feels efficient and highly functional.',
		airy: 'Introduces lighter pacing and more separation between major interface elements.',
		'breathing room': 'Adds intentional padding around key content so hierarchy reads immediately.',
		'tight spacing': 'Pulls related elements closer together to sharpen grouping and speed up scanning.',
		spacious: 'Expands margins and section gaps so the experience feels calmer and more editorial.',
		packed: 'Stacks information closely to signal density, utility, and high information throughput.',
		open: 'Keeps the visual field uncluttered with clear edges and generous negative space.',
		cramped: 'Creates deliberate pressure by minimizing margins and compressing layout intervals.',
		'modular rhythm': 'Repeats spacing intervals consistently so the screen feels structured and systematic.',
		'tight gutters': 'Narrows horizontal gaps to create compact grids and stronger adjacency.',
		'wide margins': 'Pushes content inward to create focus, framing, and a quieter reading rhythm.',
		'balanced density': 'Mixes dense and open zones so the UI stays useful without feeling crowded.',
	};
	return map[option] ?? `Uses ${option} to define how much space, compression, and breathing room the interface should have.`;
}

function describeSurfaceMaterial(option: string) {
	return `Uses ${option} surface cues to shape how the interface feels materially, from light response to tactile character.`;
}

function describeVisualHierarchy(option: string) {
	return `Uses ${option} to decide what grabs attention first, what supports it, and how the eye moves through the page.`;
}

function describeMotion(option: string) {
	return `Applies ${option} to control how elements enter, respond, and transition so the interface feels intentional in motion.`;
}

function describeEra(option: string) {
	return `Draws from ${option} references to set the historical design language, forms, and visual attitude of the interface.`;
}

function describeComposition(option: string) {
	return `Uses ${option} as the organizing rule for balance, framing, and directional flow across the layout.`;
}

function describeTexture(option: string) {
	return `Introduces ${option} into the visual finish so surfaces feel more tactile, atmospheric, or worn-in.`;
}

function describeColorDirection(option: string) {
	return `Uses ${option} to steer palette contrast, saturation, and emotional temperature across the interface.`;
}

function describeUiPattern(option: string) {
	return `Centers the layout around ${option} so the product structure and user flow are clear from the first glance.`;
}

function getCategoryPreview(option: string, category: string): Partial<BuilderPreview> | null {
	if (category === 'Mood') {
		return {
			title: `${option[0]?.toUpperCase() ?? ''}${option.slice(1)} Mood`,
			category,
			description: moodDescriptions[option] ?? 'Defines the emotional tone the UI should communicate at a glance.',
			tags: ['tone direction', 'visual atmosphere', option],
			moodDemoKey: moodDemoKeys[option],
		};
	}

	if (category === 'Product') {
		return {
			title: option,
			category,
			description: productDescriptions[option] ?? 'Sets the product context, core tasks, and UI expectations for the prompt.',
			tags: ['product context', 'use case', option],
			productDemoKey: productDemoKeys[option],
		};
	}

	if (category === 'Content') {
		return {
			title: option,
			category,
			description: contentDescriptions[option] ?? 'Defines how the interface should sound and what kind of copy structure it should use.',
			tags: ['content strategy', 'voice', option],
			contentDemoKey: contentDemoKeys[option],
		};
	}

	if (category === 'Spacing / Density') {
		return {
			title: toTitleCase(option),
			category,
			description: describeSpacingDensity(option),
			tags: ['layout rhythm', 'spacing control', option],
			keywordSceneCategory: 'spacing',
			keywordSceneLabel: option,
		};
	}

	if (category === 'Surface / Material') {
		return {
			title: toTitleCase(option),
			category,
			description: describeSurfaceMaterial(option),
			tags: ['surface language', 'material cue', option],
			keywordSceneCategory: 'material',
			keywordSceneLabel: option,
		};
	}

	if (category === 'Visual Hierarchy') {
		return {
			title: toTitleCase(option),
			category,
			description: describeVisualHierarchy(option),
			tags: ['attention order', 'hierarchy', option],
			keywordSceneCategory: 'hierarchy',
			keywordSceneLabel: option,
		};
	}

	if (category === 'Animation / Motion') {
		return {
			title: toTitleCase(option),
			category,
			description: describeMotion(option),
			tags: ['interaction motion', 'timing', option],
			keywordSceneCategory: 'motion',
			keywordSceneLabel: option,
		};
	}

	if (category === 'Era / Movement') {
		return {
			title: toTitleCase(option),
			category,
			description: describeEra(option),
			tags: ['historical reference', 'design movement', option],
			keywordSceneCategory: 'era',
			keywordSceneLabel: option,
		};
	}

	if (category === 'Composition') {
		return {
			title: toTitleCase(option),
			category,
			description: describeComposition(option),
			tags: ['composition rule', 'layout balance', option],
			keywordSceneCategory: 'composition',
			keywordSceneLabel: option,
		};
	}

	if (category === 'Texture') {
		return {
			title: toTitleCase(option),
			category,
			description: describeTexture(option),
			tags: ['surface texture', 'finish', option],
			keywordSceneCategory: 'texture',
			keywordSceneLabel: option,
		};
	}

	if (category === 'Color Direction') {
		return {
			title: toTitleCase(option),
			category,
			description: describeColorDirection(option),
			tags: ['palette strategy', 'color mood', option],
			swatches: colorDirectionSwatches[option],
			keywordSceneCategory: colorDirectionSwatches[option] ? undefined : 'colorDirection',
			keywordSceneLabel: colorDirectionSwatches[option] ? undefined : option,
		};
	}

	if (category === 'UI Patterns') {
		return {
			title: toTitleCase(option),
			category,
			description: describeUiPattern(option),
			tags: ['interface pattern', 'product structure', option],
			keywordSceneCategory: 'uiPattern',
			keywordSceneLabel: option,
		};
	}

	return null;
}

export function getBuilderPreview(option: string, category: string) {
	const mapped = previewMap.get(normalize(option));
	if (mapped) {
		return mapped;
	}

	const categoryPreview = getCategoryPreview(option, category);
	if (categoryPreview) {
		return {
			keyword: option,
			title: categoryPreview.title ?? option,
			category: categoryPreview.category ?? category,
			description: categoryPreview.description ?? '',
			tags: categoryPreview.tags ?? [category.toLowerCase(), 'prompt keyword'],
			swatches: categoryPreview.swatches,
			styleDemoKey: categoryPreview.styleDemoKey,
			layoutDemoKey: categoryPreview.layoutDemoKey,
			typographyDemoKey: categoryPreview.typographyDemoKey,
			effectDemoHtml: categoryPreview.effectDemoHtml,
			effectDemoStyle: categoryPreview.effectDemoStyle,
			moodDemoKey: categoryPreview.moodDemoKey,
			productDemoKey: categoryPreview.productDemoKey,
			contentDemoKey: categoryPreview.contentDemoKey,
			keywordSceneCategory: categoryPreview.keywordSceneCategory,
			keywordSceneLabel: categoryPreview.keywordSceneLabel,
		};
	}

	const alias = aliasPreviews[normalize(option)];
	return {
		keyword: option,
		title: alias?.title ?? option,
		category: alias?.category ?? category,
		description: `Preview for "${option}" in ${category.toLowerCase()} prompts.`,
		tags: [category.toLowerCase(), 'prompt keyword'],
		swatches: alias?.swatches,
		styleDemoKey: alias?.styleDemoKey,
		layoutDemoKey: alias?.layoutDemoKey,
		typographyDemoKey: alias?.typographyDemoKey,
		effectDemoHtml: alias?.effectDemoHtml,
		effectDemoStyle: alias?.effectDemoStyle,
		moodDemoKey: alias?.moodDemoKey,
		productDemoKey: alias?.productDemoKey,
		contentDemoKey: alias?.contentDemoKey,
		keywordSceneCategory: alias?.keywordSceneCategory,
		keywordSceneLabel: alias?.keywordSceneLabel,
	};
}

function renderMoodDemo(demoKey: string) {
	const moodMeta: Record<string, { title: string; note: string }> = {
		elegant: { title: 'Elegant', note: 'refined rhythm' },
		playful: { title: 'Playful', note: 'bright motion' },
		futuristic: { title: 'Futuristic', note: 'signal ahead' },
		minimal: { title: 'Minimal', note: 'reduced and exact' },
		luxurious: { title: 'Luxurious', note: 'rich finish' },
		moody: { title: 'Moody', note: 'after-hours contrast' },
		energetic: { title: 'Energetic', note: 'high pulse' },
		serene: { title: 'Serene', note: 'soft pace' },
		dramatic: { title: 'Dramatic', note: 'theatrical tension' },
		sophisticated: { title: 'Sophisticated', note: 'measured taste' },
		cinematic: { title: 'Cinematic', note: 'framed like a scene' },
		editorial: { title: 'Editorial', note: 'story-led layout' },
		raw: { title: 'Raw', note: 'rough and direct' },
		calm: { title: 'Calm', note: 'gentle clarity' },
		optimistic: { title: 'Optimistic', note: 'upward energy' },
		mysterious: { title: 'Mysterious', note: 'partial reveal' },
	};

	const meta = moodMeta[demoKey];
	if (!meta) return null;

	return (
		<div className={`builder-hover-visual builder-mood-preview builder-mood-preview-${demoKey}`}>
			<div className={`builder-mood-art builder-mood-art-${demoKey}`}>
				<div className="builder-mood-topline">Mood</div>
				<div className="builder-mood-shape builder-mood-shape-a"></div>
				<div className="builder-mood-shape builder-mood-shape-b"></div>
				<div className="builder-mood-shape builder-mood-shape-c"></div>
				<div className="builder-mood-caption">
					<div className="builder-mood-title">{meta.title}</div>
					<div className="builder-mood-note">{meta.note}</div>
				</div>
			</div>
		</div>
	);
}

function renderProductDemo(demoKey: string) {
	switch (demoKey) {
		case 'dashboard':
			return <div className="builder-hover-visual builder-product-scene builder-product-scene-dashboard"><div className="product-kicker">SaaS dashboard</div><div className="product-side"></div><div className="product-chart product-chart-line"></div><div className="product-stat product-stat-a"></div><div className="product-stat product-stat-b"></div><div className="product-stat product-stat-c"></div></div>;
		case 'portfolio':
			return <div className="builder-hover-visual builder-product-scene builder-product-scene-portfolio"><div className="product-kicker">Portfolio</div><div className="product-portrait"></div><div className="product-case-title"></div><div className="product-case-lines"><span></span><span></span></div></div>;
		case 'commerce':
			return <div className="builder-hover-visual builder-product-scene builder-product-scene-commerce"><div className="product-kicker">Storefront</div><div className="product-cart"></div><div className="product-card-grid"><span></span><span></span><span></span></div></div>;
		case 'landing':
			return <div className="builder-hover-visual builder-product-scene builder-product-scene-landing"><div className="product-kicker">Agency</div><div className="product-hero-copy"><span></span><span></span><span></span></div><div className="product-hero-cta"></div><div className="product-proof-row"><span></span><span></span><span></span></div></div>;
		case 'finance':
			return <div className="builder-hover-visual builder-product-scene builder-product-scene-finance"><div className="product-kicker">Finance</div><div className="product-balance"></div><div className="product-bars"><span></span><span></span><span></span><span></span></div><div className="product-ticker"></div></div>;
		case 'devtool':
			return <div className="builder-hover-visual builder-product-scene builder-product-scene-devtool"><div className="product-kicker">Developer tool</div><div className="product-terminal"></div><div className="product-code-lines"><span></span><span></span><span></span></div><div className="product-log"></div></div>;
		case 'docs':
			return <div className="builder-hover-visual builder-product-scene builder-product-scene-docs"><div className="product-kicker">Knowledge base</div><div className="product-doc-rail"></div><div className="product-doc-page"><span></span><span></span><span></span><span></span></div></div>;
		case 'ai':
			return <div className="builder-hover-visual builder-product-scene builder-product-scene-ai"><div className="product-kicker">AI product UI</div><div className="product-prompt"></div><div className="product-response"><span></span><span></span><span></span></div><div className="product-chip-row"><span></span><span></span></div></div>;
		case 'course':
			return <div className="builder-hover-visual builder-product-scene builder-product-scene-course"><div className="product-kicker">Course platform</div><div className="product-video"></div><div className="product-progress"></div><div className="product-lesson-list"><span></span><span></span><span></span></div></div>;
		case 'health':
			return <div className="builder-hover-visual builder-product-scene builder-product-scene-health"><div className="product-kicker">Healthcare</div><div className="product-cross"></div><div className="product-appointment"></div><div className="product-health-rows"><span></span><span></span><span></span></div></div>;
		default:
			return null;
	}
}

function renderContentDemo(demoKey: string) {
	const headlineMap: Record<string, string> = {
		product: 'Ship faster with clearer outcomes',
		utility: 'Save changes',
		editorial: 'A system with rhythm, tension, and story',
		concise: 'Clear. Fast. Done.',
		premium: 'Crafted for quiet confidence',
		conversion: 'Start your free trial today',
		technical: 'Configure auth with environment variables',
	};

	const eyebrowMap: Record<string, string> = {
		product: 'Benefit-led',
		utility: 'Action-first',
		editorial: 'Narrative',
		concise: 'Minimal copy',
		premium: 'Brand voice',
		conversion: 'CTA focus',
		technical: 'Docs tone',
	};

	const supportMap: Record<string, string> = {
		product: 'Explain value before features.',
		utility: 'Lead with direct actions.',
		editorial: 'Build tension and pacing.',
		concise: 'Trim every unnecessary word.',
		premium: 'Use selective, elevated language.',
		conversion: 'Drive toward one clear next step.',
		technical: 'Optimize for precision and clarity.',
	};

	return (
		<div className={`builder-hover-visual builder-content-scene builder-content-scene-${demoKey}`}>
			<div className="builder-content-card">
				<div className="builder-content-eyebrow">{eyebrowMap[demoKey] ?? 'Content'}</div>
				<div className="builder-content-headline">{headlineMap[demoKey] ?? 'Clear interface writing'}</div>
				<div className="builder-content-support">{supportMap[demoKey] ?? 'Copy direction preview.'}</div>
				<div className="builder-content-lines">
					<span></span>
					<span></span>
					<span></span>
				</div>
				<div className="builder-content-cta"></div>
			</div>
		</div>
	);
}

function renderStyleDemo(demoKey: StyleCardData['demoKey']) {
	switch (demoKey) {
		case 'glass': return <div className="demo-glass"><div className="orb1"></div><div className="orb2"></div><div className="panel">Frosted Glass</div></div>;
		case 'neumorph': return <div className="demo-neumorph"><div className="neu-card"><div className="neu-title">Soft UI</div><div className="neu-btn">Button</div></div></div>;
		case 'neubrutalism': return <div className="demo-neubrutalism"><div className="nb-card"><h4>RAW</h4><p>No polish needed</p><span className="nb-tag">BOLD</span></div></div>;
		case 'minimal': return <div className="demo-minimal"><span>Less</span><div className="line"></div></div>;
		case 'darklux': return <div className="demo-darklux"><span>Elegance</span><span className="subtitle">Refined &amp; Timeless</span></div>;
		case 'flat': return <div className="demo-flat"><div className="shape1"></div><div className="shape2"></div><div className="shape3"></div></div>;
		case 'retro': return <div className="demo-retro"><div className="terminal"><div className="terminal-bar"><span></span><span></span><span></span></div><div className="terminal-text">$ hello_world<br />&gt; booting up...</div></div></div>;
		case 'organic': return <div className="demo-organic"><div className="blob1"></div><div className="blob2"></div><div className="leaf">&#127807;</div></div>;
		case 'skeuo': return <div className="demo-skeuo"><div className="leather-card"><span>Leather Bound</span><div className="stitch"></div><span style={{ fontSize: '0.6rem', opacity: 0.7 }}>Est. 2024</span></div></div>;
		case 'material': return <div className="demo-material"><div className="mat-card mat1"></div><div className="mat-card mat2"></div><div className="mat-card mat3"></div></div>;
		case 'artdeco': return <div className="demo-artdeco"><div className="deco-frame"><div className="deco-line-l"></div><div className="deco-diamond"></div><div className="deco-line-r"></div></div></div>;
		case 'cyberpunk': return <div className="demo-cyberpunk"><div style={{ zIndex: 1, textAlign: 'center' }}><div className="neon-text">CYBER</div><div className="neon-sub">// SYS_OVERRIDE</div></div></div>;
		case 'memphis': return <div className="demo-memphis"><div className="m-circle"></div><div className="m-triangle"></div><div className="m-squiggle">~</div><div className="m-dots"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div>;
		case 'bauhaus': return <div className="demo-bauhaus"><div className="bh-circle"></div><div className="bh-rect"></div><div className="bh-triangle"></div></div>;
		case 'vaporwave': return <div className="demo-vaporwave"><div className="vw-grid"></div><div className="vw-text">A E S T H E T I C</div></div>;
		case 'clay': return <div className="demo-clay"><div className="clay-card"><div className="clay-circle"></div><div className="clay-text">Clay UI</div></div></div>;
		case 'swiss': return <div className="demo-swiss"><div className="swiss-grid"></div><div className="swiss-bar"></div><div className="swiss-type"><span>Neue</span><span>Grid</span><span>1960</span></div></div>;
		case 'editorial': return <div className="demo-editorial"><div className="editorial-frame"></div><div className="editorial-copy"><div className="editorial-kicker">Issue 09</div><div className="editorial-title">Atelier</div><div className="editorial-line"></div></div></div>;
		case 'webbrutal': return <div className="demo-webbrutal"><div className="wb-window"><div className="wb-top"></div><div className="wb-body"><span>&lt;RAW&gt;</span><span>grid_on</span><span>no mercy</span></div></div></div>;
		case 'scandi': return <div className="demo-scandi"><div className="scandi-card"><div className="scandi-stone"></div><div className="scandi-text">Nord Form</div><div className="scandi-rule"></div></div></div>;
		case 'technoir': return <div className="demo-technoir"><div className="technoir-glow"></div><div className="technoir-panel"><div className="technoir-title">NOIR</div><div className="technoir-meta">signal / 77%</div></div></div>;
		case 'maximal': return <div className="demo-maximal"><div className="maximal-burst">WOW</div><div className="maximal-sticker maximal-star"></div><div className="maximal-sticker maximal-dot"></div><div className="maximal-sticker maximal-wave">~</div></div>;
		case 'ecomodern': return <div className="demo-ecomodern"><div className="eco-arch"></div><div className="eco-leaf eco-leaf-a"></div><div className="eco-leaf eco-leaf-b"></div><div className="eco-label">eco modern</div></div>;
		case 'retrofuture': return <div className="demo-retrofuture"><div className="rf-sun"></div><div className="rf-ring"></div><div className="rf-grid"></div><div className="rf-chrome">2099</div></div>;
	}
}

function renderLayoutDemo(demoKey: LayoutCardData['demoKey']) {
	const block = <div className="block"></div>;
	switch (demoKey) {
		case 'bento': return <div className="layout-mini lm-bento">{block}{block}{block}{block}</div>;
		case 'asym': return <div className="layout-mini lm-asym">{block}{block}{block}</div>;
		case 'split': return <div className="layout-mini lm-split">{block}{block}</div>;
		case 'masonry': return <div className="layout-mini lm-masonry">{block}{block}{block}{block}{block}</div>;
		case 'cardgrid': return <div className="layout-mini lm-cardgrid">{block}{block}{block}{block}{block}{block}</div>;
		case 'fullbleed': return <div className="layout-mini lm-fullbleed">{block}{block}{block}</div>;
		case 'sidebar': return <div className="layout-mini lm-sidebar">{block}{block}{block}{block}</div>;
		case 'magazine': return <div className="layout-mini lm-magazine">{block}{block}{block}{block}</div>;
		case 'zpattern': return <div className="layout-mini lm-zpattern">{block}{block}<div className="block-line"></div>{block}{block}</div>;
		case 'fpattern': return <div className="layout-mini lm-fpattern">{block}{block}{block}{block}{block}{block}</div>;
		case 'holygrail': return <div className="layout-mini lm-holygrail">{block}{block}{block}{block}{block}</div>;
		case 'sticky': return <div className="layout-mini lm-sticky">{block}<div style={{ display: 'flex', flexDirection: 'column', gap: 4, height: '100%' }}><div className="block" style={{ flex: 1 }}></div><div className="block" style={{ flex: 1 }}></div><div className="block" style={{ flex: 1 }}></div></div></div>;
		case 'overlap': return <div className="layout-mini lm-overlap">{block}{block}</div>;
		case 'singlecol': return <div className="layout-mini lm-singlecol">{block}{block}{block}{block}</div>;
	}
}

function renderTypographyDemo(demoKey: TypographyCardData['demoKey']) {
	switch (demoKey) {
		case 'serifSans': return <div className="typo-demo typo-demo-gap"><div style={{ textAlign: 'center' }}><div style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', color: 'var(--text-primary)' }}>Serif</div><div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: 4 }}>Georgia - Times</div></div><div style={{ width: 1, height: 60, background: 'var(--border)' }}></div><div style={{ textAlign: 'center' }}><div style={{ fontFamily: '"Geist", sans-serif', fontSize: '2rem', color: 'var(--text-primary)' }}>Sans</div><div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: 4 }}>Geist - Inter</div></div></div>;
		case 'weight': return <div className="typo-demo typo-demo-stack"><div style={{ fontWeight: 300, color: 'var(--text-primary)', opacity: 0.5 }}>Light 300</div><div style={{ fontWeight: 500, color: 'var(--text-primary)', opacity: 0.8 }}>Medium 500</div><div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>Bold 800</div></div>;
		case 'display': return <div className="typo-demo"><div style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-primary)', lineHeight: 1 }}>Big.</div></div>;
		case 'mono': return <div className="typo-demo"><div style={{ fontFamily: '"Geist Mono", monospace', fontSize: '0.9rem', color: 'var(--text-primary)', background: 'var(--code-bg)', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--border)' }}>const design = "precise";</div></div>;
		case 'spacing': return <div className="typo-demo typo-demo-stack"><div style={{ letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>Tight</div><div style={{ color: 'var(--text-muted)' }}>Normal</div><div style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Wide</div></div>;
		case 'case': return <div className="typo-demo typo-demo-case"><div style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.12em', fontWeight: 600, color: 'var(--text-primary)' }}>UPPERCASE</div><div style={{ textTransform: 'lowercase', color: 'var(--text-muted)' }}>lowercase</div><div style={{ fontVariant: 'small-caps', color: 'var(--text-muted)' }}>Small Caps</div></div>;
		case 'variable': return <div className="typo-demo typo-demo-weight"><div style={{ fontWeight: 300, color: 'var(--text-primary)' }}>Weight 300</div><div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Weight 500</div><div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>Weight 800</div></div>;
		case 'script': return <div className="typo-demo"><div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.8rem', color: 'var(--text-primary)', transform: 'rotate(-3deg)' }}>Handwritten</div></div>;
		case 'slab': return <div className="typo-demo"><div style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)' }}>SLAB</div></div>;
		case 'width': return <div className="typo-demo typo-demo-stack"><div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', transform: 'scaleX(0.7)' }}>CONDENSED</div><div style={{ fontSize: '1.2rem', color: 'var(--text-muted)', transform: 'scaleX(1.15)' }}>Extended</div></div>;
		case 'pairing': return <div className="typo-demo typo-demo-stack"><div style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', color: 'var(--text-primary)' }}>Serif Headline</div><div style={{ fontFamily: '"Geist", sans-serif', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Clean body pair.</div></div>;
	}
}

function keywordSeed(label: string) {
	return Array.from(label).reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function sceneAccent(label: string) {
	const hues = [12, 38, 64, 110, 168, 208, 256, 318];
	return `hsl(${hues[keywordSeed(label) % hues.length]} 78% 62%)`;
}

function renderKeywordScene(category: string, label: string) {
	const accent = sceneAccent(label);
	const panelStyle = {
		height: '118px',
		padding: '12px',
		display: 'flex',
		flexDirection: 'column' as const,
		justifyContent: 'space-between',
		background: 'linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))',
	};
	const chipStyle = {
		fontFamily: '"Geist Mono", monospace',
		fontSize: '0.62rem',
		letterSpacing: '0.08em',
		textTransform: 'uppercase' as const,
		color: 'rgba(255,255,255,0.72)',
	};

	if (category === 'spacing') {
		const frameStyle = {
			position: 'relative' as const,
			flex: 1,
			borderRadius: 14,
			border: '1px solid rgba(255,255,255,0.12)',
			background: 'rgba(255,255,255,0.04)',
			overflow: 'hidden',
		};
		const bar = (key: string, style: Record<string, string | number>) => (
			<div
				key={key}
				style={{
					position: 'absolute',
					borderRadius: 10,
					background: 'rgba(255,255,255,0.14)',
					...style,
				}}></div>
		);
		const accentBar = (key: string, style: Record<string, string | number>) => (
			<div
				key={key}
				style={{
					position: 'absolute',
					borderRadius: 10,
					background: accent,
					boxShadow: `0 0 0 1px ${accent}33 inset`,
					...style,
				}}></div>
		);
		const guide = (key: string, style: Record<string, string | number>) => (
			<div
				key={key}
				style={{
					position: 'absolute',
					borderRadius: 999,
					background: 'rgba(255,255,255,0.18)',
					...style,
				}}></div>
		);
		const guideLabel = (key: string, text: string, style: Record<string, string | number>) => (
			<div
				key={key}
				style={{
					position: 'absolute',
					fontFamily: '"Geist Mono", monospace',
					fontSize: '0.48rem',
					letterSpacing: '0.08em',
					textTransform: 'uppercase',
					color: 'rgba(255,255,255,0.58)',
					...style,
				}}>
				{text}
			</div>
		);
		const dashedFrame = (style: Record<string, string | number>) => (
			<div
				style={{
					position: 'absolute',
					borderRadius: 12,
					border: '1px dashed rgba(255,255,255,0.18)',
					...style,
				}}></div>
		);

		let scene: ReactNode;

		switch (label) {
			case 'generous whitespace':
				scene = (
					<div style={frameStyle}>
						{dashedFrame({ inset: 10 })}
						{accentBar('hero', { left: 24, top: 18, width: 42, height: 14, borderRadius: 8 })}
						{bar('meta-a', { left: 24, top: 50, width: 34, height: 7, borderRadius: 999 })}
						{bar('meta-b', { left: 24, top: 62, width: 42, height: 7, borderRadius: 999 })}
						{guide('gap-a', { left: 78, top: 20, width: 1, height: 46 })}
						{guideLabel('gap-label', 'wide gap', { left: 68, top: 68 })}
					</div>
				);
				break;
			case 'dense layout':
				scene = (
					<div style={frameStyle}>
						{[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) =>
							(index === 1 ? accentBar : bar)(`cell-${index}`, {
								left: 10 + (index % 3) * 28,
								top: 10 + Math.floor(index / 3) * 17,
								width: 24,
								height: 13,
								borderRadius: 6,
							}),
						)}
						{guideLabel('dense-label', 'many blocks', { left: 12, bottom: 8 })}
					</div>
				);
				break;
			case 'compact':
				scene = (
					<div style={frameStyle}>
						{accentBar('main', { left: 12, top: 14, width: 44, height: 14, borderRadius: 7 })}
						{bar('mini-a', { left: 12, top: 31, width: 44, height: 9, borderRadius: 6 })}
						{bar('mini-b', { left: 12, top: 43, width: 44, height: 9, borderRadius: 6 })}
						{bar('mini-c', { left: 12, top: 55, width: 44, height: 9, borderRadius: 6 })}
						{bar('side-a', { right: 12, top: 14, width: 30, height: 24, borderRadius: 8 })}
						{bar('side-b', { right: 12, top: 42, width: 30, height: 22, borderRadius: 8 })}
						{guideLabel('compact-label', 'tight fit', { left: 12, bottom: 8 })}
					</div>
				);
				break;
			case 'airy':
				scene = (
					<div style={frameStyle}>
						{accentBar('top', { left: 18, top: 12, width: 56, height: 12, borderRadius: 999 })}
						{guide('gap-airy-a', { left: 46, top: 28, width: 1, height: 12 })}
						{bar('middle', { left: 22, top: 42, width: 42, height: 10, borderRadius: 999 })}
						{guide('gap-airy-b', { left: 46, top: 56, width: 1, height: 10 })}
						{bar('bottom', { left: 26, top: 68, width: 34, height: 8, borderRadius: 999, opacity: 0.12 })}
						{guideLabel('airy-label', 'more air', { right: 10, top: 30 })}
					</div>
				);
				break;
			case 'breathing room':
				scene = (
					<div style={frameStyle}>
						{dashedFrame({ inset: 12 })}
						{accentBar('module', { left: 30, top: 24, width: 34, height: 16, borderRadius: 8 })}
						{bar('support', { left: 30, top: 52, width: 26, height: 7, borderRadius: 999 })}
						{guideLabel('breathing-label', 'space around', { left: 58, top: 54 })}
					</div>
				);
				break;
			case 'tight spacing':
				scene = (
					<div style={frameStyle}>
						{accentBar('a', { left: 16, top: 16, width: 70, height: 11, borderRadius: 7 })}
						{bar('b', { left: 16, top: 29, width: 70, height: 11, borderRadius: 7 })}
						{bar('c', { left: 16, top: 42, width: 70, height: 11, borderRadius: 7 })}
						{bar('d', { left: 16, top: 55, width: 52, height: 8, borderRadius: 999 })}
						{guideLabel('tight-label', 'small gaps', { left: 16, bottom: 8 })}
					</div>
				);
				break;
			case 'spacious':
				scene = (
					<div style={frameStyle}>
						{accentBar('header', { left: 18, top: 12, width: 44, height: 14, borderRadius: 8 })}
						{bar('card-a', { left: 18, top: 42, width: 22, height: 22, borderRadius: 10 })}
						{bar('card-b', { left: 64, top: 42, width: 22, height: 22, borderRadius: 10 })}
						{guideLabel('spacious-label', 'spread out', { left: 38, top: 68 })}
					</div>
				);
				break;
			case 'packed':
				scene = (
					<div style={frameStyle}>
						{[0, 1, 2, 3, 4, 5].map((index) =>
							(index === 0 ? accentBar : bar)(`packed-${index}`, {
								left: 10 + (index % 2) * 42,
								top: 10 + Math.floor(index / 2) * 18,
								width: 36,
								height: 14,
								borderRadius: 6,
							}),
						)}
						{guideLabel('packed-label', 'filled canvas', { left: 12, bottom: 8 })}
					</div>
				);
				break;
			case 'open':
				scene = (
					<div style={frameStyle}>
						{accentBar('anchor', { left: 14, top: 18, width: 24, height: 24, borderRadius: 12 })}
						{bar('line', { right: 16, top: 24, width: 36, height: 7, borderRadius: 999 })}
						{bar('foot', { left: 18, bottom: 14, width: 40, height: 7, borderRadius: 999, opacity: 0.1 })}
						{guideLabel('open-label', 'empty field', { left: 46, top: 46 })}
					</div>
				);
				break;
			case 'cramped':
				scene = (
					<div style={{ ...frameStyle, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)' }}>
						{accentBar('hero', { left: 8, top: 10, width: 74, height: 14, borderRadius: 6 })}
						{bar('copy-a', { left: 8, top: 26, width: 74, height: 10, borderRadius: 6 })}
						{bar('copy-b', { left: 8, top: 38, width: 74, height: 10, borderRadius: 6 })}
						{bar('copy-c', { left: 8, top: 50, width: 74, height: 10, borderRadius: 6 })}
						{bar('button', { right: 8, bottom: 8, width: 22, height: 18, borderRadius: 8 })}
						{guideLabel('cramped-label', 'too close', { left: 8, bottom: 8 })}
					</div>
				);
				break;
			case 'modular rhythm':
				scene = (
					<div style={frameStyle}>
						{[0, 1, 2, 3].map((index) =>
							(index === 1 ? accentBar : bar)(`module-${index}`, {
								left: 16,
								top: 12 + index * 15,
								width: 68 - (index % 2) * 8,
								height: 10,
								borderRadius: 7,
							}),
						)}
						{guide('rhythm-a', { right: 12, top: 15, width: 6, height: 1 })}
						{guide('rhythm-b', { right: 12, top: 30, width: 6, height: 1 })}
						{guide('rhythm-c', { right: 12, top: 45, width: 6, height: 1 })}
						{guide('rhythm-d', { right: 12, top: 60, width: 6, height: 1 })}
						{guideLabel('rhythm-label', 'even rhythm', { left: 12, bottom: 8 })}
					</div>
				);
				break;
			case 'tight gutters':
				scene = (
					<div style={frameStyle}>
						{[0, 1, 2].map((index) =>
							(index === 1 ? accentBar : bar)(`gutter-${index}`, {
								left: 12 + index * 26,
								top: 16,
								width: 24,
								height: 50,
								borderRadius: 8,
							}),
						)}
						{guide('gutter-gap-a', { left: 37, top: 22, width: 1, height: 38 })}
						{guide('gutter-gap-b', { left: 63, top: 22, width: 1, height: 38 })}
						{guideLabel('gutter-label', 'narrow gutters', { left: 10, bottom: 8 })}
					</div>
				);
				break;
			case 'wide margins':
				scene = (
					<div style={frameStyle}>
						<div style={{ position: 'absolute', left: 10, top: 8, bottom: 8, width: 18, borderRadius: 10, background: 'rgba(255,255,255,0.05)' }}></div>
						<div style={{ position: 'absolute', right: 10, top: 8, bottom: 8, width: 18, borderRadius: 10, background: 'rgba(255,255,255,0.05)' }}></div>
						{accentBar('content', { left: 34, top: 18, right: 34, height: 16 })}
						{bar('copy', { left: 34, top: 42, right: 42, height: 8, borderRadius: 999 })}
						{bar('copy-2', { left: 34, top: 56, width: 34, height: 8, borderRadius: 999 })}
						{guideLabel('margin-left', 'margin', { left: 8, top: 12, writingMode: 'vertical-rl' })}
						{guideLabel('margin-right', 'margin', { right: 8, top: 12, writingMode: 'vertical-rl' })}
					</div>
				);
				break;
			case 'balanced density':
				scene = (
					<div style={frameStyle}>
						{accentBar('focus', { left: 16, top: 16, width: 34, height: 34, borderRadius: 12 })}
						{bar('stack-a', { right: 14, top: 16, width: 28, height: 10, borderRadius: 999 })}
						{bar('stack-b', { right: 14, top: 32, width: 40, height: 10, borderRadius: 999 })}
						{bar('stack-c', { left: 16, bottom: 14, right: 14, height: 8, borderRadius: 999, opacity: 0.12 })}
						{guideLabel('balanced-label', 'mix of open + dense', { left: 12, bottom: 8 })}
					</div>
				);
				break;
			default:
				scene = (
					<div style={frameStyle}>
						{accentBar('default-main', { left: 16, top: 16, width: 60, height: 16 })}
						{bar('default-copy', { left: 16, top: 42, width: 50, height: 8, borderRadius: 999 })}
						{bar('default-foot', { left: 16, top: 56, width: 34, height: 8, borderRadius: 999 })}
					</div>
				);
		}

		return <div className="builder-hover-visual" style={panelStyle}><div style={chipStyle}>Spacing</div>{scene}<div style={{ ...chipStyle, color: 'rgba(255,255,255,0.56)' }}>{label}</div></div>;
	}

	if (category === 'material') {
		const glossy = ['glossy', 'metallic', 'chrome', 'brushed steel', 'liquid sheen'].includes(label);
		const soft = ['matte', 'paper', 'fabric', 'ceramic', 'stone', 'concrete'].includes(label);
		const translucent = ['frosted', 'glass'].includes(label);
		const organic = ['textured', 'leather', 'wood grain'].includes(label);
		return <div className="builder-hover-visual" style={{ ...panelStyle, background: glossy ? `radial-gradient(circle at 24% 20%, rgba(255,255,255,0.34), transparent 26%), linear-gradient(145deg, ${accent}, rgba(15,23,42,0.96))` : soft ? 'linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))' : translucent ? `radial-gradient(circle at 22% 18%, rgba(255,255,255,0.28), transparent 26%), linear-gradient(160deg, rgba(125,211,252,0.18), rgba(255,255,255,0.04))` : `repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 6px, rgba(255,255,255,0.01) 6px 12px), linear-gradient(145deg, ${accent}22, rgba(15,23,42,0.9))` }}><div style={chipStyle}>Material</div><div style={{ height: 52, borderRadius: label === 'paper' ? 4 : 16, border: '1px solid rgba(255,255,255,0.18)', background: translucent ? 'rgba(255,255,255,0.12)' : soft ? 'rgba(255,255,255,0.08)' : glossy ? 'linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.06))' : 'rgba(255,255,255,0.06)', boxShadow: translucent ? 'inset 0 1px 0 rgba(255,255,255,0.24)' : 'inset 0 1px 0 rgba(255,255,255,0.14), 0 10px 24px rgba(0,0,0,0.18)', position: 'relative', overflow: 'hidden' }}>{organic ? <div style={{ position: 'absolute', inset: 0, background: label === 'wood grain' ? 'repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0 3px, rgba(0,0,0,0.05) 3px 6px)' : 'repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0 5px, rgba(0,0,0,0.05) 5px 10px)' }}></div> : null}{glossy ? <div style={{ position: 'absolute', inset: '8% 12% 42% 12%', borderRadius: 999, background: 'rgba(255,255,255,0.18)', filter: 'blur(4px)' }}></div> : null}</div><div style={{ ...chipStyle, color: 'rgba(255,255,255,0.6)' }}>{label}</div></div>;
	}

	if (category === 'hierarchy') {
		const focus = ['focal point', 'visual anchor', 'leading element'].includes(label);
		const contrast = ['contrast', 'emphasis', 'color weight', 'clear CTA emphasis', 'headline dominance'].includes(label);
		const structure = ['type hierarchy', 'section rhythm', 'progressive disclosure', 'scale variation'].includes(label);
		return <div className="builder-hover-visual" style={panelStyle}><div style={chipStyle}>Hierarchy</div><div style={{ display: 'grid', gap: 8, flex: 1 }}>{focus ? <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.7fr', gap: 8, alignItems: 'center', height: '100%' }}><div style={{ height: 44, borderRadius: 14, background: accent }}></div><div style={{ display: 'grid', gap: 6 }}><div style={{ height: 10, borderRadius: 999, background: 'rgba(255,255,255,0.22)' }}></div><div style={{ height: 10, borderRadius: 999, background: 'rgba(255,255,255,0.12)' }}></div></div></div> : contrast ? <><div style={{ width: '78%', height: 20, borderRadius: 7, background: accent }}></div><div style={{ width: '32%', height: 20, borderRadius: 999, background: 'rgba(255,255,255,0.82)' }}></div><div style={{ width: '92%', height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.14)' }}></div></> : structure ? <><div style={{ width: '64%', height: 18, borderRadius: 7, background: accent }}></div><div style={{ width: '52%', height: 12, borderRadius: 7, background: 'rgba(255,255,255,0.26)' }}></div><div style={{ width: '88%', height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.14)' }}></div><div style={{ width: '74%', height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.1)' }}></div></> : <><div style={{ width: '76%', height: 18, borderRadius: 7, background: accent }}></div><div style={{ width: '44%', height: 10, borderRadius: 7, background: 'rgba(255,255,255,0.22)' }}></div><div style={{ width: '84%', height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.14)' }}></div></>}</div><div style={{ ...chipStyle, color: 'rgba(255,255,255,0.56)' }}>{label}</div></div>;
	}

	if (category === 'motion') {
		const scroll = ['slide up', 'parallax scroll', 'auto-scroll', 'reveal on scroll', 'scroll snap'].includes(label);
		const spring = ['spring physics', 'hover lift', 'elastic bounce'].includes(label);
		const sequence = ['stagger animation', 'kinetic typography', 'morph transition', 'shared transition'].includes(label);
		const ambient = ['fade in', 'smooth ease', 'ambient loop'].includes(label);
		return <div className="builder-hover-visual" style={panelStyle}><div style={chipStyle}>Motion</div><div style={{ flex: 1, display: 'grid', alignItems: 'center' }}>{scroll ? <div style={{ display: 'grid', gap: 6 }}><div style={{ width: '68%', height: 14, borderRadius: 8, background: accent, transform: 'translateY(-6px)' }}></div><div style={{ width: '68%', height: 14, borderRadius: 8, background: 'rgba(255,255,255,0.2)' }}></div><div style={{ width: '68%', height: 14, borderRadius: 8, background: 'rgba(255,255,255,0.1)', transform: 'translateY(6px)' }}></div></div> : spring ? <div style={{ position: 'relative', height: 44 }}><div style={{ position: 'absolute', left: '46%', bottom: 0, width: 28, height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.12)', transform: 'translateX(-50%)' }}></div><div style={{ position: 'absolute', left: '46%', top: 2, width: 24, height: 24, borderRadius: 999, background: accent, transform: 'translateX(-50%)' }}></div><div style={{ position: 'absolute', left: '46%', top: 28, width: 2, height: 10, background: 'rgba(255,255,255,0.18)', transform: 'translateX(-50%)' }}></div></div> : sequence ? <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{[0, 1, 2].map((index) => <div key={index} style={{ width: 22 + index * 6, height: 22, borderRadius: 8, background: index === 1 ? accent : 'rgba(255,255,255,0.14)', opacity: 0.55 + index * 0.2 }}></div>)}</div> : ambient ? <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{[0, 1, 2, 3].map((index) => <div key={index} style={{ width: 14, height: 14, borderRadius: 999, background: accent, opacity: 0.2 + index * 0.2 }}></div>)}</div> : <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ width: 22, height: 22, borderRadius: 999, background: accent }}></div><div style={{ flex: 1, height: 2, background: 'linear-gradient(90deg, rgba(255,255,255,0.14), rgba(255,255,255,0.42))' }}></div></div>}</div><div style={{ ...chipStyle, color: 'rgba(255,255,255,0.56)' }}>{label}</div></div>;
	}

	if (category === 'era') {
		const swiss = ['modernist', 'swiss design', 'scandinavian modern'].includes(label);
		const deco = ['art deco', 'mid-century'].includes(label);
		const future = ['futurist', 'retro futurism', 'y2k'].includes(label);
		const ornate = ['art nouveau', 'victorian'].includes(label);
		const raw = ['brutalist', 'industrial', 'deconstructivist'].includes(label);
		const loud = ['postmodern', 'psychedelic'].includes(label);
		return <div className="builder-hover-visual" style={{ ...panelStyle, background: loud ? `linear-gradient(120deg, ${accent}, rgba(244,114,182,0.45), rgba(59,130,246,0.38))` : `linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01)), linear-gradient(45deg, ${accent}, rgba(15,23,42,0.96))` }}><div style={chipStyle}>Era</div><div style={{ flex: 1, position: 'relative' }}>{swiss ? <><div style={{ position: 'absolute', left: 12, top: 6, width: 28, height: 28, background: accent }}></div><div style={{ position: 'absolute', right: 10, top: 8, width: 52, height: 6, background: 'rgba(255,255,255,0.2)' }}></div><div style={{ position: 'absolute', right: 10, top: 22, width: 38, height: 6, background: 'rgba(255,255,255,0.12)' }}></div><div style={{ position: 'absolute', inset: '0', border: '1px solid rgba(255,255,255,0.08)' }}></div></> : deco ? <><div style={{ position: 'absolute', left: '50%', top: 4, width: 2, height: 40, background: 'rgba(255,255,255,0.16)', transform: 'translateX(-50%)' }}></div><div style={{ position: 'absolute', left: '50%', top: 10, width: 36, height: 36, border: `2px solid ${accent}`, transform: 'translateX(-50%) rotate(45deg)' }}></div></> : future ? <><div style={{ position: 'absolute', left: '50%', bottom: 2, width: 80, height: 34, borderTop: '1px solid rgba(255,255,255,0.16)', transform: 'translateX(-50%) perspective(160px) rotateX(65deg)' }}></div><div style={{ position: 'absolute', left: '50%', top: 12, width: 34, height: 34, borderRadius: 999, background: accent, boxShadow: `0 0 16px ${accent}` }}></div></> : ornate ? <><div style={{ position: 'absolute', left: 20, top: 12, width: 34, height: 34, borderRadius: '50% 50% 0 50%', border: '2px solid rgba(255,255,255,0.3)', transform: 'rotate(45deg)' }}></div><div style={{ position: 'absolute', right: 24, top: 18, width: 34, height: 18, borderRadius: 999, border: `2px solid ${accent}` }}></div></> : raw ? <><div style={{ position: 'absolute', left: 14, top: 10, width: 44, height: 34, background: accent }}></div><div style={{ position: 'absolute', right: 18, top: 18, width: 34, height: 18, background: 'rgba(255,255,255,0.14)' }}></div></> : <><div style={{ position: 'absolute', left: 14, top: 10, width: 58, height: 20, borderRadius: 999, background: 'rgba(255,255,255,0.18)' }}></div><div style={{ position: 'absolute', right: 16, top: 22, width: 30, height: 30, borderRadius: 999, background: accent }}></div></>}</div><div style={{ ...chipStyle, color: 'rgba(255,255,255,0.56)' }}>{label}</div></div>;
	}

	if (category === 'composition') {
		const grid = ['rule of thirds', 'golden ratio', 'grid alignment'].includes(label);
		const balance = ['symmetry', 'radial balance'].includes(label);
		const offbeat = ['asymmetry', 'editorial crop', 'edge-to-edge framing'].includes(label);
		const depth = ['negative space', 'visual flow', 'layered depth', 'stacked modules'].includes(label);
		return <div className="builder-hover-visual" style={panelStyle}><div style={chipStyle}>Composition</div><div style={{ position: 'relative', flex: 1, borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)', overflow: 'hidden' }}>{grid ? <><div style={{ position: 'absolute', left: '33.33%', top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.16)' }}></div><div style={{ position: 'absolute', left: '66.66%', top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.16)' }}></div><div style={{ position: 'absolute', top: '33.33%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.16)' }}></div><div style={{ position: 'absolute', left: '33.33%', top: '33.33%', width: 18, height: 18, borderRadius: 999, background: accent, transform: 'translate(-50%, -50%)' }}></div></> : balance ? <><div style={{ position: 'absolute', left: '50%', top: 8, bottom: 8, width: 1, background: 'rgba(255,255,255,0.16)', transform: 'translateX(-50%)' }}></div><div style={{ position: 'absolute', left: '25%', top: 18, width: 20, height: 20, borderRadius: 999, background: accent }}></div><div style={{ position: 'absolute', right: '25%', top: 18, width: 20, height: 20, borderRadius: 999, background: accent }}></div></> : offbeat ? <><div style={{ position: 'absolute', left: -8, top: -6, width: 84, height: 48, borderRadius: 16, background: accent }}></div><div style={{ position: 'absolute', right: 10, bottom: 12, width: 34, height: 12, borderRadius: 999, background: 'rgba(255,255,255,0.16)' }}></div></> : depth ? <><div style={{ position: 'absolute', left: 10, top: 12, width: 52, height: 34, borderRadius: 12, background: 'rgba(255,255,255,0.08)' }}></div><div style={{ position: 'absolute', left: 20, top: 20, width: 52, height: 34, borderRadius: 12, background: 'rgba(255,255,255,0.12)' }}></div><div style={{ position: 'absolute', left: 30, top: 28, width: 52, height: 34, borderRadius: 12, background: accent }}></div></> : null}</div><div style={{ ...chipStyle, color: 'rgba(255,255,255,0.56)' }}>{label}</div></div>;
	}

	if (category === 'texture') {
		const dotted = ['grain', 'noise', 'stipple', 'halftone'].includes(label);
		const linear = ['crosshatch', 'linen', 'canvas', 'paper fiber'].includes(label);
		const worn = ['rough', 'distressed', 'weathered'].includes(label);
		const soft = ['smooth', 'frosted haze', 'tactile finish'].includes(label);
		return <div className="builder-hover-visual" style={{ ...panelStyle, background: dotted ? `radial-gradient(${accent}44 1px, transparent 1px), linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))` : linear ? `repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0 2px, transparent 2px 6px), repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 7px), linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))` : worn ? `repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0 4px, rgba(0,0,0,0.04) 4px 8px), linear-gradient(160deg, ${accent}22, rgba(255,255,255,0.01))` : 'linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))', backgroundSize: dotted ? '8px 8px, auto' : 'auto' }}><div style={chipStyle}>Texture</div><div style={{ height: 50, borderRadius: 14, background: soft ? 'linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.04))' : 'linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04))', border: '1px solid rgba(255,255,255,0.12)', boxShadow: soft ? `0 0 18px ${accent}22 inset` : 'none' }}></div><div style={{ ...chipStyle, color: 'rgba(255,255,255,0.56)' }}>{label}</div></div>;
	}

	if (category === 'colorDirection') {
		return <div className="builder-hover-visual" style={panelStyle}><div style={chipStyle}>Color Direction</div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>{[0, 1, 2, 3].map((index) => <div key={index} style={{ height: 40, borderRadius: 10, background: index === 1 ? accent : `hsl(${(keywordSeed(label) * (index + 3)) % 360} 52% ${28 + index * 12}%)` }}></div>)}</div><div style={{ ...chipStyle, color: 'rgba(255,255,255,0.56)' }}>{label}</div></div>;
	}

	if (category === 'uiPattern') {
		const rail = ['sticky sidebar', 'dashboard rail'].includes(label);
		const search = ['command palette', 'search-first layout'].includes(label);
		const hero = ['split hero', 'floating CTA'].includes(label);
		const modular = ['bento modules', 'comparison table', 'gallery carousel', 'timeline section'].includes(label);
		const flow = ['tabbed interface', 'wizard flow'].includes(label);
		return <div className="builder-hover-visual" style={panelStyle}><div style={chipStyle}>UI Pattern</div><div style={{ display: 'grid', gridTemplateColumns: rail ? '58px 1fr' : '1fr', gap: 8, flex: 1 }}>{rail ? <><div style={{ borderRadius: 10, background: 'rgba(255,255,255,0.08)', display: 'grid', gap: 6, padding: 8 }}>{[0, 1, 2].map((index) => <span key={index} style={{ height: 8, borderRadius: 999, background: index === 0 ? accent : 'rgba(255,255,255,0.18)' }}></span>)}</div><div style={{ borderRadius: 10, background: 'rgba(255,255,255,0.04)', display: 'grid', gap: 6, padding: 8 }}>{[0, 1, 2, 3].map((index) => <span key={index} style={{ height: index === 0 ? 16 : 8, width: index === 0 ? '72%' : `${92 - index * 12}%`, borderRadius: 999, background: index === 0 ? accent : 'rgba(255,255,255,0.16)' }}></span>)}</div></> : search ? <div style={{ borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: 8, display: 'grid', gap: 8 }}><div style={{ height: 14, borderRadius: 999, background: 'rgba(255,255,255,0.14)', position: 'relative' }}><div style={{ position: 'absolute', left: 8, top: 3, width: 8, height: 8, borderRadius: 999, border: '1px solid rgba(255,255,255,0.5)' }}></div><div style={{ position: 'absolute', left: 17, top: 10, width: 5, height: 1, background: 'rgba(255,255,255,0.5)', transform: 'rotate(45deg)' }}></div></div><div style={{ height: 26, borderRadius: 10, background: accent }}></div></div> : hero ? <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}><div style={{ display: 'grid', gap: 6 }}><div style={{ height: 16, width: '78%', borderRadius: 999, background: accent }}></div><div style={{ height: 8, width: '92%', borderRadius: 999, background: 'rgba(255,255,255,0.14)' }}></div><div style={{ height: 8, width: '68%', borderRadius: 999, background: 'rgba(255,255,255,0.12)' }}></div><div style={{ marginTop: 6, height: 18, width: '46%', borderRadius: 999, background: 'rgba(255,255,255,0.84)' }}></div></div><div style={{ borderRadius: 12, background: 'rgba(255,255,255,0.08)' }}></div></div> : modular ? <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>{[0, 1, 2, 3, 4, 5].map((index) => <div key={index} style={{ height: index === 0 ? 28 : 18, gridColumn: index === 0 && label === 'comparison table' ? 'span 3' : index === 1 && label === 'timeline section' ? 'span 2' : 'span 1', borderRadius: 8, background: index === 0 ? accent : 'rgba(255,255,255,0.12)' }}></div>)}</div> : flow ? <div style={{ display: 'grid', gap: 8 }}><div style={{ display: 'flex', gap: 6 }}>{[0, 1, 2].map((index) => <div key={index} style={{ flex: 1, height: 10, borderRadius: 999, background: index === 0 ? accent : 'rgba(255,255,255,0.14)' }}></div>)}</div><div style={{ height: 32, borderRadius: 12, background: 'rgba(255,255,255,0.08)' }}></div></div> : null}</div><div style={{ ...chipStyle, color: 'rgba(255,255,255,0.56)' }}>{label}</div></div>;
	}

	return null;
}

function renderGenericPreview(preview: BuilderPreview) {
	const label = preview.keywordSceneLabel ?? preview.keyword ?? preview.title;
	const accent = sceneAccent(label);

	return (
		<div
			className="builder-hover-visual"
			style={{
				height: '118px',
				padding: '12px',
				display: 'grid',
				gridTemplateRows: 'auto 1fr auto',
				gap: 10,
				background: `radial-gradient(circle at 18% 18%, ${accent}33, transparent 28%), linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))`,
			}}>
			<div
				style={{
					fontFamily: '"Geist Mono", monospace',
					fontSize: '0.62rem',
					letterSpacing: '0.08em',
					textTransform: 'uppercase',
					color: 'rgba(255,255,255,0.72)',
				}}>
				{preview.category}
			</div>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '1.2fr 0.8fr',
					gap: 10,
					alignItems: 'stretch',
				}}>
				<div
					style={{
						borderRadius: 12,
						border: '1px solid rgba(255,255,255,0.12)',
						background: 'rgba(255,255,255,0.06)',
						padding: 10,
						display: 'grid',
						gap: 6,
					}}>
					<div style={{ width: '64%', height: 12, borderRadius: 999, background: accent }}></div>
					<div style={{ width: '88%', height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.18)' }}></div>
					<div style={{ width: '72%', height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.12)' }}></div>
				</div>
				<div
					style={{
						borderRadius: 12,
						background: 'linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.04))',
						border: '1px solid rgba(255,255,255,0.1)',
						position: 'relative',
						overflow: 'hidden',
					}}>
					<div
						style={{
							position: 'absolute',
							inset: '20% 18%',
							borderRadius: 999,
							border: '1px solid rgba(255,255,255,0.16)',
						}}></div>
					<div
						style={{
							position: 'absolute',
							left: '24%',
							top: '28%',
							width: 18,
							height: 18,
							borderRadius: 999,
							background: accent,
						}}></div>
				</div>
			</div>
			<div
				style={{
					fontFamily: '"Geist Mono", monospace',
					fontSize: '0.62rem',
					letterSpacing: '0.08em',
					textTransform: 'uppercase',
					color: 'rgba(255,255,255,0.56)',
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
				}}>
				{label}
			</div>
		</div>
	);
}

function renderPreviewVisual(preview: BuilderPreview) {
	if (preview.styleDemoKey) {
		return <div className="builder-hover-visual builder-hover-visual-style">{renderStyleDemo(preview.styleDemoKey)}</div>;
	}
	if (preview.layoutDemoKey) {
		return <div className="builder-hover-visual builder-hover-visual-layout">{renderLayoutDemo(preview.layoutDemoKey)}</div>;
	}
	if (preview.typographyDemoKey) {
		return <div className="builder-hover-visual builder-hover-visual-typo">{renderTypographyDemo(preview.typographyDemoKey)}</div>;
	}
	if (preview.moodDemoKey) {
		return renderMoodDemo(preview.moodDemoKey);
	}
	if (preview.productDemoKey) {
		return renderProductDemo(preview.productDemoKey);
	}
	if (preview.contentDemoKey) {
		return renderContentDemo(preview.contentDemoKey);
	}
	if (preview.keywordSceneCategory && preview.keywordSceneLabel) {
		return renderKeywordScene(preview.keywordSceneCategory, preview.keywordSceneLabel);
	}
	if (preview.swatches) {
		return <div className="builder-hover-swatches">{preview.swatches.map((swatch) => <span key={swatch} className="builder-hover-swatch" style={{ background: swatch }}></span>)}</div>;
	}
	if (preview.effectDemoHtml) {
		return <div className="builder-hover-visual builder-hover-visual-effect"><div dangerouslySetInnerHTML={{ __html: preview.effectDemoHtml }} /></div>;
	}
	if (preview.effectDemoStyle) {
		return <div className="builder-hover-visual builder-hover-visual-effect"><div dangerouslySetInnerHTML={{ __html: `<div style="${preview.effectDemoStyle}"></div>` }} /></div>;
	}
	return renderGenericPreview(preview);
}

function getPreviewPlacement(rectTop: number): 'top' | 'bottom' {
	return rectTop > 260 ? 'top' : 'bottom';
}

export function getBuilderPreviewPosition(target: HTMLElement) {
	const rect = target.getBoundingClientRect();
	const width = 280;
	const margin = 16;
	const centeredLeft = rect.left + rect.width / 2;
	const left = Math.min(Math.max(centeredLeft, margin + width / 2), window.innerWidth - margin - width / 2);
	const placement = getPreviewPlacement(rect.top);
	const top = placement === 'top' ? rect.top - 12 : rect.bottom + 12;
	return { left, top, placement };
}

export function BuilderHoverPreviewCard({ hoverPreview }: { hoverPreview: HoverPreviewState | null }) {
	if (!hoverPreview || typeof document === 'undefined') {
		return null;
	}

	return createPortal(
		<div
			className={`builder-hover-preview builder-hover-preview-${hoverPreview.placement}`}
			style={{ left: hoverPreview.left, top: hoverPreview.top }}>
			{renderPreviewVisual(hoverPreview.preview)}
			<div className="builder-hover-body">
				<div className="builder-hover-eyebrow">{hoverPreview.preview.category}</div>
				<h4>{hoverPreview.preview.title}</h4>
				<p>{hoverPreview.preview.description}</p>
				<div className="builder-hover-tags">
					{hoverPreview.preview.tags.map((tag) => (
						<span key={tag} className="builder-hover-tag">{tag}</span>
					))}
				</div>
			</div>
		</div>,
		document.body,
	);
}
