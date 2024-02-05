import {all, fork} from 'redux-saga/effects';
import {watchLoginUser, watchRegisterUser} from './features/users/saga';
const rootSaga = function* rootSaga() {
	yield all([fork(watchLoginUser), fork(watchRegisterUser)]);
};
export default rootSaga;
