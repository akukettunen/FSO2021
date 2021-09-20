const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
require('express-async-errors')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  // const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  // const promiseArray = blogObjects.map(note => note.save())
  // await Promise.all(promiseArray)
})

test('all blogs are returned and as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs identifier is called id not _id', async () => {
  const response = await helper.blogsInDb()
  expect(Object.keys(response[0]).includes('id'))
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.author)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(contents).toContain('Michael Chan')
})

test('no likes defined -> marked as zero', async () => {
  const newBlog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  }

  let newRes = await api
    .post('/api/blogs')
    .send(newBlog)

  expect(newRes.body.likes).toBe(0)
})

test('has to have title and url', async () => {
  const newBlog = {
    // title: "React patterns",
    author: "Michael Chan",
    // url: "https://reactpatterns.com/",
    likes: 7
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})