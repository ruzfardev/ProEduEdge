import { call, put, takeLatest } from "redux-saga/effects";
import { CourseWithContent, GET_COURSE_WITH_CONTENT, GET_MY_COURSES } from "./types";
import { getMyCoursesErrorAction, getMyCoursesSuccessAction } from "./slice";
import { getCourseWithContentFx, getMyCoursesFx } from "@/api";
import { PayloadAction } from "@reduxjs/toolkit";


function* getMyCoursesSaga(action: PayloadAction<number>) {
	try {
		const response: CourseWithContent[] = yield call(getMyCoursesFx, action.payload);
		yield put(getMyCoursesSuccessAction(response));
	} catch (error) {
		yield put(getMyCoursesErrorAction(error));
	}
}
function* getCourseWithContentSaga(action: PayloadAction<number>) {
	try {
		const response: CourseWithContent = yield call(getCourseWithContentFx, action.payload);
		yield put(getMyCoursesSuccessAction(response));
	} catch (error) {
		yield put(getMyCoursesErrorAction(error));
	}
}

// watch saga
export function* watchgetMyCoursesSaga() {
	yield takeLatest(GET_MY_COURSES, getMyCoursesSaga);
}

export function* watchgetCourseWithContentSaga() {
	yield takeLatest(GET_COURSE_WITH_CONTENT, getCourseWithContentSaga);
}