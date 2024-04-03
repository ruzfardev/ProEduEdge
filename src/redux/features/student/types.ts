import {CourseWithContent, ICourse} from '../course/types';

export interface ISelectedCourse {
	data: CourseWithContent | null;
	isLoading: boolean;
	errors: string;
}
// The users global state
export type StudentDashboardState = {
	myCourses: ICourse;
	selectedCourse: ISelectedCourse;
	pending: boolean;
};

export const STUDENT = 'student';
export type STUDENT = typeof STUDENT;

export const GET_MY_COURSES = `${STUDENT}/getMyCoursesAction`;
export const GET_COURSE_WITH_CONTENT = `${STUDENT}/getCourseWithContentAction`;
