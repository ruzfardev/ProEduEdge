import { createSlice } from "@reduxjs/toolkit";
import { STUDENT, StudentDashboardState } from "./types";

const studentDashboardInitialState: StudentDashboardState = {
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

export const studentDashboardSlice = createSlice({
	name: STUDENT,
	initialState: studentDashboardInitialState,
	reducers: {
		getMyCoursesAction: (state) => {
			state.myCourses.isLoading = true;
		},
		getMyCoursesSuccessAction: (state, action) => {
			state.myCourses.isLoading = false;
			state.myCourses.data = action.payload;
		},
		getMyCoursesErrorAction: (state, action) => {
			state.myCourses.isLoading = false;
			state.myCourses.errors = action.payload;
		},
		getCourseWithContentAction: (state) => {
			state.pending = true;
		},
		getCourseWithContentSuccessAction: (state, action) => {
			state.pending = false;
			state.selectedCourse = action.payload;
		},
		getCourseWithContentErrorAction: (state, action) => {
			state.pending = false;
			state.myCourses.errors = action.payload;
		},
	},
});

export const {
	getMyCoursesAction,
	getMyCoursesSuccessAction,
	getMyCoursesErrorAction,
	getCourseWithContentAction,
	getCourseWithContentSuccessAction,
	getCourseWithContentErrorAction,
} = studentDashboardSlice.actions;
export default studentDashboardSlice.reducer;