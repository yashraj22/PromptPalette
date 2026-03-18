import { Link, NavLink } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
	{ label: 'Home', to: '/' },
	{ label: 'Design', to: '/design' },
	{ label: 'Visuals', to: '/visuals' },
	{ label: 'UI / UX', to: '/ui-ux' },
];

export function Nav() {
	return (
		<nav className="nav">
			<div className="nav-inner">
				<Link
					to="/"
					className="nav-logo">
					<svg
						viewBox="0 0 28 28"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-label="Prompt Palette logo">
						<rect
							x="2"
							y="2"
							width="24"
							height="24"
							rx="6"
							stroke="currentColor"
							strokeWidth="1.5"
						/>
						<circle
							cx="9"
							cy="9"
							r="2.5"
							fill="currentColor"
							opacity="0.5"
						/>
						<circle
							cx="19"
							cy="9"
							r="2.5"
							fill="currentColor"
							opacity="0.7"
						/>
						<circle
							cx="9"
							cy="19"
							r="2.5"
							fill="currentColor"
							opacity="0.3"
						/>
						<circle
							cx="19"
							cy="19"
							r="2.5"
							fill="currentColor"
						/>
					</svg>
					<span className="nav-logo-text">Prompt Palette</span>
				</Link>

				<ul className="nav-links">
					{navItems.map((item) => (
						<li key={item.to}>
							<NavLink
								to={item.to}
								className={({ isActive }) =>
									isActive ? 'nav-link-active' : undefined
								}>
								{item.label}
							</NavLink>
						</li>
					))}
					<li>
						<NavLink to="/#builder">Builder</NavLink>
					</li>
				</ul>

				<div className="nav-right">
					<ThemeToggle />
				</div>
			</div>
		</nav>
	);
}
