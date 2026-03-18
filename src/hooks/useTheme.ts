import { useEffect, useState } from 'react';
import type { ThemeMode } from '../types/content';

const STORAGE_KEY = 'prompt-palette-theme';

function getInitialTheme(): ThemeMode {
	const stored = window.localStorage.getItem(STORAGE_KEY);
	return stored === 'light' ? 'light' : 'dark';
}

export function useTheme() {
	const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme());

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
		window.localStorage.setItem(STORAGE_KEY, theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
	};

	return { theme, toggleTheme };
}
