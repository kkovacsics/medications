const express = require('express')
const controller = require('./controller')

const router = express.Router()

// update
router.patch('/', (req, res, next) => {
  return controller.updateStock(req, res, next)
})

module.exports = router
