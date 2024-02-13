import {all, fork} from 'redux-saga/effects';
import {watchLoginUser, watchRegisterUser} from './features/users/saga';
import { watchGetCategories, watchUploadCourseBanner, watchCreateCourse } from './features/course/saga';
const rootSaga = function* rootSaga() {
	yield all([fork(watchLoginUser), fork(watchRegisterUser), fork(watchGetCategories), fork(watchUploadCourseBanner), fork(watchCreateCourse)]);
};
export default rootSaga;
