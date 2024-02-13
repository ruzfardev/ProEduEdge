import { CoursesStateType } from "./features/course/types";
import userReducer from "./features/users/slice";
import courseReducer from "./features/course/slice";
import { UsersStateType } from "./features/users/types";

export type StateType = {
  users: UsersStateType;
  courses: CoursesStateType;
  
};

const rootReducers = {
  users: userReducer,
  courses: courseReducer,
};

export default rootReducers;