
import React, { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState(null)

  const genres = props.books.map(book => book.genres).flat()
  const unique_genres = [...new Set(genres)]
  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {
            props.books.filter(book => {
              if(!genre) return true
              return book.genres.includes(genre)
            }).map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author ? a.author.name : ''}</td>
                <td>{a.published}</td>
              </tr>
            )
          }
        </tbody>
      </table>
        { 
          unique_genres.map(b => 
            <button key={b} onClick={() => setGenre(b)}>{ b }</button>
          ) 
        }
        <button onClick={() => setGenre(null)}>all</button>
    </div>
  )
}

export default Books