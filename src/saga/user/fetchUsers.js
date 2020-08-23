import { call, put, throttle, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { BASE_URL } from '../../Helpers/Api';
import { createToken } from '../../Helpers/utils';


let config = {
  headers: {
    ...createToken(),
    Accept: 'application/json',
    "Content-Type": 'application/json'
  }
}

function fetchUsersRequest(action) {
  return axios
    .post(BASE_URL + '/users', action ? action.payload : null,
      config
    )
    .then(response => response)
    .catch(error => ({ error }));
}

function* fetchUsers(action) {
  try {
    const usersResponse = yield call(fetchUsersRequest, action);
    console.log('usersresponse', usersResponse);
    const results = usersResponse.data.data.items.map(row => ({
      key: row.id,
      Master: row.master_id,
      Affiliate: row.affiliate.name,
      Email: row.email,
      Name: row.name,
      ID: row.id,
      Mobile: row.mobile,
      Ballance: row.ballance,
      Status: row.status,
      verification: row.verification,
      language_id: row.language.id,
      user_level: row.user_type,
      created_at: row.created_at
    }))
    yield put({ type: "FETCH_USERS_SUCCESS", results });
  } catch (e) {
    yield put({ type: "FETCH_USERS_FAILURE", message: e.message });
  }
}


export default function* fetchUsersSaga() {
  yield takeLatest("FETCH_USERS", fetchUsers);
}
