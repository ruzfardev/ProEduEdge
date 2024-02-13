import './App.css';
import {HomePage} from '../pages/home';
import {useAppDispatch} from '@/redux/hooks';
import {useEffect} from 'react';
import {getCategoriesAction} from '@/redux/features/course/slice';
function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getCategoriesAction());
	}, [dispatch]);
	return (
		<div className="App">
			<HomePage />
		</div>
	);
}

export default App;
