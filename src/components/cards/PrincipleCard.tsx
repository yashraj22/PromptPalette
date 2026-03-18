import { Chip } from '../Chip';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import type { PrincipleCardData } from '../../types/content';

export function PrincipleCard({
	principle,
	className = '',
}: {
	principle: PrincipleCardData;
	className?: string;
}) {
	const { ref, isVisible } = useRevealOnScroll<HTMLElement>();
	const classes = ['uiux-card', className, 'reveal', isVisible ? 'visible' : '']
		.filter(Boolean)
		.join(' ');

	return (
		<article
			ref={ref}
			className={classes}>
			<div
				className="uiux-icon"
				aria-hidden="true">
				{principle.icon}
			</div>
			<h3>{principle.title}</h3>
			<p>{principle.description}</p>
			<div className="uiux-tags">
				{principle.chips.map((item) => (
					<Chip
						key={item.label}
						label={item.label}
						variant="uiux"
					/>
				))}
			</div>
		</article>
	);
}
