const express = require('express')
const controller = require('./controller')

const router = express.Router()

// read
router.patch('/', (req, res, next) => {
  return controller.updateStock(req, res, next)
})

module.exports = router
