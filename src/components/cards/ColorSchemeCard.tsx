import type { CSSProperties } from 'react';
import { Chip } from '../Chip';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import type { ColorSchemeData } from '../../types/content';

function getSwatchLabelColor(hex: string) {
	const normalized = hex.replace('#', '');
	if (normalized.length !== 6) {
		return 'rgba(255, 255, 255, 0.78)';
	}

	const red = Number.parseInt(normalized.slice(0, 2), 16);
	const green = Number.parseInt(normalized.slice(2, 4), 16);
	const blue = Number.parseInt(normalized.slice(4, 6), 16);
	const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;

	return luminance > 0.68 ? 'rgba(17, 24, 39, 0.78)' : 'rgba(255, 255, 255, 0.82)';
}

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
							style={{
								background: swatch,
								['--swatch-label-color']: getSwatchLabelColor(swatch),
							} as CSSProperties}
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
