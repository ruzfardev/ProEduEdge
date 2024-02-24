import './App.css';
import {HomePage} from '../pages/home';
import {useAppDispatch} from '@/redux/hooks';
import {useEffect} from 'react';
import {
	getAllCoursesAction,
	getCategoriesAction,
} from '@/redux/features/course/slice';
import {LocalStorageManager} from '@/lib/utils';
import {loginUserSuccessAction} from '@/redux/features/users/slice';
import {UserType} from '@/redux/features/users/types';
function App() {
	const dispatch = useAppDispatch();
	const l = LocalStorageManager.getInstance();
	useEffect(() => {
		if (l.getItem('user')) {
			const user: UserType = l.getItem('user');
			dispatch(loginUserSuccessAction(user));
		}
		dispatch(getCategoriesAction());
		dispatch(getAllCoursesAction());
	}, []);
	return (
		<div className="App">
			<HomePage />
		</div>
	);
}

export default App;
