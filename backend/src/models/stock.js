const mongoose = require('mongoose')

const StockSchema = mongoose.Schema(
  {
    residentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resident',
      required: true
    },
    medicineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medicine',
      required: true
    },
    pills: {
      type: Number,
      required: true
    },
    recipes: {
      type: Number,
      required: true
    }
  }, {
    timestamps: true
  }
)

module.exports = mongoose.model('Stock', StockSchema)
