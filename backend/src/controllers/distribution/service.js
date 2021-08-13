const Medication = require('../../models/medication')
const Stock = require('../../models/stock')

exports.medications = () => Medication.find()
exports.stocks = () => Stock.find()
exports.bulkWrite = (entities) => Stock.bulkWrite(entities)
