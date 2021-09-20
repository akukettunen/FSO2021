import React from 'react'

const Course = ({name, parts}) => {
  const total = parts.reduce( (a, b) => ( a + b.exercises ), 0 )
  return(
    <div>
      <Header name={ name } />
      <Content parts={ parts } />
      <Total total={total} />
    </div>
  )
}

const Header = (props) => <h1>{ props.name }</h1>

const Content = ({parts}) => 
(
    parts.map(part => { 
      return <Part key={part.id} name={part.name} excersises={part.exercises} />
    })
)

const Part = ({name, exersises}) => <p> { name } { exersises }</p>

const Total = ({total}) => <p>Number of exercises {total}</p>

export default Course