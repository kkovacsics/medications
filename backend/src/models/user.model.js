const mongoose = require('mongoose')

// timestamps: https://mongoosejs.com/docs/guide.html#timestamps

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
      type: String,
      required: true
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
