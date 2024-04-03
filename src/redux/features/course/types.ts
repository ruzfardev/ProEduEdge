import {UserType} from '../users/types';
export type Course = {
	id: string;
	title: string;
	description: string;
	banner: string;
	price: number;
	instructorId: number;
	instructor: UserType;
	categoryId: number;
	dateTime: string;
	isVerified: boolean;
};

export type CreateCourse = {
	id?: string;
	title: string;
	description: string;
	banner: string;
	price: number;
	instructorId: number;
	categoryId: number;
	isVerified: boolean;
	createdAt?: string;
};
export type CategoryType = {
	id: string;
	name: string;
};

// This type will represent the sub-state for getting a single user by ID
export type ICategoryState = {
	data: CategoryType[] | null;
	isLoading: boolean;
	errors: string;
};
export type CourseContent = {
	id: string;
	courseId: number;
	sectionName: string;
	title: string;
	status: string;
	content: string;
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
export type ICourse = {
	data: Course[] | null;
	isLoading: boolean;
	errors: string;
};
export type ICourseSection = {
	courseId: number;
	ownerId: number;
	modifiedAt: string;
	courseContent: CourseContent;
};
// The users global state
export type CoursesStateType = {
	courses: ICourse;
	selectedCourse: Course | null;
	category: ICategoryState;
	createCourse: CreateCourse;
	pending: boolean;
	courseCreationStatus: string;
	// Later, we can add other sub-states like:
	// list,
	// create,
	// update,
	// remove
};

export const COURSES = 'courses';
export type COURSES = typeof COURSES;

export const GET_COURSES = `${COURSES}/getCoursesAction`;
export const GET_CATEGORIES = `${COURSES}/getCategoriesAction`;
export const CREATE_COURSE = `${COURSES}/createCourseAction`;
export const GET_ALL_COURSES = `${COURSES}/getAllCoursesAction`;
export const GET_ALL_COURSES_SUCCESS = `${COURSES}/getAllCoursesSuccessAction`;
export const GET_ALL_COURSES_ERROR = `${COURSES}/getAllCoursesErrorAction`;
export const SELECT_COURSE = `${COURSES}/selectCourseAction`;

export const GET_COURSE_BY_ID = `${COURSES}/getCourseByIdAction`;

export const UPLOAD_BANNER = `${COURSES}/uploadBannerAction`;
export const UPLOAD_BANNER_SUCCESS = `${COURSES}/uploadBannerSuccessAction`;
export const UPLOAD_COURSE_CONTENT_MEDIA = `${COURSES}/uploadCourseContentMediaAction`;
export const UPLOAD_COURSE_CONTENT_MEDIA_SUCCESS = `${COURSES}/uploadCourseContentMediaSuccessAction`;
export const UPLOAD_COURSE_CONTENT_MEDIA_ERROR = `${COURSES}/uploadCourseContentMediaErrorAction`;
export const CREATE_OR_UPDATE_COURSE_SECTION = `${COURSES}/createOrUpdateCourseSectionAction`;
export type GET_CATEGORIES = typeof GET_CATEGORIES;
