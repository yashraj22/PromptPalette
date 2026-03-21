import type { FocusEvent, MouseEvent } from 'react';
import { useEffect, useState } from 'react';
import { BuilderHoverPreviewCard, getBuilderPreview, getBuilderPreviewPosition } from '../BuilderHoverPreview';
import { Chip } from '../Chip';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import type { CheatCategoryData } from '../../types/content';

export function CheatCategoryCard({ category }: { category: CheatCategoryData }) {
	const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>();
	const [hoverPreview, setHoverPreview] = useState<ReturnType<typeof buildHoverPreview> | null>(null);

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

	const showPreview = (label: string, target: HTMLElement) => {
		setHoverPreview(buildHoverPreview(label, category.category, target));
	};

	const handleMouseEnter = (label: string) => (event: MouseEvent<HTMLButtonElement>) => {
		showPreview(label, event.currentTarget);
	};

	const handleFocus = (label: string) => (event: FocusEvent<HTMLButtonElement>) => {
		showPreview(label, event.currentTarget);
	};

	const hidePreview = (label: string) => {
		setHoverPreview((current) => (current?.preview.keyword === label ? null : current));
	};

	return (
		<>
			<div
				ref={ref}
				className={`cheat-card reveal ${isVisible ? 'visible' : ''}`}>
				<div className="cheat-category">{category.category}</div>
				<div className="cheat-keywords">
					{category.keywords.map((item) => (
						<Chip
							key={item.label}
							label={item.label}
							onMouseEnter={handleMouseEnter(item.label)}
							onMouseLeave={() => hidePreview(item.label)}
							onFocus={handleFocus(item.label)}
							onBlur={() => hidePreview(item.label)}
						/>
					))}
				</div>
			</div>
			<BuilderHoverPreviewCard hoverPreview={hoverPreview} />
		</>
	);
}

function buildHoverPreview(label: string, category: string, target: HTMLElement) {
	return {
		preview: getBuilderPreview(label, category),
		...getBuilderPreviewPosition(target),
	};
}
