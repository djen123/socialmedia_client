import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk'

import authReducer from './reducers/auth'
import networkReducer from './reducers/network'

const rootReducer = combineReducers({
  auth: authReducer,
  network: networkReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
export default store