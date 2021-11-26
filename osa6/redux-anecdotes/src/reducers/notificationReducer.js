const reducer = (state = '', action) => {
  switch(action.type) {
    case 'SHOW':
      return action.data
    case 'HIDE':
      return ''
    default:

    return state
  }
}

let timeout;

export const showNotification = (message, time = 5) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW',
      data: message
    })

    clearTimeout(timeout)

    timeout = setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE'
  }
}

export default reducer