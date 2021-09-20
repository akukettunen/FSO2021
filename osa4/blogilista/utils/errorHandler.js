const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    console.log(error)
    return response.status(400).json({ error: error.message })
  }

  //TODO: might not want to send the full error message back
  return response.status(500).send({ error: 'internal server error', message: error.message })
}

module.exports = errorHandler