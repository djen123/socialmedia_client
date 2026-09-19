import {
  CHECK_AUTH_LOADING,
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_FAILED,
  LOGOUT
} from '../actions/auth.js'

const initialState = { 
  currentUser: null,
  loading: false
}
function authReducer(state = initialState, action) {
  switch(action.type) {
    case CHECK_AUTH_LOADING: 
      return {
        ...state,
        loading: true
      }
    case CHECK_AUTH_SUCCESS: 
      return {
        ...state,
        loading: false,
        currentUser: action.payload
      }
    case CHECK_AUTH_FAILED: 
    case LOGOUT:
      return {
        ...state,
        loading: false,
        currentUser: null
      }
    default:
      return state
  }
}

export default authReducer