import {
  FETCH_NETWORK_LOADING,
  FETCH_NETWORK_SUCCESS,
  FETCH_NETWORK_FAILED,
  LOGOUT,
  FETCH_CONNECTIONS_LOADING,
  FETCH_CONNECTIONS_SUCCESS,
  FETCH_CONNECTIONS_FAILED
} from '../actions/network.js'

const initialState = { 
  users: [],
  connections: [],
  receivedRequests: [],
  sentRequests: [],
  loading: false,
  error: null
}
function networkReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_NETWORK_LOADING: 
      return {
        ...state,
        loading: true
      }
    case FETCH_NETWORK_SUCCESS: 
      return {
        ...state,
        loading: false,
        users: action.payload
      }
    case FETCH_NETWORK_FAILED: 
      return {
        ...state,
        loading: false,
        error: payload
      }
    case FETCH_CONNECTIONS_LOADING: 
      return {
        ...state,
        loading: true
      }
    case FETCH_CONNECTIONS_SUCCESS: 
      return {
        ...state,
        loading: false,
        connections: action.payload.connections,
        receivedRequests: action.payload.receivedRequests,
        sentRequests: action.payload.sentRequests
      }
    case FETCH_CONNECTIONS_FAILED: 
      return {
        ...state,
        loading: false,
        error: payload
      }
    default:
      return state
  }
}

export default networkReducer