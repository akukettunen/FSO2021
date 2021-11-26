import React, { useState } from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import service from '../services/anecdoteService'

const AnecdoteForm = (props) => {
  const [text, setText] = useState('')

  const add = (content) => {
    service.createNew(content)
      .then(e => {
        props.addAnecdote(content)
        props.showNotification(`added: ${text}`)
        setText('')
      })
  }

  return(
    <form>
      <div><input value={text} onChange={e => setText(e.target.value)}/></div>
      <button onClick={(e) => {e.preventDefault(); add(text)}}>create</button>
    </form>
  )
}

const mapDispatchToProps = {
  addAnecdote, showNotification
}

const ConnectedForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedForm