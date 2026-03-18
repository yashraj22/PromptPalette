import { Link } from 'react-router-dom';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import type { OverviewLinkData } from '../../types/content';

export function OverviewLinkCard({ item }: { item: OverviewLinkData }) {
	const { ref, isVisible } = useRevealOnScroll<HTMLAnchorElement>();

	return (
		<Link
			ref={ref}
			to={item.to}
			className={`overview-card reveal ${isVisible ? 'visible' : ''}`}>
			<div className="overview-card-eyebrow">{item.eyebrow}</div>
			<h3>{item.title}</h3>
			<p>{item.description}</p>
			<div className="overview-card-tags">
				{item.tags.map((tag) => (
					<span
						key={tag}
						className="overview-card-tag">
						{tag}
					</span>
				))}
			</div>
			<span className="overview-card-cta">Open route</span>
		</Link>
	);
}
