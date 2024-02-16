import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeLatest} from 'redux-saga/effects';
import {UserType, LOGIN_USER, REGISTER_USER} from './types';
import {loginUserErrorAction, loginUserSuccessAction, registerUserErrorAction, registerUserSuccessAction} from './slice';
import {ILogin, IUser} from '@/redux/models';
import {login, register} from '@/api';
import { LocalStorageManager } from '@/lib/utils';

function* loginUser(action: PayloadAction<ILogin>) {
	try {
		const l = LocalStorageManager.getInstance();
		const response: UserType = yield call(login, action.payload);
		l.setItem('user', JSON.stringify(response));
		yield put(loginUserSuccessAction(response));
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

export function* watchLoginUser() {
	yield takeLatest(LOGIN_USER, loginUser);
}

export function* watchRegisterUser() {
	yield takeLatest(REGISTER_USER, registerUser);
}
