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
		case 'swiss':
			return <div className="demo-swiss"><div className="swiss-grid"></div><div className="swiss-bar"></div><div className="swiss-type"><span>Neue</span><span>Grid</span><span>1960</span></div></div>;
		case 'editorial':
			return <div className="demo-editorial"><div className="editorial-frame"></div><div className="editorial-copy"><div className="editorial-kicker">Issue 09</div><div className="editorial-title">Atelier</div><div className="editorial-line"></div></div></div>;
		case 'webbrutal':
			return <div className="demo-webbrutal"><div className="wb-window"><div className="wb-top"></div><div className="wb-body"><span>&lt;RAW&gt;</span><span>grid_on</span><span>no mercy</span></div></div></div>;
		case 'scandi':
			return <div className="demo-scandi"><div className="scandi-card"><div className="scandi-stone"></div><div className="scandi-text">Nord Form</div><div className="scandi-rule"></div></div></div>;
		case 'technoir':
			return <div className="demo-technoir"><div className="technoir-glow"></div><div className="technoir-panel"><div className="technoir-title">NOIR</div><div className="technoir-meta">signal / 77%</div></div></div>;
		case 'maximal':
			return <div className="demo-maximal"><div className="maximal-burst">WOW</div><div className="maximal-sticker maximal-star"></div><div className="maximal-sticker maximal-dot"></div><div className="maximal-sticker maximal-wave">~</div></div>;
		case 'ecomodern':
			return <div className="demo-ecomodern"><div className="eco-arch"></div><div className="eco-leaf eco-leaf-a"></div><div className="eco-leaf eco-leaf-b"></div><div className="eco-label">eco modern</div></div>;
		case 'retrofuture':
			return <div className="demo-retrofuture"><div className="rf-sun"></div><div className="rf-ring"></div><div className="rf-grid"></div><div className="rf-chrome">2099</div></div>;
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
