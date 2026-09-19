import axios from '../../api/axios'

export const CHECK_AUTH_LOADING = 'CHECK_AUTH_LOADING'
export const CHECK_AUTH_SUCCESS = 'CHECK_AUTH_SUCCESS'
export const CHECK_AUTH_FAILED = 'CHECK_AUTH_FAILED'
export const LOGOUT = 'LOGOUT'

export const checkAuthLoading = () => ({
  type: CHECK_AUTH_LOADING
})

export const checkAuthSuccess = (currentUser) => ({
  type: CHECK_AUTH_SUCCESS,
  payload: currentUser
})

export const checkAuthFailed = () => ({
  type: CHECK_AUTH_FAILED
})

export const logout = () => ({
  type: LOGOUT
})

export const checkAuth = () => async (dispatch) => {
  try {
    dispatch(checkAuthLoading())
    const res = await axios.get('/users/me')
    dispatch(checkAuthSuccess(res.data.user))
  } catch (error) {
    dispatch(checkAuthFailed())
  }
}

export const signupUser = (newUser) => async (dispatch) => {
  try {
    const res = await axios.post('/users/signup', newUser)
    alert(res.data.message)
    await dispatch(checkAuth())
    return { ok: true }
  } catch (error) {
    alert('Something went wrong while signing up user. Please try again later.')
    return { ok: false }
  }
}

export const loginUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post('/users/login', user)
    alert(res.data.message)
    await dispatch(checkAuth())
    return { ok: true }
  } catch (error) {
    alert('Something went wrong while logging in user. Please try again later.')
    return { ok: false }
  }
}

export const logoutUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post('/users/logout')
    alert(res.data.message)
    await dispatch(checkAuth())
  } catch (error) {
    alert('Something went wrong while logging out user. Please try again later.')
  }
}