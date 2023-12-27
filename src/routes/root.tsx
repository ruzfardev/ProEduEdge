import {Header} from '../components/header';
import {Footer} from '../components/footer';
import {Outlet} from 'react-router';

export const RootRoute = () => {
	return (
		<main>
			<Header />
			<Outlet />
			<Footer />
		</main>
	);
};
