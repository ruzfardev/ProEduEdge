import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {INSTRUCTOR, InstructorDashboardState} from './types';

const instructorDashboardInitialState: InstructorDashboardState = {
	myCourses: {
		data: null,
		isLoading: false,
		errors: '',
	},
	selectedCourse: {
		data: null,
		isLoading: false,
		errors: '',
	},
	pending: false,
};

export const instructorDashboardSlice = createSlice({
	name: INSTRUCTOR,
	initialState: instructorDashboardInitialState,
	reducers: {
		getInstructorCoursesAction: (state, action: PayloadAction<number>) => {
			state.myCourses.isLoading = true;
		},
		getInstructorCoursesSuccessAction: (state, action) => {
			state.myCourses.isLoading = false;
			state.myCourses.data = action.payload;
		},
		getInstructorCoursesErrorAction: (state, action) => {
			state.myCourses.isLoading = false;
			state.myCourses.errors = action.payload;
		},
		getCourseWithContentAction: (state) => {
			state.pending = true;
			state.selectedCourse.isLoading = true;
		},
		getCourseWithContentSuccessAction: (state, action) => {
			state.pending = false;
			state.selectedCourse.isLoading = false;
			state.selectedCourse.data = action.payload;
		},
		getCourseWithContentErrorAction: (state, action) => {
			state.pending = false;
			state.selectedCourse.isLoading = false;
			state.selectedCourse.errors = action.payload;
		},
	},
});

export const {
	getInstructorCoursesAction,
	getInstructorCoursesSuccessAction,
	getInstructorCoursesErrorAction,
	getCourseWithContentAction,
	getCourseWithContentSuccessAction,
	getCourseWithContentErrorAction,
} = instructorDashboardSlice.actions;
export default instructorDashboardSlice.reducer;
