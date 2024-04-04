export type UserType = {
	id: number;
	firstName: string;
	lastName: string;
	avatarUrl: string;
	email: string;
	password: string;
	role: string;
};

// This type will represent the sub-state for getting a single user by ID
export type IUserState = {
	data: UserType | null;
	isLoading: boolean;
	errors: string;
};

// The users global state
export type UsersStateType = {
	user: IUserState;
	isAuthenticated: boolean;
};

// (1)
export const USERS = 'users';
export type USERS = typeof USERS;

// (2)
export const LOGIN_USER = `${USERS}/loginUserAction`;
export const REGISTER_USER = `${USERS}/registerUserAction`;
export const GET_USER_BY_ID = `${USERS}/getUserAction`;
// (3)
export type LOGIN_USER = typeof LOGIN_USER;
export type REGISTER_USER = typeof REGISTER_USER;
export type GET_USER_BY_ID = typeof GET_USER_BY_ID;
