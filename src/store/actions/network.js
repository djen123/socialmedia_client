import axios from '../../api/axios'

export const FETCH_NETWORK_LOADING = 'FETCH_NETWORK_LOADING'
export const FETCH_NETWORK_SUCCESS = 'FETCH_NETWORK_SUCCESS'
export const FETCH_NETWORK_FAILED = 'FETCH_NETWORK_FAILED'

export const LOGOUT = 'LOGOUT'

export const FETCH_CONNECTIONS_LOADING = 'FETCH_CONNECTIONS_LOADING'
export const FETCH_CONNECTIONS_SUCCESS = 'FETCH_CONNECTIONS_SUCCESS'
export const FETCH_CONNECTIONS_FAILED = 'FETCH_CONNECTIONS_FAILED'

export const fetchNetworkLoading = () => ({
  type: FETCH_NETWORK_LOADING
})

export const fetchNetworkSuccess = (users) => ({
  type: FETCH_NETWORK_SUCCESS,
  payload: users
})

export const fetchNetworkFailed = (error) => ({
  type: FETCH_NETWORK_FAILED,
  payload: error
})

export const fetchNetwork = () => async (dispatch) => {
  try {
    dispatch(fetchNetworkLoading())
    const res = await axios.get('/network')
    dispatch(fetchNetworkSuccess(res.data.users))
  } catch (error) {
    dispatch(fetchNetworkFailed('Something went wrong while fetching network. Please try again later.'))
  }
}

export const fetchConnectionsLoading = () => ({
  type: FETCH_CONNECTIONS_LOADING
})

export const fetchConnectionsSuccess = (payload) => ({
  type: FETCH_CONNECTIONS_SUCCESS,
  payload: payload
})

export const fetchConnectionsFailed = (error) => ({
  type: FETCH_CONNECTIONS_FAILED,
  payload: error
})

export const fetchConnections = () => async (dispatch) => {
  try {
    dispatch(fetchConnectionsLoading())
    const res = await axios.get('/network/connections')
    dispatch(fetchConnectionsSuccess({ connections: res.data.connections, receivedRequests: res.data.receivedRequests, sentRequests: res.data.sentRequests }))
  } catch (error) {
    dispatch(fetchConnectionsFailed('Something went wrong while fetching connections. Please try again later.'))
  }
}