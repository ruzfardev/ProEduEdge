import React from 'react';
import ReactDOM from 'react-dom/client';
import {NextUIProvider} from '@nextui-org/react';
import App from './app/App.tsx';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {RootRoute} from './routes/root.tsx';
import {ErrorRoute} from './routes/error.tsx';
import {CoursesPage} from './pages/courses';
import {AboutPage} from './pages/about';
import {ContactPage} from './pages/contact';
import {Login} from './pages/auth/login.tsx';
import {Register} from './pages/auth/register.tsx';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './index.css';
import {CourseDetail} from './pages/detail';
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
				path: '/about',
				element: <AboutPage />,
			},
			{
				path: '/courses',
				element: <CoursesPage />,
			},
			{
				path: '/courses/:id',
				element: <CourseDetail />,
			},
			{
				path: '/contact',
				element: <ContactPage />,
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/register',
		element: <Register />,
		errorElement: <ErrorRoute />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<NextUIProvider>
			<RouterProvider router={router} />
		</NextUIProvider>
	</React.StrictMode>
);
