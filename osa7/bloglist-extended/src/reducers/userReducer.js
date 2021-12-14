import blogService from '../services/blogs'
import loginService from '../services/login'
import { showNotification } from './notificationReducer'

const reducer = (state = null, action) => {
  switch(action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:

    return state
  }
}

export const initUser = (user) => {
  if(user) {
    return {
      type: 'LOGIN',
      data: JSON.parse(user)
    }
  }
}

export const loginUser = (user) => {
  return async dispatch => {
    loginService.login(user)
      .then(e => {
        dispatch({
          type: 'LOGIN',
          data: e.data
        })

        window.localStorage.setItem('blogUser', JSON.stringify(e.data))
        blogService.setToken(e.data.token)

        dispatch(showNotification({ type: 'success', text: 'kirjautuminen onnistui!', duration: 5000, visible: true }))
      })
      .catch((e) => {
        alert(e)
        dispatch(showNotification({ type: 'alert', text: 'Jotain meni pieleen', duration: 5000, visible: true }))
      })
  }
}

export const logoutUser = () => {
  window.localStorage.removeItem('blogUser')
  return {
    type: 'LOGOUT'
  }
}

export default reducer