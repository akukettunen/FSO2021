const reducer = (state = '', action) => {
  switch(action.type) {
    case 'CHANGE':
      return action.data
    default:
    return state
  }
}

export const setFilter = filter => {
  return {
    type: 'CHANGE',
    data: filter
  }
}

export default reducer