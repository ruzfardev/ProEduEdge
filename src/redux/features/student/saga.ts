import {call, put, takeLatest} from 'redux-saga/effects';
import {
	GET_COURSE_STATS,
	GET_COURSE_WITH_CONTENT,
	GET_MY_COURSES,
	StudentCourseStat,
} from './types';
import {
	getCourseStatsErrorAction,
	getCourseStatsSuccessAction,
	getCourseWithContentErrorAction,
	getCourseWithContentSuccessAction,
	getMyCoursesErrorAction,
	getMyCoursesSuccessAction,
} from './slice';
import {
	getCourseWithContentFx,
	getMyCoursesFx,
	getStudentCourseStatsFx,
} from '@/api';
import {PayloadAction} from '@reduxjs/toolkit';
import {CourseWithContent} from '@/redux/features/course/types';

function* getMyCoursesSaga(action: PayloadAction<number>) {
	try {
		const response: CourseWithContent[] = yield call(getMyCoursesFx);
		yield put(getMyCoursesSuccessAction(response));
	} catch (error) {
		yield put(getMyCoursesErrorAction(error));
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
function* getCourseStatsSaga() {
	try {
		const response: StudentCourseStat[] = yield call(getStudentCourseStatsFx);
		yield put(getCourseStatsSuccessAction(response));
	} catch (error) {
		yield put(getCourseStatsErrorAction(error));
	}
}

// watch saga
export function* watchgetMyCoursesSaga() {
	yield takeLatest(GET_MY_COURSES, getMyCoursesSaga);
}

export function* watchgetCourseWithContentSaga() {
	yield takeLatest(GET_COURSE_WITH_CONTENT, getCourseWithContentSaga);
}
export function* watchGetCourseStatsSaga() {
	yield takeLatest(GET_COURSE_STATS, getCourseStatsSaga);
}
