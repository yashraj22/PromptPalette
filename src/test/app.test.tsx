import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { routes } from '../router';

function renderRoute(initialEntry: string) {
	const router = createMemoryRouter(routes, {
		initialEntries: [initialEntry],
	});

	return render(<RouterProvider router={router} />);
}

describe('Prompt Palette app', () => {
	beforeEach(() => {
		window.localStorage.clear();
		document.documentElement.dataset.theme = 'dark';
	});

	it('renders the home page with overview routes and prompt builder', async () => {
		const user = userEvent.setup();
		const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();
		renderRoute('/');

		expect(
			screen.getByRole('heading', {
				name: /the design vocabulary/i,
			}),
		).toBeInTheDocument();
		expect(screen.getByRole('link', { name: /design library/i })).toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: 'glassmorphism' }));
		expect(screen.getByText(/Design a UI with: glassmorphism/i)).toBeInTheDocument();

		await user.click(screen.getByRole('button', { name: /copy prompt/i }));
		expect(writeText).toHaveBeenCalledWith(
			'Design a UI with: glassmorphism',
		);
		expect(screen.getByText(/prompt copied!/i)).toBeInTheDocument();
	});

	it('toggles theme and persists it to localStorage', async () => {
		const user = userEvent.setup();
		renderRoute('/');

		const toggle = screen.getByRole('button', { name: /toggle theme/i });
		await user.click(toggle);

		expect(document.documentElement.dataset.theme).toBe('light');
		expect(window.localStorage.getItem('prompt-palette-theme')).toBe('light');
	});

	it('renders grouped design content on the design route', () => {
		renderRoute('/design');

		expect(screen.getByRole('heading', { name: /design styles/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /layout patterns/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /typography/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /glassmorphism/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /bento grid/i })).toBeInTheDocument();
	});

	it('renders the dedicated ui ux route without the legacy accordion', () => {
		renderRoute('/ui-ux');

		expect(screen.getByRole('heading', { name: /ui design principles/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /ux design principles/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /mental models/i })).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: /recognition over recall/i })).toBeInTheDocument();
		expect(screen.queryByText(/click any principle to expand/i)).not.toBeInTheDocument();
	});
});
