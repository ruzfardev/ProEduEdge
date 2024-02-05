import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeLatest} from 'redux-saga/effects';
import {UserType, LOGIN_USER, REGISTER_USER} from './types';
import {loginUserErrorAction, loginUserSuccessAction, registerUserErrorAction, registerUserSuccessAction} from './slice';
import {ILogin, IUser} from '@/redux/models';
import {login, register} from '@/api';

function* loginUser(action: PayloadAction<ILogin>) {
	try {
		const response: UserType = yield call(login, action.payload);
		yield put(loginUserSuccessAction(response));
	} catch (error) {
		yield put(loginUserErrorAction(error.message));
	}
}

function* registerUser(action: PayloadAction<IUser>) {
	try {
		const response: UserType = yield call(register, action.payload);
		yield put(registerUserSuccessAction(response));
	} catch (error) {
		yield put(registerUserErrorAction(error.message));
	}
}

export function* watchLoginUser() {
	yield takeLatest(LOGIN_USER, loginUser);
}

export function* watchRegisterUser() {
	yield takeLatest(REGISTER_USER, registerUser);
}
