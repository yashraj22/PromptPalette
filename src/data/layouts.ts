import type { LayoutCardData } from '../types/content';

const chip = (label: string) => ({ label });

export const layoutCards: LayoutCardData[] = [
	{ title: 'Bento Grid', description: 'Mixed-size tiles in a grid - popularized by Apple. Creates visual hierarchy through scale variation.', chips: [chip('bento grid'), chip('mixed tile layout'), chip('dashboard grid')], demoKey: 'bento' },
	{ title: 'Asymmetric', description: 'Unequal column widths creating dynamic tension and visual interest through imbalance.', chips: [chip('asymmetric layout'), chip('dynamic composition')], demoKey: 'asym' },
	{ title: 'Split Screen', description: 'Two equal halves - image/text, comparison, or dual-purpose content side by side.', chips: [chip('split screen'), chip('two-column'), chip('50/50 layout')], demoKey: 'split' },
	{ title: 'Masonry', description: 'Pinterest-style staggered grid where items flow vertically with varying heights.', chips: [chip('masonry layout'), chip('pinterest grid'), chip('staggered columns')], demoKey: 'masonry' },
	{ title: 'Card Grid', description: 'Uniform cards in a regular grid - the backbone of dashboards, catalogs, and listings.', chips: [chip('card grid'), chip('uniform grid'), chip('tile layout')], demoKey: 'cardgrid' },
	{ title: 'Full-Bleed Hero', description: 'Edge-to-edge hero section spanning the full viewport, anchoring the page with impact.', chips: [chip('full-bleed hero'), chip('edge to edge'), chip('hero section')], demoKey: 'fullbleed' },
	{ title: 'Sidebar + Content', description: 'Fixed navigation sidebar paired with scrollable main content - the standard for apps and docs.', chips: [chip('sidebar layout'), chip('app shell'), chip('nav sidebar')], demoKey: 'sidebar' },
	{ title: 'Magazine / Editorial', description: 'Multi-column layouts with featured lead articles, pull quotes, and mixed media.', chips: [chip('magazine layout'), chip('editorial design')], demoKey: 'magazine' },
	{ title: 'Z-Pattern', description: 'Eye movement follows a Z shape - logo top-left, CTA top-right, content bottom.', chips: [chip('Z-pattern layout'), chip('scanning pattern')], demoKey: 'zpattern' },
	{ title: 'F-Pattern', description: 'Eye scans in an F - strong top bar, shorter second bar, then vertical left scan.', chips: [chip('F-pattern layout'), chip('content-heavy layout')], demoKey: 'fpattern' },
	{ title: 'Holy Grail Layout', description: 'Header, footer, and three columns (left nav, main content, right sidebar) - the classic web layout.', chips: [chip('holy grail layout'), chip('three-column')], demoKey: 'holygrail' },
	{ title: 'Sticky Scroll Sections', description: 'One column stays fixed while the other scrolls - great for storytelling and feature reveals.', chips: [chip('sticky scroll'), chip('scroll-linked')], demoKey: 'sticky' },
	{ title: 'Overlapping / Layered', description: 'Elements intentionally overlap creating depth and visual tension.', chips: [chip('overlapping elements'), chip('layered composition')], demoKey: 'overlap' },
	{ title: 'Single Column Centered', description: 'One centered column - the default for blogs, articles, and focused reading experiences.', chips: [chip('single column'), chip('centered layout'), chip('reading layout')], demoKey: 'singlecol' },
	{ title: 'Dashboard Canvas', description: 'A control-room layout with KPI rail, main chart area, and supporting modules arranged for fast scanning.', chips: [chip('dashboard canvas'), chip('analytics layout'), chip('operations UI')], demoKey: 'sidebar' },
	{ title: 'Storytelling Timeline', description: 'Sequential vertical sections that reveal a narrative, milestone, or process one beat at a time.', chips: [chip('timeline layout'), chip('narrative scroll'), chip('step-based sections')], demoKey: 'sticky' },
	{ title: 'Feature Comparison', description: 'Side-by-side blocks optimized for evaluating plans, products, or specs with clean column alignment.', chips: [chip('comparison layout'), chip('pricing comparison'), chip('side by side blocks')], demoKey: 'split' },
	{ title: 'Portal Landing Page', description: 'A broad entry layout that surfaces multiple destinations, utilities, and quick actions from one screen.', chips: [chip('portal layout'), chip('hub page'), chip('one-stop dashboard')], demoKey: 'bento' },
	{ title: 'Documentation Shell', description: 'Persistent navigation, content column, and contextual sidebar built for docs, guides, or knowledge bases.', chips: [chip('documentation layout'), chip('knowledge base shell'), chip('docs sidebar')], demoKey: 'holygrail' },
	{ title: 'Carousel Showcase', description: 'A horizontally segmented presentation for featured items, portfolios, or product highlights.', chips: [chip('carousel showcase'), chip('horizontal storytelling'), chip('featured slider layout')], demoKey: 'overlap' },
	{ title: 'Hero Stack', description: 'A dominant opening block followed by tightly sequenced support sections that keep momentum after the fold.', chips: [chip('hero stack'), chip('landing page sequence'), chip('stacked content flow')], demoKey: 'fullbleed' },
	{ title: 'Catalog Grid', description: 'A browsable multi-item arrangement tuned for collections, marketplaces, galleries, and product discovery.', chips: [chip('catalog layout'), chip('product discovery grid'), chip('browse all layout')], demoKey: 'cardgrid' },
];
