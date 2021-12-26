import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
query {
  allBooks {
    author {
      name
    }
    title
    published
    id
    genres
  }
} 
`

export const ADD_BOOK = gql`
mutation($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(
    title: $title, 
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title
    author {
      name
    }
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const EDIT_AUTHOR = gql`
mutation($name: String!, $setBorn: Int!) {
  editAuthor(name: $name, setBorn: $setBorn) {
    name
    born
    bookCount
  }
}
`

export const LOGIN = gql`
mutation($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

export const ME = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`