const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    console.log(request)
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  //TODO: might not want to send the full error message back
  // return response.status(500).send({ error: 'internal server error', message: error.message })
  next(error)
}

module.exports = errorHandler