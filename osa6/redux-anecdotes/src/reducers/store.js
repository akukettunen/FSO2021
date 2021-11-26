
import anecdoteReducer from './anecdoteReducer.js'
import notificationReducer from './notificationReducer.js'
import filterReducer from './filterReducer.js'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  anecdote: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(
  reducers, 
  composeWithDevTools(applyMiddleware(thunk))
)

export default store