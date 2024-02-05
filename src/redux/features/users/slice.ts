import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {USERS, UsersStateType, UserType} from './types';
import {ILogin, IUser} from '@/redux/models';

const usersInitialState: UsersStateType = {
	user: {
		data: null,
		isLoading: false,
		errors: '',
	},
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
		},
		registerUserErrorAction: (
			state: UsersStateType,
			{payload: error}: PayloadAction<string>
		) => {
			state.user.isLoading = false;
			state.user.errors = error;
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
} = usersSlice.actions;
export default usersSlice.reducer;
