import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={ course.name } />
      <Content parts={ course.parts } />
      <Total total={ course.parts.reduce( (a, b) => ( a + b.exercises ), 0 )} />
    </div>
  )
}

const Header = (props) => <h1>{ props.name }</h1>

const Content = (props) => 
(
    props.parts.map(part => { 
      return <Part key={part.name} name={part.name} excersises={part.exercises} />
    })
)

const Part = (props) => <p> { props.name } { props.excersises }</p>

const Total = ({total}) => <p>Number of exercises {total}</p>

export default App