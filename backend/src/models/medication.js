const mongoose = require('mongoose')

const MedicationSchema = mongoose.Schema(
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
    morning: {
      type: Number,
      required: true
    },
    afternoon: {
      type: Number,
      required: true
    },
    evening: {
      type: Number,
      required: true
    }
  }, {
    timestamps: true
  }
)

module.exports = mongoose.model('Medication', MedicationSchema)
