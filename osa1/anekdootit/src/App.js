import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0])

  const handleNext = () => {
    let next = Math.floor( Math.random() * 7 )
    if(next === selected) handleNext()
    else setSelected(next)
  }

  const handleVote = () => {
    let old = [...points]
    old[selected] += 1

    setPoints(old)
  }

  let mostVotes = points.reduce(function(a, b) { return Math.max(a, b); }, 0)
  let mostVotedIndex = points.indexOf(mostVotes)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>
        <button onClick={ handleVote }>vote</button>
        <button onClick={ handleNext }>next anecdote</button>
      </div>
      <h1>Anecdote with the most votes</h1>
      {anecdotes[mostVotedIndex]}
    </div>
  )
}

export default App