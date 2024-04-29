import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeLatest} from 'redux-saga/effects';
import {
	UserType,
	LOGIN_USER,
	REGISTER_USER,
	ILoginResponse,
	Student,
	GET_STUDENTS,
} from './types';
import {
	getStudentsErrorAction,
	getStudentsSuccessAction,
	loginUserErrorAction,
	loginUserSuccessAction,
	registerUserErrorAction,
	registerUserSuccessAction,
} from './slice';
import {ILogin, IUser} from '@/redux/models';
import {getEnrolledStudentsFx, login, register} from '@/api';
import {LocalStorageManager} from '@/lib/utils';

function* loginUser(action: PayloadAction<ILogin>) {
	try {
		const l = LocalStorageManager.getInstance();
		const response: ILoginResponse = yield call(login, action.payload);
		const {user, token} = response;
		l.setItem('user', JSON.stringify(user));
		l.setItem('token', JSON.stringify(token));
		yield put(loginUserSuccessAction(user));
	} catch (error: any) {
		yield put(loginUserErrorAction(error.message));
	}
}

function* registerUser(action: PayloadAction<IUser>) {
	try {
		const l = LocalStorageManager.getInstance();
		const response: UserType = yield call(register, action.payload);
		l.setItem('user', JSON.stringify(response));
		yield put(registerUserSuccessAction(response));
	} catch (error: any) {
		yield put(registerUserErrorAction(error.message));
	}
}

function* getStudents() {
	try {
		const response: Student[] = yield call(getEnrolledStudentsFx);
		yield put(getStudentsSuccessAction(response));
	} catch (error: any) {
		yield put(getStudentsErrorAction(error.message));
	}
}

export function* watchLoginUser() {
	yield takeLatest(LOGIN_USER, loginUser);
}

export function* watchRegisterUser() {
	yield takeLatest(REGISTER_USER, registerUser);
}

export function* watchGetStudents() {
	yield takeLatest(GET_STUDENTS, getStudents);
}
