import { Link } from 'react-router-dom';
import { PromptBuilder } from '../components/PromptBuilder';
import { SectionHeader } from '../components/SectionHeader';
import { OverviewLinkCard } from '../components/cards/OverviewLinkCard';
import { overviewLinks } from '../data/overviewLinks';

export function HomePage() {
	return (
		<main>
			<section className="hero">
				<div className="grid-lines"></div>
				<div className="container hero-content">
					<div className="hero-badge">v2.0 - Routed Edition</div>
					<h1>
						The Design Vocabulary
						<br />
						for AI Prompting
					</h1>
					<p className="hero-sub">
						Visual CSS demos for every design keyword you need. Move through the
						library by route instead of one long scroll, and build prompts
						directly from home.
					</p>
					<div className="hero-actions">
						<Link
							to="/design"
							className="btn btn-primary">
							Explore Library
						</Link>
						<Link
							to="/#builder"
							className="btn btn-secondary">
							Prompt Builder
						</Link>
					</div>
				</div>
			</section>

			<div className="dot-divider"></div>

			<section className="section">
				<div className="container-wide">
					<SectionHeader
						badge="01"
						title="Browse By Route"
						description="Jump straight into grouped sections with less scroll friction than the original single-page layout."
					/>
					<div className="overview-grid">
						{overviewLinks.map((item) => (
							<OverviewLinkCard
								key={item.to}
								item={item}
							/>
						))}
					</div>
				</div>
			</section>

			<div className="dot-divider"></div>

			<section
				className="section section-alt"
				id="builder">
				<div className="container">
					<SectionHeader
						badge="02"
						title="Prompt Builder"
						description="Click keywords to compose a full design prompt. Copy when ready."
					/>
					<PromptBuilder />
				</div>
			</section>
		</main>
	);
}
