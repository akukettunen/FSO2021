const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const errHandler = require('./utils/errorHandler')
const middleware = require('./utils/middleware')
require('dotenv').config()

morgan.token('body', function getBody (req) {
  if(req.method === 'POST') return JSON.stringify(req.body || '')
  return
})

app.use(cors())
app.use(express.json())
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['body'](req, res)
  ].join(' ')
}))
app.use(middleware.tokenExtractor)

const blogs = require('./controllers/blogs')
const users = require('./controllers/users')
const login = require('./controllers/login')

app.use('/api/blogs', blogs)
app.use('/api/users', users)
app.use('/api/login', login)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(errHandler)

module.exports = app