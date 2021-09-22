const mongoose = require('mongoose')
      config = require('../utils/config')
      uniqueValidator = require('mongoose-unique-validator');

mongoose.connect(config.default.MONGODB_URI)

const userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true, uniqueCaseInsensitive: true, minlength: 3 },
  name: {type: String, required: false},
  password: {type: String, requred: true},
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'    
    }
  ] // more restrictions on route
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
