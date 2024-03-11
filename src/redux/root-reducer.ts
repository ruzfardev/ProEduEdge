import { CoursesStateType } from "./features/course/types";
import userReducer from "./features/users/slice";
import courseReducer from "./features/course/slice";
import studentReducer from "./features/student/slice";
import { UsersStateType } from "./features/users/types";
import { StudentDashboardState } from "./features/student/types";

export type StateType = {
  users: UsersStateType;
  courses: CoursesStateType;
  student: StudentDashboardState
};

const rootReducers = {
  users: userReducer,
  courses: courseReducer,
  student: studentReducer,
};

export default rootReducers;