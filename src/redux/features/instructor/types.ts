export type CourseStat = {
	id: number;
	title: string;
	description: string;
	banner: string;
	price: number;
	instructorId: number;
	categoryId: number;
	dateTime: string;
	isVerified: boolean;
	rating: number;
	totalStudents: number;
	totalEarning: number;
};

export type ICourse = {
	data: CourseStat[] | null;
	isLoading: boolean;
	errors: string;
};

export type CourseContent = {
	courseId: number;
	sectionName: string;
	title: string;
	status: string;
	resources: {
		id: string;
		fileType: string;
		url: string;
	}[];
};
export type CourseWithContent = {
	id: string;
	title: string;
	description: string;
	banner: string;
	price: number;
	instructorId: number;
	categoryId: number;
	dateTime: string;
	isVerified: boolean;
	contents: CourseContent[];
};
export interface ISelectedCourse {
	data: CourseWithContent | null;
	isLoading: boolean;
	errors: string;
}
// The users global state
export type InstructorDashboardState = {
	myCourses: ICourse;
	selectedCourse: ISelectedCourse;
	pending: boolean;
};

export const INSTRUCTOR = 'instructor';
export type INSTRUCTOR = typeof INSTRUCTOR;

export const GET_MY_COURSES = `${INSTRUCTOR}/getInstructorCoursesAction`;
export const GET_COURSE_WITH_CONTENT = `${INSTRUCTOR}/getCourseWithContentAction`;
