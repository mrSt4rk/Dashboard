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

function updateUserRequest(action) {
  return axios
    .put(BASE_URL + '/users/edit/' + action.id,
      action,
      config
    )
    .then(response => response)
    .catch(error => ({ error }));
}

function* updateUser(action) {
  try {
    const userResponse = yield call(updateUserRequest, action.payload);
    yield put({ type: "UPDATE_USER_SUCCESS", userResponse });
  } catch (e) {
    yield put({ type: "UPDATE_USER_FAILURE", message: e.message });
  }
}

export default function* updateUserSaga() {
  yield takeLatest("UPDATE_USER", updateUser);
}
