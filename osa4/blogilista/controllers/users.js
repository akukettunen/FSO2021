const express = require('express')
      router = express.Router()
      User = require('../models/user')
      require('express-async-errors')
      bcrypt = require('bcrypt')

router.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

router.post('/', async (req, res) => {
  let {username, name, password} = req.body

  if(!password || password.length <= 3) return res.status(400).send({error:  'invalid or no password'})

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    name,
    password: passwordHash
  })

  const savedUser = await user.save()

  delete savedUser.password

  res.json(savedUser)
})

module.exports = router;
