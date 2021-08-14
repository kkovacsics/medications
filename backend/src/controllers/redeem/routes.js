const express = require('express')
const controller = require('./controller')

const router = express.Router()

// get
router.get('/', (req, res, next) => {
  return controller.getMedications(req, res, next)
})

// update
router.patch('/', (req, res, next) => {
  return controller.updateStock(req, res, next)
})

module.exports = router
