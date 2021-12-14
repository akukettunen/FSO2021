import notificationReducer from './notificationReducer.js'
import blogReducer from './blogReducer.js'
import userReducer from './userReducer.js'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: userReducer,
})

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store