const createError = require('http-errors')
const redeemService = require('./service')
const medicationService = require('../medication/controller')

const medicationLoad = async () => {
  const medications = await redeemService.medications()
  const medicines = await redeemService.medicines()
  const stocks = await redeemService.stocks()

  medications.forEach((item, index, arr) => {
    arr[index] = medicationService.entityRefactor(item)
    const packing = medicines.find(medicine => medicine._id.toString() === item.medicineId.toString())?.packing || 0
    const montlyDose = (item.morning + item.afternoon + item.evening) * 28
    const boxes = Math.ceil(montlyDose / packing)
    arr[index].boxes = boxes
    arr[index].pills = boxes * packing
    const stock = stocks.find(
      stock => stock.residentId.toString() === item.residentId.toString() &&
        stock.medicineId.toString() === item.medicineId.toString())
    arr[index].stockId = stock._id
    arr[index].stock = stock.pills
  })
  return medications
}

exports.getMedications = async (req, res, next) => {
  const medications = await medicationLoad()
  res.json(medications)
}

exports.updateStock = async (req, res, next) => {
  const { week } = req.body
  const medications = await medicationLoad()

  const updates = medications
    .filter(item => (item.stock || 0) < (item.morning + item.afternoon + item.evening) * week * 7)
    .map(item => ({
      updateOne: {
        filter: { _id: item.stockId },
        update: { pills: item.stock + item.pills }
      }
    })
    )

  try {
    const bulk = await redeemService.bulkWrite(updates)
    res.json(bulk)
  } catch (err) {
    next(new createError.InternalServerError(err.message))
  }
}
