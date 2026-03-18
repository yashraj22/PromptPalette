import { useRevealOnScroll } from '../hooks/useRevealOnScroll';

interface SectionHeaderProps {
	badge: string;
	title: string;
	description: string;
	className?: string;
}

export function SectionHeader({
	badge,
	title,
	description,
	className,
}: SectionHeaderProps) {
	const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>();

	return (
		<div
			ref={ref}
			className={`section-header reveal ${isVisible ? 'visible' : ''}${className ? ` ${className}` : ''}`}>
			<span className="section-badge">{badge}</span>
			<h2>{title}</h2>
			<p>{description}</p>
		</div>
	);
}
