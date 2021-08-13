const express = require('express')
const controller = require('./controller')

const router = express.Router()

// read
router.get('/', (req, res, next) => {
  return controller.getStatistics(req, res, next)
})

module.exports = router
