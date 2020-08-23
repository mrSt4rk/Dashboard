import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_ADMIN_USER,
  FETCH_ADMIN_USER_SUCCESS,
  FETCH_ADMIN_USER_FAILURE,
  UPDATE_ADMIN_USER,
  UPDATE_ADMIN_USER_SUCCESS,
  UPDATE_ADMIN_USER_FAILURE,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from '../../actions/names';


const user = (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        loading: true,
        error: false
      }
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.results,
        loading: false,
        error: false
      }
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }
    case FETCH_USER:
      return {
        ...state,
        singleUser: state.users.find(item => item.key == action.id),
        loading: false,
        error: false
      }
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        singleUser: state.users.find(item => item.key == action.id),
        loading: false,
        error: false
      }
    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: false
      }
    case FETCH_ADMIN_USER:
      return {
        ...state,
        adminUser: action.results,
        loading: false,
        error: false
      }
    case FETCH_ADMIN_USER_SUCCESS:
      return {
        ...state,
        adminUser: action.results,
        loading: false,
        error: false
      }
    case FETCH_ADMIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: false
      }
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((item, index) => {
          if (item.key === action.payload.id) {
            return {
              ...item,
              Name: action.payload.name,
              verificaion: action.payload.verificaion,
              language_id: action.payload.language_id,
              status: action.payload.status,
              user_type: action.payload.user_type,
            }
          }
          return item;
        }),
        loading: true,
        error: false
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      }
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }
    case UPDATE_ADMIN_USER:
      return {
        ...state,
        adminUser: {
          name: action.payload.name,
          password: action.payload.password,
          repeatPassword: action.payload.repeatPassword,
        },
        loading: true,
        error: false
      }
    case UPDATE_ADMIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      }
    case UPDATE_ADMIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }
    default:
      return state
  }
}

export default user;
