import {all, fork} from 'redux-saga/effects';
import {watchLoginUser, watchRegisterUser} from './features/users/saga';
import {
	watchGetCategories,
	watchUploadCourseBanner,
	watchCreateCourse,
	watchUploadCourseMedia,
	watchCreateOrUpdateCourseSection,
	watchGetAllCourses,
	watchGetCourseById,
} from './features/course/saga';
import {
	watchgetCourseWithContentSaga,
	watchgetMyCoursesSaga,
} from './features/student/saga';
import {
	watchgetInstructorCoursesSaga,
	watchgetCourseWithContentSaga as watchgetInstructorCourseWithContentSaga,
} from '@/redux/features/instructor/saga.ts';
const rootSaga = function* rootSaga() {
	yield all([
		fork(watchLoginUser),
		fork(watchRegisterUser),
		fork(watchGetAllCourses),
		fork(watchGetCategories),
		fork(watchUploadCourseBanner),
		fork(watchCreateCourse),
		fork(watchUploadCourseMedia),
		fork(watchCreateOrUpdateCourseSection),
		fork(watchgetMyCoursesSaga),
		fork(watchgetCourseWithContentSaga),
		fork(watchgetInstructorCoursesSaga),
		fork(watchgetInstructorCourseWithContentSaga),
		fork(watchGetCourseById),
	]);
};
export default rootSaga;
