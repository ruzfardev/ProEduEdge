import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {STUDENT, StudentDashboardState} from './types';

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
	courseStats: {
		data: null,
		isStatLoading: false,
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
		getCourseStatsAction: (state) => {
			state.courseStats.isStatLoading = true;
		},
		getCourseStatsSuccessAction: (state, action) => {
			state.courseStats.isStatLoading = false;
			state.courseStats.data = action.payload;
		},
		getCourseStatsErrorAction: (state, action) => {
			state.courseStats.isStatLoading = false;
			state.courseStats.errors = action.payload;
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
	getCourseStatsAction,
	getCourseStatsSuccessAction,
	getCourseStatsErrorAction,
} = studentDashboardSlice.actions;
export default studentDashboardSlice.reducer;
