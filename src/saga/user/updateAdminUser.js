import { call, put, throttle, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { BASE_URL } from '../../Helpers/Api'
import { createToken } from '../../Helpers/utils';


let config = {
  headers: {
    ...createToken(),
    Accept: 'application/json',
    "Content-Type": 'application/json'
  }
}

function updateAdminUserRequest(action) {
  return axios
    .post(BASE_URL + '/auth/update',
      action,
      config
    )
    .then(response => response)
    .catch(error => ({ error }));
}

function* updateAdminUser(action) {
  try {
    const userResponse = yield call(updateAdminUserRequest, action.payload);
    yield put({ type: "UPDATE_ADMIN_USER_SUCCESS", userResponse });
  } catch (e) {
    yield put({ type: "UPDATE_ADMIN_USER_FAILURE", message: e.message });
  }
}

export default function* updateAdminUserSaga() {
  yield takeLatest("UPDATE_ADMIN_USER", updateAdminUser);
}
