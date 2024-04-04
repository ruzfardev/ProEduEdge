import {useAppSelector} from '@/redux/hooks';
import {Navigate} from 'react-router';
import {ReactElement} from 'react';

export const ProtectedRoute = ({element}: {element: ReactElement}) => {
	const {isAuthenticated} = useAppSelector((state) => state.users);
	return isAuthenticated ? element : <Navigate to="/login" />;
};
