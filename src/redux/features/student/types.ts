import {CourseWithContent, ICourse} from '../course/types';

export interface ISelectedCourse {
	data: CourseWithContent | null;
	isLoading: boolean;
	errors: string;
}
export type StudentCourseStat = {
	value: number;
	name: string;
};
export interface IStudentCourseStats {
	data: StudentCourseStat[] | null;
	isStatLoading: boolean;
	errors: string;
}
// The users global state
export type StudentDashboardState = {
	myCourses: ICourse;
	selectedCourse: ISelectedCourse;
	courseStats: IStudentCourseStats;
	pending: boolean;
};

export const STUDENT = 'student';
export type STUDENT = typeof STUDENT;

export const GET_MY_COURSES = `${STUDENT}/getMyCoursesAction`;
export const GET_COURSE_WITH_CONTENT = `${STUDENT}/getCourseWithContentAction`;
export const GET_COURSE_STATS = `${STUDENT}/getCourseStatsAction`;
