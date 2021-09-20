const express = require('express')
      router = express.Router()
      Blog = require('../models/blog')
require('express-async-errors')

router.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

router.post('/', (request, response) => {
  let blog = request.body
  if(!blog.title && !blog.url) return response.status(400).send()
  if(!blog.likes) blog['likes'] = 0

  const new_blog = new Blog(blog)

  new_blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

router.put('/:id', async (req, res) => {
  const updated_blog = req.body

  const updated = await Blog.findByIdAndUpdate(req.params.id, updated_blog, { new: true })
  res.json(updated)
})

router.delete('/:id', async (req, res) => {
  let deleteData = await Blog.findByIdAndRemove(req.params.id)

  if(deleteData) return res.send()
  else res.status(404).send({error: 'Blogi on jo poistettu'})
})

module.exports = router;