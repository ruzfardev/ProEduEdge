import {Header} from '../components/header';
import {Footer} from '../components/footer';

import {Outlet, RouterProvider} from 'react-router';
import {createBrowserRouter} from 'react-router-dom';
import {ErrorRoute} from './error';
import App from '../app/App';
import {AboutPage} from '../pages/about';
import {CoursesPage} from '../pages/courses';
import {CourseDetail} from '../pages/detail';
import {ContactPage} from '../pages/contact';
import {Login} from '../pages/auth/login';
import {Register} from '../pages/auth/register';
import {DashboardRoot} from '../pages/dashboard';
import Dashboard from '../pages/dashboard/dashboard';

export const RootRoute = () => {
	return (
		<main>
			<Header />
			<Outlet />
			<Footer />
		</main>
	);
};
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
	{
		path: '/dashboard',
		element: <DashboardRoot />,
		errorElement: <ErrorRoute />,
		children: [
			{
				path: '/dashboard',
				element: <Dashboard />,
			},
			{
				path: '/dashboard/profile',
				element: <h1>Profile from dashboard</h1>,
			},
			{
				path: '/dashboard/students',
				element: <h1>Students from dashboard</h1>,
			},
			{
				path: '/dashboard/courses',
				element: <h1>Courses from dashboard</h1>,
			},
			{
				path: '/dashboard/categories',
				element: <h1>Categories from dashboard</h1>,
			},
			{
				path: '/dashboard/settings',
				element: <h1>Settings from dashboard</h1>,
			},
		],
	},
]);

export const RouteProvider = () => {
	return <RouterProvider router={router} />;
};
