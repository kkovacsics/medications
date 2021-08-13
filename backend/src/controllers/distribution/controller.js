const createError = require('http-errors')
const distributionService = require('./service')

exports.updateStock = async (req, res, next) => {
  const medications = await distributionService.medications()
  const stocks = await distributionService.stocks()

  const updates = medications.map(item => {
    item = { ...item }._doc
    const stock = stocks.find(
      stock => stock.residentId.toString() === item.residentId.toString() &&
        stock.medicineId.toString() === item.medicineId.toString())

    return {
      updateOne: {
        filter: { _id: stock._id },
        update: { pills: stock.pills - (item.morning + item.afternoon + item.evening) * 7 }
      }
    }
  })

  if (updates.find(item => item.updateOne.update.pills < 0)) {
    return next(new createError.NotAcceptable('Nincs elég gyógyszer'))
  }

  try {
    const bulk = await distributionService.bulkWrite(updates)
    res.json(bulk)
  } catch (err) {
    next(new createError.InternalServerError(err.message))
  }
}
