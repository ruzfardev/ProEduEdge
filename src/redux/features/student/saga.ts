import { call, put, takeLatest } from "redux-saga/effects";
import { CourseWithContent, GET_MY_COURSES } from "./types";
import { getMyCoursesErrorAction, getMyCoursesSuccessAction } from "./slice";
import { getCourseWithContentFx } from "@/api";


function* getMyCoursesSaga() {
	try {
		const response: CourseWithContent[] = yield call(getCourseWithContentFx);
		yield put(getMyCoursesSuccessAction(response));
	} catch (error) {
		yield put(getMyCoursesErrorAction(error));
	}
}

// watch saga
export function* watchgetMyCoursesSaga() {
	yield takeLatest(GET_MY_COURSES, getMyCoursesSaga);
}