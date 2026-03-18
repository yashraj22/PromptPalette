import { Chip } from '../Chip';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import type { ColorSchemeData } from '../../types/content';

export function ColorSchemeCard({ scheme }: { scheme: ColorSchemeData }) {
	const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>();

	return (
		<div
			ref={ref}
			className={`card reveal ${isVisible ? 'visible' : ''}`}>
			<div className="card-demo">
				<div className="color-strip">
					{scheme.swatches.map((swatch) => (
						<div
							key={swatch}
							className="color-swatch"
							style={{ background: swatch }}
							data-hex={swatch}
						/>
					))}
				</div>
			</div>
			<div className="card-body">
				<h3 className="card-title">{scheme.name}</h3>
				<p className="card-desc">{scheme.description}</p>
				<div className="chips">
					{scheme.chips.map((item) => (
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
