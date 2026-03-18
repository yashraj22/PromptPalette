import type { OverviewLinkData } from '../types/content';

export const overviewLinks: OverviewLinkData[] = [
	{ title: 'Design Library', description: 'Browse the visual foundation: styles, layout systems, and typography treatments in one place.', to: '/design', eyebrow: 'Route 01', tags: ['styles', 'layouts', 'typography'] },
	{ title: 'Visual Systems', description: 'Move quickly through color logic, effects, and copy-ready reference keywords without the long single-page scroll.', to: '/visuals', eyebrow: 'Route 02', tags: ['colors', 'effects', 'cheat sheet'] },
	{ title: 'UI / UX Principles', description: 'Keep the product thinking separate from the visual library and jump directly into interface and experience guidance.', to: '/ui-ux', eyebrow: 'Route 03', tags: ['ui design', 'ux design', 'principles'] },
];
