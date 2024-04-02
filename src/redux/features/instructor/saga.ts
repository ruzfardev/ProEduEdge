import {call, put, takeLatest} from 'redux-saga/effects';
import {
	CourseWithContent,
	GET_COURSE_WITH_CONTENT,
	GET_MY_COURSES,
} from './types';
import {
	getCourseWithContentErrorAction,
	getCourseWithContentSuccessAction,
	getInstructorCoursesSuccessAction,
	getInstructorCoursesErrorAction,
} from './slice';
import {getCourseWithContentFx, getInstructorCoursesFx} from '@/api';
import {PayloadAction} from '@reduxjs/toolkit';

function* getInstructorCoursesSaga(action: PayloadAction<number>) {
	try {
		const response: CourseWithContent[] = yield call(
			getInstructorCoursesFx,
			action.payload
		);
		yield put(getInstructorCoursesSuccessAction(response));
	} catch (error) {
		yield put(getInstructorCoursesErrorAction(error));
	}
}
function* getCourseWithContentSaga(action: PayloadAction<number>) {
	try {
		const response: CourseWithContent = yield call(
			getCourseWithContentFx,
			action.payload
		);
		yield put(getCourseWithContentSuccessAction(response));
	} catch (error) {
		yield put(getCourseWithContentErrorAction(error));
	}
}

// watch saga
export function* watchgetInstructorCoursesSaga() {
	yield takeLatest(GET_MY_COURSES, getInstructorCoursesSaga);
}

export function* watchgetCourseWithContentSaga() {
	yield takeLatest(GET_COURSE_WITH_CONTENT, getCourseWithContentSaga);
}
