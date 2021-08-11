const mongoose = require('mongoose')

const MedicineSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    agent: {
      type: String,
      required: true
    },
    packing: {
      type: Number,
      required: true
    }
  }, {
    timestamps: true
  }
)

module.exports = mongoose.model('Medicine', MedicineSchema)
