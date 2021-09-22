const express = require('express')
      router = express.Router()
      Blog = require('../models/blog')
      User = require('../models/user')
      require('express-async-errors')
      validateUser = require('../utils/middleware').validateUser

router.get('/', async (request, response) => {
  let blogs = await  Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

router.post('/', validateUser, async (request, response) => {
  let blog = request.body

  if(!blog.title && !blog.url) return response.status(400).send()
  if(!blog.likes) blog['likes'] = 0

  let user = await User.findById(request.user.id)

  blog['user'] = user._id

  const new_blog = new Blog(blog)

  let resp = await new_blog.save()
  user['blogs'] = !!user.blogs ? user.blogs.concat(resp._id) : [resp._id]
  await user.save()

  response.status(201).json(resp)
})

router.put('/:id', async (req, res) => {
  const updated_blog = req.body

  const updated = await Blog.findByIdAndUpdate(req.params.id, updated_blog, { new: true })
  res.json(updated)
})

router.delete('/:id', validateUser, async (req, res) => {
  let deletingBlog = await Blog.findById(req.params.id)

  if(deletingBlog.user.toString() !== req.user.id.toString()) return res.status(400).send('invalid token')

  let deleteData = await Blog.findByIdAndRemove(req.params.id)

  if(deleteData) return res.send()
  else res.status(404).send({error: 'Blogi on jo poistettu'})
})

module.exports = router;