const reducer = (state = '', action) => {
  switch(action.type) {
    case 'SHOW':
      return action.data
    case 'HIDE':
      return { type: 'success', text: '', visible: false, duration: 0 }
    default:

    return state
  }
}

let timeout

export const showNotification = (notification) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW',
      data: notification
    })

    clearTimeout(timeout)

    timeout = setTimeout(() => {
      dispatch(hideNotification())
    }, notification.duration || 5 * 1000)
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE'
  }
}

export default reducer