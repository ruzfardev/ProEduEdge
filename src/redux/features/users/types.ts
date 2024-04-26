export type UserType = {
	id: number;
	firstName: string;
	lastName: string;
	avatarUrl: string;
	email: string;
	password: string;
	role: string;
};
export type ILoginResponse = {
	token: string;
	user: UserType;
};

// This type will represent the sub-state for getting a single user by ID
export type IUserState = {
	data: UserType | null;
	isLoading: boolean;
	errors: string;
};

export type Student = {
	id: string;
	lastName: string;
	name: string;
};

export type IStudents = {
	data: Student[] | null;
	isLoading: boolean;
	errors: string;
};

// The users global state
export type UsersStateType = {
	user: IUserState;
	students: IStudents;
	isAuthenticated: boolean;
};

// (1)
export const USERS = 'users';
export type USERS = typeof USERS;

// (2)
export const LOGIN_USER = `${USERS}/loginUserAction`;
export const REGISTER_USER = `${USERS}/registerUserAction`;
export const GET_USER_BY_ID = `${USERS}/getUserAction`;
export const GET_STUDENTS = `${USERS}/getStudentsAction`;
// (3)
export type LOGIN_USER = typeof LOGIN_USER;
export type REGISTER_USER = typeof REGISTER_USER;
export type GET_USER_BY_ID = typeof GET_USER_BY_ID;
