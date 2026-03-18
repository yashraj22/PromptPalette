import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import { DesignPage } from './pages/DesignPage';
import { HomePage } from './pages/HomePage';
import { UiUxPage } from './pages/UiUxPage';
import { VisualsPage } from './pages/VisualsPage';

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <AppLayout />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: 'design', element: <DesignPage /> },
			{ path: 'visuals', element: <VisualsPage /> },
			{ path: 'ui-ux', element: <UiUxPage /> },
		],
	},
];

export const router = createBrowserRouter(routes);
