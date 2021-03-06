const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String
    },
    role: {
      type: Number,
      required: true
    }
  }, {
    timestamps: true
  }
)

module.exports = mongoose.model('User', UserSchema)
