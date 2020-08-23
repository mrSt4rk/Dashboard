import {
  FETCH_USER,
  FETCH_ADMIN_USER,
  FETCH_USERS,
  UPDATE_USER,
  UPDATE_ADMIN_USER,
} from '../names'

export function usersList(payload) {
  return {
    type: FETCH_USERS,
    payload
  }
}

export function fetchUser(id) {
  return {
    type: FETCH_USER,
    id
  }
}

export function fetchAdminUser() {
  return {
    type: FETCH_ADMIN_USER
  }
}

export function updateAdminUser(payload) {
  return {
    type: UPDATE_ADMIN_USER,
    payload
  }
}

export function updateSingleUser(id, payload) {
  return {
    type: UPDATE_USER,
    payload,
    id
  }
}

