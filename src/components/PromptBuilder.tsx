import { useState } from 'react';
import { builderCategories } from '../data/builder';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useToast } from './Toast';

export function PromptBuilder() {
	const [selectedKeywords, setSelectedKeywords] = useState<Set<string>>(new Set());
	const { copyText } = useCopyToClipboard();
	const { showToast } = useToast();

	const toggleKeyword = (keyword: string) => {
		setSelectedKeywords((current) => {
			const next = new Set(current);
			if (next.has(keyword)) next.delete(keyword);
			else next.add(keyword);
			return next;
		});
	};

	const clearPrompt = () => setSelectedKeywords(new Set());

	const promptText =
		selectedKeywords.size > 0
			? `Design a UI with: ${Array.from(selectedKeywords).join(', ')}`
			: '';

	const handleCopy = async () => {
		if (!promptText) {
			showToast('Add keywords first');
			return;
		}

		await copyText(promptText, 'Prompt copied!');
	};

	return (
		<div
			className="prompt-builder"
			id="promptBuilder">
			<div className="prompt-builder-header">
				<h3>Your Prompt</h3>
				<div style={{ display: 'flex', gap: 8 }}>
					<button
						className="btn btn-secondary"
						type="button"
						onClick={clearPrompt}
						style={{ fontSize: '0.8125rem', padding: '6px 14px' }}>
						Clear
					</button>
					<button
						className="btn btn-primary"
						type="button"
						onClick={() => void handleCopy()}
						style={{ fontSize: '0.8125rem', padding: '6px 14px' }}>
						Copy Prompt
					</button>
				</div>
			</div>

			<div
				className="prompt-output"
				id="promptOutput">
				{promptText || (
					<span className="placeholder">
						Click keywords below to build your prompt...
					</span>
				)}
			</div>

			<div
				className="builder-categories"
				id="builderCategories">
				{builderCategories.map((category) => (
					<div key={category.label}>
						<div className="builder-category-label">{category.label}</div>
						<div className="builder-chips">
							{category.options.map((option) => {
								const active = selectedKeywords.has(option);

								return (
									<button
										key={option}
										className={`builder-chip${active ? ' active' : ''}`}
										type="button"
										onClick={() => toggleKeyword(option)}>
										{option}
									</button>
								);
							})}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
