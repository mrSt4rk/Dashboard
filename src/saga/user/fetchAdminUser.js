import { call, put, throttle, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
import { BASE_URL } from '../../Helpers/Api';
import { createToken } from '../../Helpers/utils';

function fetchAdminUserRequest(config) {
  return axios
    .post(BASE_URL + '/auth/user', null,
      config
    )
    .then(response => response)
    .catch(error => ({ error }));
}

function* fetchAdminUser(action) {
  try {
    let config = {
      headers: {
        ...createToken(),
        Accept: 'application/json',
        "Content-Type": 'application/json'
      }
    }

    const usersResponse = yield call(fetchAdminUserRequest, config);
    const results = {
      key: usersResponse.data.data.id,
      name: usersResponse.data.data.name,
      Id: usersResponse.data.data.id,
    };
    yield put({ type: "FETCH_ADMIN_USER_SUCCESS", results });
  } catch (e) {
    yield put({ type: "FETCH_ADMIN_USER_FAILURE", message: e.message });
  }
}


export default function* fetchAdminUserSaga() {
  yield takeLatest("FETCH_ADMIN_USER", fetchAdminUser);
}
