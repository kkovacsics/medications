const Medication = require('../../models/medication')
const Stock = require('../../models/stock')
const Medicine = require('../../models/medicine')

exports.medications = () => Medication.find().populate('residentId').populate('medicineId')
exports.stocks = () => Stock.find()
exports.medicines = () => Medicine.find()
exports.bulkWrite = (entities) => Stock.bulkWrite(entities)
