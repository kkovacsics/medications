const mongoose = require('mongoose')

const ResidentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    mother: {
      type: String,
      required: true
    },
    dob: {
      type: String,
      required: true
    },
    dop: {
      type: String
    },
    sin: {
      type: String,
      required: true
    },
    movin: {
      type: String,
      required: true
    },
    movout: {
      type: String
    }
  }, {
    timestamps: true
  }
)

module.exports = mongoose.model('Resident', ResidentSchema)
