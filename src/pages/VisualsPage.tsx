import { SectionHeader } from '../components/SectionHeader';
import { CheatCategoryCard } from '../components/cards/CheatCategoryCard';
import { ColorSchemeCard } from '../components/cards/ColorSchemeCard';
import { EffectCard } from '../components/cards/EffectCard';
import { cheatSheetCategories } from '../data/cheatSheet';
import { colorSchemes } from '../data/colors';
import { effects } from '../data/effects';

export function VisualsPage() {
	return (
		<main className="page-shell">
			<section className="page-hero">
				<div className="container-wide">
					<div className="page-kicker">Visual Systems</div>
					<h1 className="page-title">Color, effects, and prompt-ready reference keywords.</h1>
					<p className="page-subtitle">
						Keep palette logic and surface treatments together so the browsing
						experience stays fast and focused.
					</p>
					<div className="page-subnav">
						<a href="#colors">Colors</a>
						<a href="#effects">Effects</a>
						<a href="#cheatsheet">Cheat Sheet</a>
					</div>
				</div>
			</section>

			<section
				className="section section-alt"
				id="colors">
				<div className="container-wide">
					<SectionHeader
						badge="04"
						title="Color Schemes"
						description="Named palettes with 5-swatch strips to reference in your design prompts."
					/>
					<div className="cards-grid-3">
						{colorSchemes.map((scheme) => (
							<ColorSchemeCard
								key={scheme.name}
								scheme={scheme}
							/>
						))}
					</div>
				</div>
			</section>

			<div className="dot-divider"></div>

			<section
				className="section"
				id="effects">
				<div className="container-wide">
					<SectionHeader
						badge="05"
						title="Visual Effects"
						description="Surface treatments, depth techniques, and atmospheric effects to layer into your prompts."
					/>
					<div className="cards-grid-3">
						{effects.map((effect) => (
							<EffectCard
								key={effect.name}
								effect={effect}
							/>
						))}
					</div>
				</div>
			</section>

			<div className="dot-divider"></div>

			<section
				className="section section-alt"
				id="cheatsheet">
				<div className="container-wide">
					<SectionHeader
						badge="06"
						title="Prompt Keywords Cheat Sheet"
						description="Quick-reference categories. Click any keyword to copy it."
					/>
					<div className="cheat-grid">
						{cheatSheetCategories.map((category) => (
							<CheatCategoryCard
								key={category.category}
								category={category}
							/>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
