import { Chip } from '../Chip';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import type { CheatCategoryData } from '../../types/content';

export function CheatCategoryCard({ category }: { category: CheatCategoryData }) {
	const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>();

	return (
		<div
			ref={ref}
			className={`cheat-card reveal ${isVisible ? 'visible' : ''}`}>
			<div className="cheat-category">{category.category}</div>
			<div className="cheat-title">{category.category}</div>
			<div className="cheat-keywords">
				{category.keywords.map((item) => (
					<Chip
						key={item.label}
						label={item.label}
					/>
				))}
			</div>
		</div>
	);
}
