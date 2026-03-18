import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Footer } from './components/Footer';
import { Nav } from './components/Nav';
import { ToastProvider, ToastViewport } from './components/Toast';

function ScrollManager() {
	const location = useLocation();

	useEffect(() => {
		if (location.hash) {
			const id = location.hash.slice(1);
			const target = document.getElementById(id);

			if (target) {
				window.requestAnimationFrame(() => {
					target.scrollIntoView({ behavior: 'smooth', block: 'start' });
				});
			}

			return;
		}

		window.scrollTo({ top: 0, behavior: 'auto' });
	}, [location]);

	return null;
}

export function AppLayout() {
	return (
		<ToastProvider>
			<ScrollManager />
			<Nav />
			<Outlet />
			<Footer />
			<ToastViewport />
		</ToastProvider>
	);
}
