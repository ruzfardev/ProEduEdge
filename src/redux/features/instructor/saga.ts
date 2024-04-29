import {call, put, takeLatest} from 'redux-saga/effects';
import {
	CourseWithContent,
	GET_COURSE_WITH_CONTENT,
	GET_INSTRUCTOR_DASHBOARD,
	GET_MY_COURSES,
	InstructorDashboardStat,
} from './types';
import {
	getCourseWithContentErrorAction,
	getCourseWithContentSuccessAction,
	getInstructorCoursesSuccessAction,
	getInstructorCoursesErrorAction,
	getInstructorDashboardSuccessAction,
	getInstructorDashboardErrorAction,
} from './slice';
import {
	getCourseWithContentFx,
	getInstructorCoursesFx,
	getInstructorDashboardStatsFx,
} from '@/api';
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

function* getInstructorDashboardSaga() {
	try {
		const response: InstructorDashboardStat = yield call(
			getInstructorDashboardStatsFx
		);
		yield put(getInstructorDashboardSuccessAction(response));
	} catch (error) {
		yield put(getInstructorDashboardErrorAction(error));
	}
}

// watch saga
export function* watchgetInstructorCoursesSaga() {
	yield takeLatest(GET_MY_COURSES, getInstructorCoursesSaga);
}

export function* watchgetCourseWithContentSaga() {
	yield takeLatest(GET_COURSE_WITH_CONTENT, getCourseWithContentSaga);
}
export function* watchGetInstructorDashboardSaga() {
	yield takeLatest(GET_INSTRUCTOR_DASHBOARD, getInstructorDashboardSaga);
}
