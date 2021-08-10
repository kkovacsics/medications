/* eslint-disable camelcase */
const createError = require('http-errors')
const userService = require('./user.service')

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
  const { name, email, password, role } = req.body
  if (!name || !email || !password || !role) {
    return next(
      new createError.BadRequest('Missing properties!')
    )
  }

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
  const { name, email, password, role } = req.body
  if (!name || !email || !password || !role) {
    return next(
      new createError.BadRequest('Missing properties!')
    )
  }

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
