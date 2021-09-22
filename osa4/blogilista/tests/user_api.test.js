const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
require('express-async-errors')

const api = supertest(app)

const User = require('../models/user')

const initialUsers = [
  {
    name: 'New Name',
    username: 'newuseer123',
    password: 'sekretpass'
  },
  {
    name: 'Uusi Kayttaja',
    username: 'joejoebiden',
    password: 'salasana'
  }
]

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(initialUsers)

  // const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  // const promiseArray = blogObjects.map(note => note.save())
  // await Promise.all(promiseArray)
})

describe('user api tests', () => {
  test('all users are returned and as json', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
      expect(response.body).toHaveLength(initialUsers.length)
  })
  
  test('users identifier is called id not _id', async () => {
    const response = await api.get('/api/users')
    expect(Object.keys(response.body[0]).includes('id'))
  })
  
  test('a valid user can be added', async () => {
    const addingUser = {
      name: "Teija Tuuppari",
      username: "tijatuuppari666",
      password: "salasana"
    }
  
    await api
      .post('/api/users')
      .send(addingUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/users')
  
    const contents = response.body.map(r => r.username)
  
    expect(response.body).toHaveLength(initialUsers.length + 1)
    expect(contents).toContain('tijatuuppari666')
  })
  
  test('has to have username', async () => {
    const newUser = { password: 'nomatter', name: 'New nmaee' }
    await api.post('/api/users').send(newUser).expect(400)
  })
  
  test('username has to be longer than 3', async () => {
    const newUser = { password: 'newpass', name: 'New nmaee', username: 'as' }
    await api.post('/api/users').send(newUser).expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})