import { Chip } from '../Chip';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import type { LayoutCardData } from '../../types/content';

function renderLayoutDemo(demoKey: LayoutCardData['demoKey']) {
	const block = <div className="block"></div>;

	switch (demoKey) {
		case 'bento':
			return <div className="layout-mini lm-bento">{block}{block}{block}{block}</div>;
		case 'asym':
			return <div className="layout-mini lm-asym">{block}{block}{block}</div>;
		case 'split':
			return <div className="layout-mini lm-split">{block}{block}</div>;
		case 'masonry':
			return <div className="layout-mini lm-masonry">{block}{block}{block}{block}{block}</div>;
		case 'cardgrid':
			return <div className="layout-mini lm-cardgrid">{block}{block}{block}{block}{block}{block}</div>;
		case 'fullbleed':
			return <div className="layout-mini lm-fullbleed">{block}{block}{block}</div>;
		case 'sidebar':
			return <div className="layout-mini lm-sidebar">{block}{block}{block}{block}</div>;
		case 'magazine':
			return <div className="layout-mini lm-magazine">{block}{block}{block}{block}</div>;
		case 'zpattern':
			return <div className="layout-mini lm-zpattern">{block}{block}<div className="block-line"></div>{block}{block}</div>;
		case 'fpattern':
			return <div className="layout-mini lm-fpattern">{block}{block}{block}{block}{block}{block}</div>;
		case 'holygrail':
			return <div className="layout-mini lm-holygrail">{block}{block}{block}{block}{block}</div>;
		case 'sticky':
			return <div className="layout-mini lm-sticky">{block}<div style={{ display: 'flex', flexDirection: 'column', gap: 4, height: '100%' }}><div className="block" style={{ flex: 1 }}></div><div className="block" style={{ flex: 1 }}></div><div className="block" style={{ flex: 1 }}></div></div></div>;
		case 'overlap':
			return <div className="layout-mini lm-overlap">{block}{block}</div>;
		case 'singlecol':
			return <div className="layout-mini lm-singlecol">{block}{block}{block}{block}</div>;
	}
}

export function LayoutCard({ card }: { card: LayoutCardData }) {
	const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>();

	return (
		<div
			ref={ref}
			className={`layout-card reveal ${isVisible ? 'visible' : ''}`}>
			<div className="layout-demo">{renderLayoutDemo(card.demoKey)}</div>
			<div className="layout-body">
				<h3 className="layout-title">{card.title}</h3>
				<p className="layout-desc">{card.description}</p>
				<div className="chips">
					{card.chips.map((item) => (
						<Chip
							key={item.label}
							label={item.label}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
