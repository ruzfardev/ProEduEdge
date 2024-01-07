import React from 'react';
import ReactDOM from 'react-dom/client';
import {NextUIProvider} from '@nextui-org/react';
import App from './app/App.tsx';
import {registerPlugin} from 'react-filepond';

// Import FilePond styles
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

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
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import {CourseDetail} from './pages/detail';
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
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
