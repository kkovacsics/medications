// const createError = require('http-errors')

const statisticService = require('./service')

const getMedicationPeriod = async () => {
  const medications = await statisticService.medications()
  const stocks = await statisticService.stocks()

  medications.forEach((item, index, arr) => {
    item = { ...item }._doc
    item.stock = stocks.find(
      stock => stock.residentId.toString() === item.residentId.toString() &&
                stock.medicineId.toString() === item.medicineId.toString())?.pills || 0
    arr[index] = item
  })

  let period = Infinity
  medications.forEach(medication => {
    if ((medication.stock || 0) / (medication.morning + medication.afternoon + medication.evening) < period) {
      period = (medication.stock || 0) / (medication.morning + medication.afternoon + medication.evening)
    }
  })
  // console.log(medications)
  return period / 7
}

exports.getStatistics = async (req, res, next) => {
  const residentNumber = await statisticService.residentNumber()
  const medicineNumber = await statisticService.medicineNumber()
  const distinctMedicationResidents = await statisticService.distinctMedicationResidents()
  const distinctMedicationMedicines = await statisticService.distinctMedicationMedicines()

  const medicationWeek = await getMedicationPeriod()

  res.json({
    residentNumber,
    medicineNumber,
    medicationResidentNumber: distinctMedicationResidents.length,
    medicationMedicineNumber: distinctMedicationMedicines.length,
    medicationWeek
  })
}
