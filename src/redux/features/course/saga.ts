import { getCategoriesFx, uploadCourseBannerFx } from '@/api';
import {call, put, takeLatest} from 'redux-saga/effects';
import { CategoryType, CreateCourse, GET_CATEGORIES, UPLOAD_BANNER, UPLOAD_BANNER_SUCCESS } from './types';
import { getCategoriesErrorAction, getCategoriesSuccessAction, uploadBannerSuccessAction } from './slice';
import { toast } from 'sonner';
import { PayloadAction } from '@reduxjs/toolkit';
import { IMediaResponse } from '@/redux/models';

function* getCategories() {
	try {
		const response: CategoryType[] = yield call(getCategoriesFx);
		yield put(getCategoriesSuccessAction(response));
	} catch (error: any) {
		yield put(getCategoriesErrorAction(error.message));
	}
}

function* uploadCourseBanner(action: PayloadAction<{file: File, data: CreateCourse}>) {
	try {
		const response: IMediaResponse = yield call(uploadCourseBannerFx, action.payload.file);
		yield put(uploadBannerSuccessAction({
			...action.payload.data,
			banner: response.blob.uri,
		}));
	} catch (error: any) {
		toast.error(error.message);
	}
}

function* createCourse(action: PayloadAction<CreateCourse>) {
	console.log(action.payload);
}

export function* watchCreateCourse() {
	yield takeLatest(UPLOAD_BANNER_SUCCESS, createCourse);
}

export function* watchUploadCourseBanner() {
	yield takeLatest(UPLOAD_BANNER, uploadCourseBanner);
}

export function* watchGetCategories() {
	yield takeLatest(GET_CATEGORIES, getCategories);
}
