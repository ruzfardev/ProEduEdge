export type Course = {
    id: string;
    title: string;
    description: string;
    banner: string;
    price: number;
    instructorId: number;
    categoryId: number;
    dateTime: string;
    isVerified: boolean;
}
export type CreateCourse = {
  title: string;
  description: string;
  banner: string;
  price: number;
  instructorId: number;
  categoryId: number;
  dateTime: string;
  isVerified: boolean;
}
export type CategoryType = {
    id: string;
    name: string;
  }
  
  // This type will represent the sub-state for getting a single user by ID
  export type ICategoryState = {
    data: CategoryType[] | null;
    isLoading: boolean;
    errors: string;
  }

  export type ICourse = {
    data: Course[] | null;
    isLoading: boolean;
    errors: string;
  }
  
  // The users global state
  export type CoursesStateType = {
    courses: ICourse;
    category: ICategoryState;
    createCourse: CreateCourse;
    pending: boolean;
    // Later, we can add other sub-states like:
    // list,
    // create,
    // update,
    // remove
  }

  export const COURSES = 'courses';
  export type COURSES = typeof COURSES;

  export const GET_COURSES = `${COURSES}/getCoursesAction`;
  export const GET_CATEGORIES = `${COURSES}/getCategoriesAction`;
  export const CREATE_COURSE = `${COURSES}/createCourseAction`;
  export const UPLOAD_BANNER = `${COURSES}/uploadBannerAction`;
  export const UPLOAD_BANNER_SUCCESS = `${COURSES}/uploadBannerSuccessAction`;
  export type GET_CATEGORIES = typeof GET_CATEGORIES;

