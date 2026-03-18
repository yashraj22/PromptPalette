import { SectionHeader } from '../components/SectionHeader';
import { LayoutCard } from '../components/cards/LayoutCard';
import { StyleCard } from '../components/cards/StyleCard';
import { TypographyCard } from '../components/cards/TypographyCard';
import { layoutCards } from '../data/layouts';
import { styleCards } from '../data/styles';
import { typographyCards } from '../data/typography';

export function DesignPage() {
	return (
		<main className="page-shell">
			<section className="page-hero">
				<div className="container-wide">
					<div className="page-kicker">Design Library</div>
					<h1 className="page-title">Styles, layouts, and type without the long scroll.</h1>
					<p className="page-subtitle">
						Group the visual foundation into one route and move between subsections
						with in-page links when needed.
					</p>
					<div className="page-subnav">
						<a href="#styles">Styles</a>
						<a href="#layouts">Layouts</a>
						<a href="#typography">Typography</a>
					</div>
				</div>
			</section>

			<section
				className="section"
				id="styles">
				<div className="container-wide">
					<SectionHeader
						badge="01"
						title="Design Styles"
						description="Recognizable visual aesthetics - each with a CSS demo and copyable keywords for your prompts."
					/>
					<div className="cards-grid">
						{styleCards.map((card) => (
							<StyleCard
								key={card.title}
								card={card}
							/>
						))}
					</div>
				</div>
			</section>

			<div className="dot-divider"></div>

			<section
				className="section section-alt"
				id="layouts">
				<div className="container-wide">
					<SectionHeader
						badge="02"
						title="Layout Patterns"
						description="Structural compositions for arranging content on screen."
					/>
					<div className="cards-grid-3">
						{layoutCards.map((card) => (
							<LayoutCard
								key={card.title}
								card={card}
							/>
						))}
					</div>
				</div>
			</section>

			<div className="dot-divider"></div>

			<section
				className="section"
				id="typography">
				<div className="container-wide">
					<SectionHeader
						badge="03"
						title="Typography"
						description="Type treatments, font categories, and typographic techniques to describe in prompts."
					/>
					<div className="cards-grid">
						{typographyCards.map((card) => (
							<TypographyCard
								key={card.title}
								card={card}
							/>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
