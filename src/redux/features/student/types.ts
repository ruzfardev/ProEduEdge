import { Course, ICourse } from "../course/types";

export type CourseContent = {
  courseId: number;
  sectionName: string;
  title: string;
  status: string;
  resources: {
    id: string;
    fileType: string;
    url: string;
  }[]
}
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
}
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
  }


  export const STUDENT = 'student';
  export type STUDENT = typeof STUDENT;

  export const GET_MY_COURSES = `${STUDENT}/getMyCoursesAction`;
  export const GET_COURSE_WITH_CONTENT = `${STUDENT}/getCourseWithContentAction`;