import { SectionHeader } from '../components/SectionHeader';
import { PrincipleCard } from '../components/cards/PrincipleCard';
import { uiPrinciples } from '../data/uiPrinciples';
import { uxPrinciples } from '../data/uxPrinciples';

export function UiUxPage() {
	return (
		<main className="page-shell">
			<section className="page-hero">
				<div className="container-wide">
					<div className="page-kicker">UI / UX Principles</div>
					<h1 className="page-title">Interface rules and interaction logic on their own route.</h1>
					<p className="page-subtitle">
						The hidden legacy accordion stays out of the shipped UI. This route
						keeps only the current card-based presentation.
					</p>
					<div className="page-subnav">
						<a href="#ui-principles">UI Design</a>
						<a href="#ux-principles">UX Design</a>
					</div>
				</div>
			</section>

			<section
				className="section uiux-principles-section"
				id="ui-principles">
				<div className="container-wide">
					<div className="uiux-shell">
						<SectionHeader
							badge="07"
							title="UI Design Principles"
							description="Core visual design rules that make interfaces look polished and professional."
							className="uiux-header"
						/>
						<div className="uiux-grid">
							{uiPrinciples.map((principle) => (
								<PrincipleCard
									key={principle.title}
									principle={principle}
								/>
							))}
						</div>
					</div>
				</div>
			</section>

			<div className="dot-divider"></div>

			<section
				className="section uiux-principles-section"
				id="ux-principles">
				<div className="container-wide">
					<div className="uiux-shell">
						<SectionHeader
							badge="08"
							title="UX Design Principles"
							description="How users think, navigate, and interact - the invisible layer that makes design feel effortless."
							className="uiux-header"
						/>
						<div className="uiux-grid">
							{uxPrinciples.map((principle) => (
								<PrincipleCard
									key={principle.title}
									principle={principle}
									className="uiux-card-ux"
								/>
							))}
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
