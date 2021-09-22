const jwt = require('jsonwebtoken')

tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req['token'] = authorization.substring(7)
  }
  next()
}

validateUser = (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  req['user'] = decodedToken

  next()
}

module.exports = { tokenExtractor, validateUser }