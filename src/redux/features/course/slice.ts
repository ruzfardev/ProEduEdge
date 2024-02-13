import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {COURSES, CoursesStateType, CreateCourse, ICourse} from './types';

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
		dateTime: '',
		isVerified: false,
	},
	pending: false,
};

export const coursesSlice = createSlice({
	name: COURSES,
	initialState: courseInitialState,
	reducers: {
		uploadBannerAction: (state, action: PayloadAction<{file: File, data: CreateCourse}>) => {
			state.pending = true;
			console.log("uploading banner");
		},
		uploadBannerSuccessAction: (state, action: PayloadAction<CreateCourse>) => {
			state.createCourse = action.payload;
			state.pending = false;
		},
		createCourseAction: (state, action: PayloadAction<CreateCourse>) => {
			state.pending = true;
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
	},
});
export const {
	getCategoriesAction,
	getCategoriesSuccessAction,
	getCategoriesErrorAction,
	createCourseAction,
	uploadBannerAction,
	uploadBannerSuccessAction,
} = coursesSlice.actions;
export default coursesSlice.reducer;
