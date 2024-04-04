import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {USERS, UsersStateType, UserType} from './types';
import {ILogin, IUser} from '@/redux/models';

const usersInitialState: UsersStateType = {
	user: {
		data: null,
		isLoading: false,
		errors: '',
	},
	isAuthenticated: false,
};

export const usersSlice = createSlice({
	name: USERS,
	initialState: usersInitialState,
	reducers: {
		loginUserAction: (
			state: UsersStateType,
			{payload: ILogin}: PayloadAction<ILogin>
		) => {
			state.user.isLoading = true;
			state.user.errors = '';
		},
		loginUserSuccessAction: (
			state: UsersStateType,
			{payload: user}: PayloadAction<UserType>
		) => {
			state.isAuthenticated = true;
			state.user.isLoading = false;
			state.user.data = user;
		},
		loginUserErrorAction: (
			state: UsersStateType,
			{payload: error}: PayloadAction<string>
		) => {
			state.user.isLoading = false;
			state.user.errors = error;
		},
		registerUserAction: (
			state: UsersStateType,
			{payload: IUser}: PayloadAction<IUser>
		) => {
			state.user.isLoading = true;
			state.user.errors = '';
		},
		registerUserSuccessAction: (
			state: UsersStateType,
			{payload: user}: PayloadAction<UserType>
		) => {
			state.user.isLoading = false;
			state.user.data = user;
			state.isAuthenticated = true;
		},
		registerUserErrorAction: (
			state: UsersStateType,
			{payload: error}: PayloadAction<string>
		) => {
			state.user.isLoading = false;
			state.user.errors = error;
		},
		logOutAction: (state: UsersStateType) => {
			state.user.data = null;
			state.isAuthenticated = false;
		},
	},
});
export const {
	loginUserAction,
	loginUserSuccessAction,
	loginUserErrorAction,
	registerUserAction,
	registerUserSuccessAction,
	registerUserErrorAction,
	logOutAction,
} = usersSlice.actions;
export default usersSlice.reducer;
