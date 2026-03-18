import { Chip } from '../Chip';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import type { StyleCardData } from '../../types/content';

function renderStyleDemo(demoKey: StyleCardData['demoKey']) {
	switch (demoKey) {
		case 'glass':
			return <div className="demo-glass"><div className="orb1"></div><div className="orb2"></div><div className="panel">Frosted Glass</div></div>;
		case 'neumorph':
			return <div className="demo-neumorph"><div className="neu-card"><div className="neu-title">Soft UI</div><div className="neu-btn">Button</div></div></div>;
		case 'neubrutalism':
			return <div className="demo-neubrutalism"><div className="nb-card"><h4>RAW</h4><p>No polish needed</p><span className="nb-tag">BOLD</span></div></div>;
		case 'minimal':
			return <div className="demo-minimal"><span>Less</span><div className="line"></div></div>;
		case 'darklux':
			return <div className="demo-darklux"><span>Elegance</span><span className="subtitle">Refined &amp; Timeless</span></div>;
		case 'flat':
			return <div className="demo-flat"><div className="shape1"></div><div className="shape2"></div><div className="shape3"></div></div>;
		case 'retro':
			return <div className="demo-retro"><div className="terminal"><div className="terminal-bar"><span></span><span></span><span></span></div><div className="terminal-text">$ hello_world<br />&gt; booting up...</div></div></div>;
		case 'organic':
			return <div className="demo-organic"><div className="blob1"></div><div className="blob2"></div><div className="leaf">&#127807;</div></div>;
		case 'skeuo':
			return <div className="demo-skeuo"><div className="leather-card"><span>Leather Bound</span><div className="stitch"></div><span style={{ fontSize: '0.6rem', opacity: 0.7 }}>Est. 2024</span></div></div>;
		case 'material':
			return <div className="demo-material"><div className="mat-card mat1"></div><div className="mat-card mat2"></div><div className="mat-card mat3"></div></div>;
		case 'artdeco':
			return <div className="demo-artdeco"><div className="deco-frame"><div className="deco-line-l"></div><div className="deco-diamond"></div><div className="deco-line-r"></div></div></div>;
		case 'cyberpunk':
			return <div className="demo-cyberpunk"><div style={{ zIndex: 1, textAlign: 'center' }}><div className="neon-text">CYBER</div><div className="neon-sub">// SYS_OVERRIDE</div></div></div>;
		case 'memphis':
			return <div className="demo-memphis"><div className="m-circle"></div><div className="m-triangle"></div><div className="m-squiggle">~</div><div className="m-dots"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div>;
		case 'bauhaus':
			return <div className="demo-bauhaus"><div className="bh-circle"></div><div className="bh-rect"></div><div className="bh-triangle"></div></div>;
		case 'vaporwave':
			return <div className="demo-vaporwave"><div className="vw-grid"></div><div className="vw-text">A E S T H E T I C</div></div>;
		case 'clay':
			return <div className="demo-clay"><div className="clay-card"><div className="clay-circle"></div><div className="clay-text">Clay UI</div></div></div>;
	}
}

export function StyleCard({ card }: { card: StyleCardData }) {
	const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>();

	return (
		<div
			ref={ref}
			className={`card reveal ${isVisible ? 'visible' : ''}`}>
			<div className="card-demo">{renderStyleDemo(card.demoKey)}</div>
			<div className="card-body">
				<h3 className="card-title">{card.title}</h3>
				<p className="card-desc">{card.description}</p>
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
