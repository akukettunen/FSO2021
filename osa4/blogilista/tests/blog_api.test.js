const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
require('express-async-errors')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

var token = ''

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  await api.post('/api/users').send(helper.initialUser)
  const loginData = await api.post('/api/login').send(helper.initialUser)
  token = loginData.body.token
  // .set('Authorization', `Bearer ${token}`)
  // const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  // const promiseArray = blogObjects.map(note => note.save())
  // await Promise.all(promiseArray)
  return
})

describe('blogs api tests', () => {
  test('all blogs are returned and as json', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
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
      .set({'authorization': `Bearer ${token}`})
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r.author)
  
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContain('Michael Chan')
  })

  test('cant add a blog w/out a valid token', async () => {
    const newBlog = {
      title: "React patterns 2.0",
      author: "Michael Chan",
      url: "https://reactpatterns.com/"
    }

    let invalid_token = token + '2'
  
    await api
      .post('/api/blogs')
      .set({'authorization': `Bearer ${invalid_token}`})
      .send(newBlog)
      .expect(401)
  })
  
  test('no likes defined -> marked as zero', async () => {
    const newBlog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
    }
  
    let newRes = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
  
    expect(newRes.body.likes).toBe(0)
  })
  
  test('has to have title or url', async () => {
    const newBlog = {
      // title: "React patterns",
      author: "Michael Chan",
      // url: "https://reactpatterns.com/",
      likes: 7
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})