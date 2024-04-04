import {Header} from '@/components/header';
import {Footer} from '@/components/footer';

import {Outlet, RouterProvider} from 'react-router';
import {createBrowserRouter} from 'react-router-dom';
import {ErrorRoute} from './error';
import App from '../app/App';
import {AboutPage} from '@/pages/about';
import {CoursesPage} from '@/pages/courses';
import {CourseDetail} from '@/pages/detail';
import {ContactPage} from '@/pages/contact';
import {Login} from '@/pages/auth/login';
import {Register} from '@/pages/auth/register';
import {DashboardRoot} from '@/pages/dashboard';
import Dashboard from '../pages/dashboard/dashboard';
import {Profile} from '@/pages/dashboard/dashboard/profile';
import {StudentList} from '@/pages/dashboard/dashboard/students';
import {ManageCourses} from '@/pages/dashboard/dashboard/courses';
import {AddCourse} from '@/pages/dashboard/dashboard/courses/addCourse';
import {Toaster} from 'sonner';
import {DiscussionChat} from '@/pages/dashboard/dashboard/discussions';
import {MeetingRoot} from '@/pages/dashboard/dashboard/live-streams';
import {SDashboardRoot} from '@/pages/dashboard/student';
import {StudentDashboard} from '@/pages/dashboard/student/dashboard';
import {MyCourses} from '@/pages/dashboard/student/my-courses';
import {MyCourse} from '@/pages/dashboard/student/my-courses/me-course';
import {CourseDetailView} from '@/pages/dashboard/dashboard/courses/detail/course-detail-view.tsx';

export const RootRoute = () => {
	return (
		<main>
			<Toaster />
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
				path: '/dashboard/me',
				element: <SDashboardRoot />,
				children: [
					{
						path: '/dashboard/me',
						element: <StudentDashboard />,
					},
					{
						path: '/dashboard/me/courses/:id',
						element: <MyCourse />,
					},
					{
						path: '/dashboard/me/courses',
						element: <MyCourses />,
					},
				],
			},
			{
				path: '/dashboard/profile',
				element: <Profile />,
			},
			{
				path: '/dashboard/students',
				element: <StudentList />,
			},
			{
				path: '/dashboard/courses',
				element: <ManageCourses />,
			},
			{
				path: '/dashboard/courses/add',
				element: <AddCourse />,
			},
			{
				path: '/dashboard/courses/:id',
				element: <CourseDetailView />,
			},
			{
				path: '/dashboard/categories',
				element: <h1>Categories from dashboard</h1>,
			},
			{
				path: '/dashboard/settings',
				element: <h1>Settings from dashboard</h1>,
			},
			{
				path: '/dashboard/discussions',
				element: <DiscussionChat />,
			},
			{
				path: '/dashboard/livestream',
				element: <MeetingRoot />,
			},
		],
	},
]);

export const RouteProvider = () => {
	return <RouterProvider router={router} />;
};
