import { all } from 'redux-saga/effects';

import fetchUsersSaga from './user/fetchUsers';
import fetchAdminUserSaga from './user/fetchAdminUser';
import updateUser from './user/updateUser';
import updateAdminUserSaga from './user/updateAdminUser';


export default function* rootSaga() {
  yield all([
    updateAdminUserSaga(),
    fetchUsersSaga(),
    fetchAdminUserSaga(),
    updateUser(),
  ]);
}
