import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommended'
import { useQuery, useMutation, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, LOGIN, ME } from './querys'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const author_result = useQuery(ALL_AUTHORS)
  const authors = author_result.data ? author_result.data.allAuthors : []

  const book_result = useQuery(ALL_BOOKS)
  const books = book_result.data ? book_result.data.allBooks : []
  
  const client = useApolloClient()

  const [ addBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ]
  })

  const [ sendLogin, result ] = useMutation(LOGIN)

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('phonenumbers-user-token', token)
    }

    if (localStorage.getItem('phonenumbers-user-token')) {
      setToken(localStorage.getItem('phonenumbers-user-token'))
    }
  }, [result.data, result])

  const addNewBook = (book) => {
    addBook({ variables: {...book, published: parseInt(book.published)} })
    setPage('books')
  }

  const login = async (user) => {
    const token = await sendLogin({ variables: user})
    setToken(token)
    setPage('books')
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }

  // if (!token) {
  //   return (
  //     <div>
  //       <Notify errorMessage={errorMessage} />
  //       <h2>Login</h2>
  //       <LoginForm
  //         setToken={setToken}
  //         setError={notify}
  //       />
  //     </div>
  //   )
  // }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token && <button onClick={() => setPage('add')}>add book</button> }
        { token && <button onClick={() => setPage('recommended')}>recommended</button> }
        { !token && <button onClick={() => setPage('login')}>login</button> }
        { !!token && <button onClick={() => logout()}>logout</button> }
      </div>

      <Authors
        authors={authors}
        show={page === 'authors'}
      />

      <Books
        books={books}
        show={page === 'books'}
      />

      <NewBook
        add={(_) => { addNewBook(_) }}
        show={page === 'add'}
      />

      <Recommended
        books={books}
        show={page === 'recommended'}
      />

      <Login
        login={(_) => { login(_) }}
        show={page === 'login'}
      />

    </div>
  )
}

export default App