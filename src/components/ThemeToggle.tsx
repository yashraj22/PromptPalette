import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			className="theme-toggle"
			type="button"
			onClick={toggleTheme}
			aria-label="Toggle theme">
			<svg
				className="icon-sun"
				viewBox="0 0 16 16"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.2"
				strokeLinecap="round"
				style={{ display: theme === 'dark' ? 'block' : 'none' }}>
				<circle
					cx="8"
					cy="8"
					r="3.5"
				/>
				<line
					x1="8"
					y1="1"
					x2="8"
					y2="2.5"
				/>
				<line
					x1="8"
					y1="13.5"
					x2="8"
					y2="15"
				/>
				<line
					x1="1"
					y1="8"
					x2="2.5"
					y2="8"
				/>
				<line
					x1="13.5"
					y1="8"
					x2="15"
					y2="8"
				/>
				<line
					x1="3.05"
					y1="3.05"
					x2="4.11"
					y2="4.11"
				/>
				<line
					x1="11.89"
					y1="11.89"
					x2="12.95"
					y2="12.95"
				/>
				<line
					x1="3.05"
					y1="12.95"
					x2="4.11"
					y2="11.89"
				/>
				<line
					x1="11.89"
					y1="4.11"
					x2="12.95"
					y2="3.05"
				/>
			</svg>
			<svg
				className="icon-moon"
				viewBox="0 0 16 16"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.2"
				strokeLinecap="round"
				style={{ display: theme === 'light' ? 'block' : 'none' }}>
				<path d="M13.5 8.5a5.5 5.5 0 1 1-6-6 4.5 4.5 0 0 0 6 6z" />
			</svg>
		</button>
	);
}
