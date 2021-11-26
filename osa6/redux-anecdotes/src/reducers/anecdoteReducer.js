import service from '../services/anecdoteService'

const getId = () => (100000 * Math.random()).toFixed(0)

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const { id } = action.data
      const anecdote = state.find(n => n.id === id)
      const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
      return state.map(a => a.id === id ? votedAnecdote : a)
    case 'ADD':
      return [...state, action.data]
    case 'INIT':
      return action.data
    default:
    return state
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    let voted = await service.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: { id: voted.id }
    })
  }
}

export const addAnecdote = anecdote => {
  return async dispatch => {
    let newAnec = await service.createNew(anecdote)
    dispatch({
      type: 'ADD',
      data: newAnec
    })
  }
}

export const init = () => {
  return async dispatch => {
    let anecdotes = await service.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export default reducer