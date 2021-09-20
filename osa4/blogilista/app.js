const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const errHandler = require('./utils/errorHandler')
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

const blogs = require('./controllers/blogs')

app.use('/api/blogs', blogs)

app.use(errHandler)

module.exports = app