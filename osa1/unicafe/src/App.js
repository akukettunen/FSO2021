import React, { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button cb={addGood} text="good" />
      <Button cb={addNeutral} text="neutral" />
      <Button cb={addBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Statistics = ({ bad, neutral, good}) => {
  let all = good + neutral + bad
  if(all === 0) {
    return (
      <>
        <h1>statistics</h1>
        <div>no feedback given</div>
      </>
    )
  }
  let average = good * 1 + bad * -1 / all || 0
  let positive = good * 100 / all || 0
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good}/>
          <StatisticsLine text="neutral" value={neutral}/>
          <StatisticsLine text="bad" value={bad}/>
          <StatisticsLine text="all" value={all}/>
          <StatisticsLine text="average" value={average.toFixed(2)}/>
          <StatisticsLine text="positive" value={positive.toFixed(2)}/>
        </tbody>
      </table>
    </>
  )
}

const Button = ({text, cb}) => <button onClick={cb}>{text}</button>

const StatisticsLine = ({text, value}) => <tr><td>{ text }</td><td>{ value }</td></tr>


export default App