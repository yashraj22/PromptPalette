import { useEffect, useRef } from 'react';
import { Chip } from '../Chip';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import type { EffectCardData } from '../../types/content';

export function EffectCard({ effect }: { effect: EffectCardData }) {
	const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>();
	const styleRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (styleRef.current && effect.demoStyle) {
			styleRef.current.style.cssText = effect.demoStyle;
		}
	}, [effect.demoStyle]);

	return (
		<div
			ref={ref}
			className={`fx-card reveal ${isVisible ? 'visible' : ''}`}>
			<div className="fx-demo">
				{effect.demoHtml ? (
					<div dangerouslySetInnerHTML={{ __html: effect.demoHtml }} />
				) : (
					<div ref={styleRef} />
				)}
			</div>
			<div className="fx-body">
				<h3 className="fx-title">{effect.name}</h3>
				<p className="fx-desc">{effect.description}</p>
				<div className="chips">
					{effect.chips.map((item) => (
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
