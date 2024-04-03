import {
	addCourseSectionFx,
	createCourseFx,
	getAllCoursesFx,
	getCategoriesFx,
	uploadCourseBannerFx,
	uploadCourseRecoursesFx,
	uploadCourseRecoursesMultipleFx,
} from '@/api';
import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
	CREATE_OR_UPDATE_COURSE_SECTION,
	CategoryType,
	Course,
	CreateCourse,
	GET_ALL_COURSES,
	GET_CATEGORIES,
	ICourseSection,
	UPLOAD_BANNER,
	UPLOAD_BANNER_SUCCESS,
	UPLOAD_COURSE_CONTENT_MEDIA,
} from './types';
import {
	createCourseSuccessAction,
	createOrUpdateCourseSectionAction,
	createOrUpdateCourseSectionSuccessAction,
	getAllCoursesErrorAction,
	getAllCoursesSuccessAction,
	getCategoriesErrorAction,
	getCategoriesSuccessAction,
	uploadBannerSuccessAction,
} from './slice';
import {toast} from 'sonner';
import {PayloadAction} from '@reduxjs/toolkit';
import {IMediaResponse, IUser} from '@/redux/models';
import {FilePondInitialFile} from 'filepond';
import {ISection} from '@/pages/dashboard/dashboard/courses/addSection';
import {IUserState, UserType} from '@/redux/features/users/types';

function* getCategories() {
	try {
		const response: CategoryType[] = yield call(getCategoriesFx);
		yield put(getCategoriesSuccessAction(response));
	} catch (error: any) {
		yield put(getCategoriesErrorAction(error.message));
	}
}

function* uploadCourseBanner(
	action: PayloadAction<{file: File; data: CreateCourse}>
) {
	try {
		const response: IMediaResponse = yield call(
			uploadCourseBannerFx,
			action.payload.file
		);
		yield put(
			uploadBannerSuccessAction({
				...action.payload.data,
				banner: response.blob.uri,
			})
		);
	} catch (error: any) {
		toast.dismiss();
		toast.error(error.message);
	}
}

function* createCourse(action: PayloadAction<CreateCourse>) {
	try {
		const response: CreateCourse = yield call(createCourseFx, action.payload);
		yield put(createCourseSuccessAction(response));
	} catch (error: any) {}
}

function* uploadCourseMedia(
	action: PayloadAction<{
		sectionInfo: ISection;
		files: Array<FilePondInitialFile | File | Blob | string>;
	}>
) {
	try {
		const state: CreateCourse = yield select(
			(state) => state.courses.createCourse
		);
		const {data}: IUserState = yield select((state) => state.users.user);
		if (Array.isArray(action.payload.files)) {
			const res: IMediaResponse[] = yield call(
				uploadCourseRecoursesMultipleFx,
				action.payload.files
			);
			const resources = res.map((r) => {
				return {
					id: r.blob.name,
					fileType: r.blob.contentType,
					url: r.blob.uri,
				};
			});
			const section: ICourseSection = {
				// @ts-ignore
				courseId: state.id,
				// @ts-ignore
				ownerId: data?.id,
				modifiedAt: new Date().toISOString(),
				courseContent: {
					id: action.payload.sectionInfo.id,
					// @ts-ignore
					courseId: state.id,
					title: action.payload.sectionInfo.name,
					sectionName: action.payload.sectionInfo.name,
					description: action.payload.sectionInfo.description,
					content: action.payload.sectionInfo.content,
					status: 'active',
					resources: resources,
				},
			};
			yield put(createOrUpdateCourseSectionAction(section));
		} else {
			console.info(action.payload);
			const res: IMediaResponse[] = yield call(
				uploadCourseRecoursesFx,
				action.payload.files
			);
			const resources = res.map((r) => {
				return {
					id: r.blob.name,
					fileType: r.blob.contentType,
					url: r.blob.uri,
				};
			});

			const section: ICourseSection = {
				// @ts-ignore
				courseId: state.id,
				// @ts-ignore
				ownerId: data?.id,
				modifiedAt: new Date().toISOString(),
				courseContent: {
					id: action.payload.sectionInfo.id,
					// @ts-ignore
					courseId: state.id,
					title: action.payload.sectionInfo.name,
					sectionName: action.payload.sectionInfo.name,
					description: action.payload.sectionInfo.description,
					content: action.payload.sectionInfo.content,
					status: 'active',
					resources: resources,
				},
			};
			yield put(createOrUpdateCourseSectionAction(section));
		}
	} catch (error: any) {
		toast.dismiss();
		toast.error(error.message);
	}
}

function* createCourseSection(action: PayloadAction<ICourseSection>) {
	try {
		console.info(action.payload);
		yield call(addCourseSectionFx, action.payload);
		yield put(createOrUpdateCourseSectionSuccessAction());
	} catch (error: any) {
		toast.dismiss();
		toast.error(error.message);
	}
}

function* getAllCourses() {
	try {
		const response: Course[] = yield call(getAllCoursesFx);
		yield put(getAllCoursesSuccessAction(response));
	} catch (error: any) {
		yield put(getAllCoursesErrorAction(error.message));
	}
}

// watcher sagas

export function* watchCreateCourse() {
	yield takeLatest(UPLOAD_BANNER_SUCCESS, createCourse);
}

export function* watchUploadCourseBanner() {
	yield takeLatest(UPLOAD_BANNER, uploadCourseBanner);
}
export function* watchUploadCourseMedia() {
	yield takeLatest(UPLOAD_COURSE_CONTENT_MEDIA, uploadCourseMedia);
}

export function* watchGetCategories() {
	yield takeLatest(GET_CATEGORIES, getCategories);
}
export function* watchCreateOrUpdateCourseSection() {
	yield takeLatest(CREATE_OR_UPDATE_COURSE_SECTION, createCourseSection);
}
export function* watchGetAllCourses() {
	yield takeLatest(GET_ALL_COURSES, getAllCourses);
}
