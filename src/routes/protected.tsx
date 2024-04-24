import {useAppSelector} from '@/redux/hooks';
import {Navigate} from 'react-router';
import {ReactElement} from 'react';
import {LocalStorageManager} from '@/lib/utils';

export const ProtectedRoute = ({element}: {element: ReactElement}) => {
	const l = LocalStorageManager.getInstance();
	const isAuthenticated = !!l.getItem('token');
	return isAuthenticated ? element : <Navigate to="/login" />;
};
