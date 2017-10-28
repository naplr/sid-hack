import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import campaign from './campaign'
import user from './user'

export default combineReducers({
  routing: routerReducer,
  counter,
  campaign,
  user
})