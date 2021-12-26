import React, { useState } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../querys'

const Authors = (props) => {
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const changeYear = () => {
    editAuthor({ variables: {name: author, setBorn: parseInt(published)} })
    setPublished('')
    setAuthor('')
  }

  if (!props.show) {
    return null
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {props.authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <h3>Set birthyear</h3>
        <Select 
          options={
            props.authors.map(
              a => { 
                return { value: a.name, label: a.name } 
              }
            )
          }
          onChange={ (e) => setAuthor(e.value) }
        />
        <input
          type='number'
          value={published}
          onChange={({ target }) => setPublished(target.value)}
        />
        <button onClick={() => { changeYear() }}>save</button>
      </div>
    </div>
  )
}

export default Authors