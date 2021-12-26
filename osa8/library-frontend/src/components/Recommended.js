import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ME } from '../querys'

const Authors = (props) => {
  const me_query = useQuery(ME, { pollInterval: 2000})
  const me = me_query.data ? me_query.data.me : null

  if (!props.show) {
    return null
  }

  if(!props.show) return ''

  return (
    <div>
      <h2>books</h2>
      <div>books of your favorite genre <strong>{me.favoriteGenre}</strong></div>
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
              if(!me.favoriteGenre) return true
              return book.genres.includes(me.favoriteGenre)
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
    </div>
  )
}

export default Authors