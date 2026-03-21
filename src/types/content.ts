export type ThemeMode = 'dark' | 'light';

export interface KeywordChip {
	label: string;
}

export interface StyleCardData {
	title: string;
	description: string;
	chips: KeywordChip[];
	demoKey:
		| 'glass'
		| 'neumorph'
		| 'neubrutalism'
		| 'minimal'
		| 'darklux'
		| 'flat'
		| 'retro'
		| 'organic'
		| 'skeuo'
		| 'material'
		| 'artdeco'
		| 'cyberpunk'
		| 'memphis'
		| 'bauhaus'
		| 'vaporwave'
		| 'clay'
		| 'swiss'
		| 'editorial'
		| 'webbrutal'
		| 'scandi'
		| 'technoir'
		| 'maximal'
		| 'ecomodern'
		| 'retrofuture';
}

export interface LayoutCardData {
	title: string;
	description: string;
	chips: KeywordChip[];
	demoKey:
		| 'bento'
		| 'asym'
		| 'split'
		| 'masonry'
		| 'cardgrid'
		| 'fullbleed'
		| 'sidebar'
		| 'magazine'
		| 'zpattern'
		| 'fpattern'
		| 'holygrail'
		| 'sticky'
		| 'overlap'
		| 'singlecol';
}

export interface TypographyCardData {
	title: string;
	description: string;
	chips: KeywordChip[];
	demoKey:
		| 'serifSans'
		| 'weight'
		| 'display'
		| 'mono'
		| 'spacing'
		| 'case'
		| 'variable'
		| 'script'
		| 'slab'
		| 'width'
		| 'pairing';
	featured?: boolean;
}

export interface ColorSchemeData {
	name: string;
	description: string;
	swatches: string[];
	chips: KeywordChip[];
}

export interface EffectCardData {
	name: string;
	description: string;
	demoHtml?: string;
	demoStyle?: string;
	chips: KeywordChip[];
}

export interface CheatCategoryData {
	category: string;
	keywords: KeywordChip[];
}

export interface PrincipleCardData {
	title: string;
	description: string;
	chips: KeywordChip[];
	icon: string;
}

export interface BuilderCategoryData {
	label: string;
	options: string[];
}

export interface OverviewLinkData {
	title: string;
	description: string;
	to: string;
	eyebrow: string;
	tags: string[];
}
