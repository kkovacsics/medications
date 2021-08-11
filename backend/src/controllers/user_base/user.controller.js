/* eslint-disable new-cap */
const createError = require('http-errors')

// const userService = require('./user.service')
const baseService = require('../base/service')
const userModel = require('../../models/user.model')
const userService = baseService(userModel)

const checkModel = (model, body, next) => {
  const validationErrors = new model(body).validateSync()
  if (validationErrors) {
    next(new createError.BadRequest(
      JSON.stringify({
        message: 'Scmema validation error',
        error: validationErrors
      })
    ))
    return false
  }
  return true
}

exports.findAll = (req, res, next) => {
  return userService.findAll()
    .then(entities => {
      res.json(entities)
    })
}

// Get one
exports.findOne = (req, res, next) => {
  return userService.findOne(req.params.id)
    .then(entity => {
      if (!entity) {
        return next(new createError.NotFound('Entity is not found'))
      }
      res.json(entity)
    })
}

// create a new
exports.create = (req, res, next) => {
  if (!checkModel(userModel, req.body, next)) {
    return
  }

  const { name, email, password, role } = req.body

  const newEntity = {
    name,
    email,
    password,
    role
  }

  userService.create(newEntity)
    .then(created => {
      res.status(201)
      res.json(created)
    })
    .catch(err => next(new createError.InternalServerError(err.message)))
}

// update
exports.update = (req, res, next) => {
  if (!checkModel(userModel, req.body, next)) {
    return
  }
  const { name, email, password, role } = req.body

  const update = {
    name,
    email,
    password,
    role
  }

  return userService.update(req.params.id, update)
    .then(entity => {
      res.json(entity)
    })
    .catch(err => {
      next(new createError.InternalServerError(err.message))
    })
}

// Delete a person
exports.delete = (req, res, next) => {
  return userService.delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => {
      next(new createError.InternalServerError(err.message))
    })
}
