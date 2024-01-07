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
]);

export const RouteProvider = () => {
	return <RouterProvider router={router} />;
};
