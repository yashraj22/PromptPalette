import { Chip } from '../Chip';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import type { TypographyCardData } from '../../types/content';

function renderTypographyDemo(demoKey: TypographyCardData['demoKey']) {
	switch (demoKey) {
		case 'serifSans':
			return <div className="typo-demo typo-demo-gap"><div style={{ textAlign: 'center' }}><div style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', color: 'var(--text-primary)' }}>Serif</div><div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: 4 }}>Georgia - Times - Playfair</div></div><div style={{ width: 1, height: 60, background: 'var(--border)' }}></div><div style={{ textAlign: 'center' }}><div style={{ fontFamily: '"Geist", sans-serif', fontSize: '2rem', fontWeight: 400, color: 'var(--text-primary)' }}>Sans-Serif</div><div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: 4 }}>Geist - Inter - Helvetica</div></div></div>;
		case 'weight':
			return <div className="typo-demo typo-demo-stack"><div style={{ fontWeight: 300, fontSize: '1rem', color: 'var(--text-primary)', opacity: 0.5 }}>Light 300</div><div style={{ fontWeight: 400, fontSize: '1rem', color: 'var(--text-primary)', opacity: 0.65 }}>Regular 400</div><div style={{ fontWeight: 500, fontSize: '1rem', color: 'var(--text-primary)', opacity: 0.8 }}>Medium 500</div><div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>Bold 700</div><div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>Extra Bold 800</div></div>;
		case 'display':
			return <div className="typo-demo"><div style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-primary)', lineHeight: 1 }}>Big.</div></div>;
		case 'mono':
			return <div className="typo-demo"><div style={{ fontFamily: '"Geist Mono", monospace', fontSize: '0.9rem', color: 'var(--text-primary)', background: 'var(--code-bg)', padding: '12px 16px', borderRadius: 8, border: '1px solid var(--border)' }}>const design = "precise";<br />console.log(design);</div></div>;
		case 'spacing':
			return <div className="typo-demo typo-demo-stack"><div style={{ fontSize: '1rem', letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>Tight Tracking -0.04em</div><div style={{ fontSize: '1rem', letterSpacing: 0, color: 'var(--text-muted)' }}>Normal 0</div><div style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Wide Tracking 0.2em</div></div>;
		case 'case':
			return <div className="typo-demo typo-demo-case"><div style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.12em', fontWeight: 600, color: 'var(--text-primary)' }}>UPPERCASE</div><div style={{ textTransform: 'lowercase', fontSize: '1rem', color: 'var(--text-muted)' }}>lowercase</div><div style={{ textTransform: 'capitalize', fontSize: '1rem', color: 'var(--text-dim)' }}>Title Case Text</div><div style={{ fontVariant: 'small-caps', fontSize: '1rem', color: 'var(--text-muted)' }}>Small Caps</div></div>;
		case 'variable':
			return <div className="typo-demo typo-demo-weight"><div style={{ fontWeight: 300, fontSize: '1.2rem', color: 'var(--text-primary)' }}>Weight 300</div><div style={{ fontWeight: 500, fontSize: '1.2rem', color: 'var(--text-primary)' }}>Weight 500</div><div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-primary)' }}>Weight 800</div></div>;
		case 'script':
			return <div className="typo-demo"><div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.8rem', color: 'var(--text-primary)', transform: 'rotate(-3deg)' }}>Handwritten</div></div>;
		case 'slab':
			return <div className="typo-demo"><div style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>SLAB</div></div>;
		case 'width':
			return <div className="typo-demo typo-demo-stack"><div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', transform: 'scaleX(0.7)', letterSpacing: '0.02em' }}>CONDENSED</div><div style={{ fontSize: '1.2rem', fontWeight: 400, color: 'var(--text-muted)', transform: 'scaleX(1.2)', letterSpacing: '0.08em' }}>Extended</div></div>;
		case 'pairing':
			return <div className="typo-demo typo-demo-stack"><div style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', color: 'var(--text-primary)' }}>Serif Headline</div><div style={{ fontFamily: '"Geist", sans-serif', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Paired with a clean sans-serif body for contrast and readability.</div></div>;
	}
}

export function TypographyCard({ card }: { card: TypographyCardData }) {
	const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>();

	return (
		<div
			ref={ref}
			className={`typo-card reveal ${isVisible ? 'visible' : ''}${card.featured ? ' typo-card-featured' : ''}`}>
			{renderTypographyDemo(card.demoKey)}
			<div className="typo-body">
				<h3 className="typo-title">{card.title}</h3>
				<p className="typo-desc">{card.description}</p>
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
