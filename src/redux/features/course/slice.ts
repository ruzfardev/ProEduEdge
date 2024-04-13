import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Course, COURSES, CoursesStateType, CreateCourse} from './types';
import {FilePondInitialFile} from 'filepond';
import {ISection} from '@/pages/dashboard/dashboard/courses/addSection';
import {UserType} from '../users/types';

const courseInitialState: CoursesStateType = {
	courses: {
		data: null,
		isLoading: false,
		errors: '',
	},
	category: {
		data: null,
		isLoading: false,
		errors: '',
	},
	createCourse: {
		title: '',
		description: '',
		banner: '',
		price: 0,
		instructorId: 0,
		categoryId: 0,
		isVerified: false,
	},
	pending: false,
	courseCreationStatus: '',
	selectedCourse: {
		id: '',
		title: '',
		description: '',
		banner: '',
		price: 0,
		instructorId: 0,
		instructor: {} as UserType,
		categoryId: 0,
		isVerified: false,
		dateTime: '',
	},
	meetings: {
		data: null,
		isLoading: false,
		errors: '',
	},
};

export const coursesSlice = createSlice({
	name: COURSES,
	initialState: courseInitialState,
	reducers: {
		getAllCoursesAction: (state) => {
			state.courses.isLoading = true;
		},
		getAllCoursesSuccessAction: (state, action: PayloadAction<Course[]>) => {
			state.courses.isLoading = false;
			state.courses.data = action.payload;
		},
		getAllCoursesErrorAction: (state, action: PayloadAction<string>) => {
			state.courses.isLoading = false;
			state.courses.errors = action.payload;
		},
		selectCourseAction: (state, action: PayloadAction<Course>) => {
			state.selectedCourse = action.payload;
		},
		uploadBannerAction: (
			state,
			action: PayloadAction<{file: File; data: CreateCourse}>
		) => {
			state.pending = true;
			console.log('uploading banner');
		},
		uploadBannerSuccessAction: (state, action: PayloadAction<CreateCourse>) => {
			state.createCourse = action.payload;
			state.pending = false;
		},
		createCourseSuccessAction: (state, action: PayloadAction<CreateCourse>) => {
			state.createCourse = action.payload;
		},
		getCategoriesAction: (state) => {
			state.category.isLoading = true;
		},
		getCategoriesSuccessAction: (state, action: PayloadAction<any>) => {
			state.category.isLoading = false;
			state.category.data = action.payload;
		},
		getCategoriesErrorAction: (state, action: PayloadAction<string>) => {
			state.category.isLoading = false;
			state.category.errors = action.payload;
		},
		uploadCourseContentMediaAction: (
			state,
			action: PayloadAction<{
				sectionInfo: ISection;
				files: Array<FilePondInitialFile | File | Blob | string>;
			}>
		) => {
			state.pending = true;
			state.courseCreationStatus = 'STARTED';
		},
		createOrUpdateCourseSectionAction: (state, action: PayloadAction<any>) => {
			state.pending = true;
		},
		createOrUpdateCourseSectionSuccessAction: (state) => {
			state.pending = false;
			state.courseCreationStatus = 'SUCCESS';
		},
		getCourseByIdAction: (state, action: PayloadAction<string>) => {
			state.courses.isLoading = true;
		},
		getCourseByIdSuccessAction: (state, action: PayloadAction<Course>) => {
			state.courses.isLoading = false;
			state.selectedCourse = action.payload;
		},
		getMeetingsAction: (state) => {
			state.meetings.isLoading = true;
		},
		getMeetingsSuccessAction: (state, action: PayloadAction<any>) => {
			state.meetings.isLoading = false;
			state.meetings.data = action.payload;
		},
		getMeetingsErrorAction: (state, action: PayloadAction<string>) => {
			state.meetings.isLoading = false;
			state.meetings.errors = action.payload;
		},
	},
});
export const {
	getCategoriesAction,
	getCategoriesSuccessAction,
	getCategoriesErrorAction,
	createCourseSuccessAction,
	createOrUpdateCourseSectionAction,
	createOrUpdateCourseSectionSuccessAction,
	uploadBannerAction,
	uploadBannerSuccessAction,
	uploadCourseContentMediaAction,
	getAllCoursesAction,
	getAllCoursesSuccessAction,
	getAllCoursesErrorAction,
	selectCourseAction,
	getCourseByIdAction,
	getCourseByIdSuccessAction,
	getMeetingsAction,
	getMeetingsSuccessAction,
	getMeetingsErrorAction,
} = coursesSlice.actions;
export default coursesSlice.reducer;
