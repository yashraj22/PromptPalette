import type { FocusEvent, MouseEvent } from 'react';
import { useEffect, useState } from 'react';
import { BuilderHoverPreviewCard, getBuilderPreview, getBuilderPreviewPosition } from './BuilderHoverPreview';
import { builderCategories } from '../data/builder';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useToast } from './Toast';

const collapsibleCategoryLimit: Partial<Record<string, number>> = {
	Style: 8,
	Layout: 8,
	Typography: 8,
	Color: 8,
	Effects: 8,
	Mood: 8,
	Product: 6,
	Content: 4,
};

const optionCategoryMap = new Map<string, string>();

for (const category of builderCategories) {
	for (const option of category.options) {
		optionCategoryMap.set(option, category.label);
	}
}

function formatList(values: string[]) {
	return values.join(', ');
}

function buildPromptText(selectedKeywords: Set<string>) {
	const groupedSelections = new Map<string, string[]>();

	for (const keyword of selectedKeywords) {
		const category = optionCategoryMap.get(keyword);
		if (!category) continue;
		const current = groupedSelections.get(category) ?? [];
		current.push(keyword);
		groupedSelections.set(category, current);
	}

	const mood = groupedSelections.get('Mood')?.[0];
	const product = groupedSelections.get('Product')?.[0];
	const content = groupedSelections.get('Content')?.[0];
	const style = groupedSelections.get('Style');
	const layout = groupedSelections.get('Layout');
	const typography = groupedSelections.get('Typography');
	const color = groupedSelections.get('Color');
	const effects = groupedSelections.get('Effects');

	const lead = [
		'Design',
		mood ? `a ${mood}` : 'a',
		product ?? 'digital product',
		content ? `with ${content}` : '',
	].filter(Boolean).join(' ');

	const details = [
		style?.length ? `style: ${formatList(style)}` : '',
		layout?.length ? `layout: ${formatList(layout)}` : '',
		typography?.length ? `typography: ${formatList(typography)}` : '',
		color?.length ? `color: ${formatList(color)}` : '',
		effects?.length ? `effects: ${formatList(effects)}` : '',
	].filter(Boolean);

	return details.length > 0 ? `${lead}. ${details.join('. ')}.` : `${lead}.`;
}

export function PromptBuilder() {
	const [selectedKeywords, setSelectedKeywords] = useState<Set<string>>(new Set());
	const [hoverPreview, setHoverPreview] = useState<ReturnType<typeof buildHoverPreview> | null>(null);
	const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
	const { copyText } = useCopyToClipboard();
	const { showToast } = useToast();

	useEffect(() => {
		if (!hoverPreview) return;

		const clearHoverPreview = () => setHoverPreview(null);

		window.addEventListener('scroll', clearHoverPreview, true);
		window.addEventListener('resize', clearHoverPreview);

		return () => {
			window.removeEventListener('scroll', clearHoverPreview, true);
			window.removeEventListener('resize', clearHoverPreview);
		};
	}, [hoverPreview]);

	const toggleKeyword = (keyword: string) => {
		setSelectedKeywords((current) => {
			const next = new Set(current);
			if (next.has(keyword)) next.delete(keyword);
			else next.add(keyword);
			return next;
		});
	};

	const clearPrompt = () => setSelectedKeywords(new Set());
	const toggleCategoryExpansion = (label: string) => {
		setExpandedCategories((current) => ({ ...current, [label]: !current[label] }));
	};

	const promptText = selectedKeywords.size > 0 ? buildPromptText(selectedKeywords) : '';
	const moodPreview = Array.from(selectedKeywords).find((keyword) => optionCategoryMap.get(keyword) === 'Mood');
	const productPreview = Array.from(selectedKeywords).find((keyword) => optionCategoryMap.get(keyword) === 'Product');
	const contentPreview = Array.from(selectedKeywords).find((keyword) => optionCategoryMap.get(keyword) === 'Content');

	const showPreview = (option: string, category: string, target: HTMLElement) => {
		setHoverPreview(buildHoverPreview(option, category, target));
	};

	const handleMouseEnter = (option: string, category: string) => (event: MouseEvent<HTMLButtonElement>) => {
		showPreview(option, category, event.currentTarget);
	};

	const handleFocus = (option: string, category: string) => (event: FocusEvent<HTMLButtonElement>) => {
		showPreview(option, category, event.currentTarget);
	};

	const hidePreview = (option: string) => {
		setHoverPreview((current) => (current?.preview.keyword === option ? null : current));
	};

	const handleCopy = async () => {
		if (!promptText) {
			showToast('Add keywords first');
			return;
		}
		await copyText(promptText, 'Prompt copied!');
	};

	return (
		<div className="prompt-builder" id="promptBuilder">
			<div className="prompt-builder-header">
				<h3>Your Prompt</h3>
				<div style={{ display: 'flex', gap: 8 }}>
					<button className="btn btn-secondary" type="button" onClick={clearPrompt} style={{ fontSize: '0.8125rem', padding: '6px 14px' }}>Clear</button>
					<button className="btn btn-primary" type="button" onClick={() => void handleCopy()} style={{ fontSize: '0.8125rem', padding: '6px 14px' }}>Copy Prompt</button>
				</div>
			</div>

			<div className="prompt-output" id="promptOutput">
				{selectedKeywords.size > 0 ? (
					promptText
				) : (
					<span className="placeholder">
						{`MOOD: ${moodPreview ?? 'Select a mood'}\nPRODUCT: ${productPreview ?? 'Select a product'}\nCONTENT: ${contentPreview ?? 'Select a content direction'}`}
					</span>
				)}
			</div>

			<div className="builder-categories" id="builderCategories">
				{builderCategories.map((category) => (
					<div key={category.label}>
						<div className="builder-category-label">{category.label}</div>
						<div className="builder-chips">
							{category.options
								.slice(
									0,
									expandedCategories[category.label]
										? category.options.length
										: (collapsibleCategoryLimit[category.label] ?? category.options.length),
								)
								.map((option) => {
									const active = selectedKeywords.has(option);
									return (
										<button
											key={option}
											className={`builder-chip${active ? ' active' : ''}`}
											type="button"
											onClick={() => toggleKeyword(option)}
											onMouseEnter={handleMouseEnter(option, category.label)}
											onMouseLeave={() => hidePreview(option)}
											onFocus={handleFocus(option, category.label)}
											onBlur={() => hidePreview(option)}>
											{option}
										</button>
									);
								})}
							{category.options.length > (collapsibleCategoryLimit[category.label] ?? category.options.length) ? (
								<button
									className="builder-chip builder-chip-more"
									type="button"
									onClick={() => toggleCategoryExpansion(category.label)}>
									{expandedCategories[category.label]
										? 'Less'
										: `More +${category.options.length - (collapsibleCategoryLimit[category.label] ?? category.options.length)}`}
								</button>
							) : null}
						</div>
					</div>
				))}
			</div>

			<BuilderHoverPreviewCard hoverPreview={hoverPreview} />
		</div>
	);
}

function buildHoverPreview(option: string, category: string, target: HTMLElement) {
	return {
		preview: getBuilderPreview(option, category),
		...getBuilderPreviewPosition(target),
	};
}
