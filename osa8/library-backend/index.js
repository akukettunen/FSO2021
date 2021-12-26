const { ApolloServer, UserInputError, gql, PubSub } = require('apollo-server')
const pubsub = new PubSub()
const { v1: uuid } = require('uuid')
const Author = require('./models/Author')
const User = require('./models/User')
const Book = require('./models/Book')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'SECRET_SECRET_SECRET'
const MONGODB_URI = 'mongodb+srv://puhelinluettelo:ioeQGKORheUefA9P@cluster0.lt418.mongodb.net/books?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    genres: [String!]!
    id: ID!,
  }

  type Author {
    name: String!,
    id: ID!,
    born: Int,
    bookCount: Int!
  }

  type Token {
    value: String!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!],
    allAuthors: [Author!],
    me: User
  }

  type Mutation {
    addBook(
      title: String!,
      published: Int!,
      author: String!,
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!,
      setBorn: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate('author')
      return books.filter(book => book.author.name == root.name).length
    }
  },
  Query: {
    bookCount: async () => await Book.count(),
    authorCount: async () => await Book.count(),
    allBooks: async (root, args) => {
      let filtered_books = await Book.find({}).populate('author')
      console.log(filtered_books)
      if(args.author) filtered_books = filtered_books.filter(book => book.author == args.author)
      if(args.genre) filtered_books = filtered_books.filter(book => book.genres.includes(args.genre))

      return filtered_books 
    },
    allAuthors: async () => {
      return await Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (_, args, context) => {
      if(!context.currentUser) throw new AuthenticationError("not authenticated")

      let author = await Author.findOne({ name: args.author })
      if(!author) {
        const new_author = new Author({ name: args.author })
        author = await new_author.save()
      }

      const book = new Book({...args, author: author._id})

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      await book.save()

      pubsub.publish('BOOK_ADDED', { bookAdded: book.populate('author') })

      return book.populate('author')
    },
    editAuthor: async (_, args, context) => {
      if(!context.currentUser) throw new AuthenticationError("not authenticated")
      
      let author
      try {
        author = await Author.findOneAndUpdate({name: args.name}, {born: args.setBorn})
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
      // const index = authors.findIndex(author => author.name == args.name)
      // if(index < 0) return null
      // authors[index]['born'] = args.setBorn
      // return authors[index]
    },
    createUser: async(_, args) => {
      const user = new User(args)

      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subUrl}`)
})