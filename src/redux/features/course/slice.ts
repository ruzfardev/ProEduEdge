import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Course, COURSES, CoursesStateType, CreateCourse, ICourse} from './types';
import { FilePondInitialFile } from 'filepond';
import { ISection } from '@/pages/dashboard/dashboard/courses/addSection';
import { UserType } from '../users/types';

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
	selectedCourse: {
		id: "",
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
		uploadBannerAction: (state, action: PayloadAction<{file: File, data: CreateCourse}>) => {
			state.pending = true;
			console.log("uploading banner");
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
		uploadCourseContentMediaAction: (state, action: PayloadAction<{sectionInfo: ISection, files: Array<FilePondInitialFile | File | Blob | string>}>) => {
			state.pending = true;
		},
		uploadCourseContentMediaSuccessAction: (state, action: PayloadAction<File>) => {
			state.pending = false;
		},
		uploadCourseContentMediaErrorAction: (state, action: PayloadAction<string>) => {
			state.pending = false;
		},
		createOrUpdateCourseSectionAction: (state, action: PayloadAction<any>) => {
			state.pending = true;
		},
		createOrUpdateCourseSectionSuccessAction: (state) => {
			state.pending = false;
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
	uploadCourseContentMediaSuccessAction,
	uploadCourseContentMediaErrorAction,
	getAllCoursesAction,
	getAllCoursesSuccessAction,
	getAllCoursesErrorAction,
	selectCourseAction,
} = coursesSlice.actions;
export default coursesSlice.reducer;
