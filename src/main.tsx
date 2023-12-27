import React from 'react';
import ReactDOM from 'react-dom/client';
import {NextUIProvider} from '@nextui-org/react';
import App from './app/App.tsx';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './index.css';
import {RootRoute} from './routes/root.tsx';
import {ErrorRoute} from './routes/error.tsx';
import {CoursesPage} from './pages/courses';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootRoute />,
		errorElement: <ErrorRoute />,
		children: [
			{
				path: '/',
				element: <App />,
			},
			{
				path: '/courses',
				element: <CoursesPage />,
				children: [
					{
						path: '/courses/:id',
						element: <div>Course Detail</div>,
					},
				],
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<NextUIProvider>
			<RouterProvider router={router} />
		</NextUIProvider>
	</React.StrictMode>
);
