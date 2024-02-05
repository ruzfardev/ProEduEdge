import userReducer from "./features/users/slice";
import { UsersStateType } from "./features/users/types";

export type StateType = {
  users: UsersStateType;
};

const rootReducers = {
  users: userReducer,
};

export default rootReducers;