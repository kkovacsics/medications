const createError = require('http-errors')

const entityService = require('./service')
const EntityModel = require('../../models/resident')

const checkModel = (body, next) => {
  const validationErrors = new EntityModel(body).validateSync()
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
  return entityService.findAll()
    .then(entity => {
      res.json(entity)
    })
}

exports.findOne = (req, res, next) => {
  return entityService.findOne(req.params.id)
    .then(entity => {
      if (!entity) {
        return next(new createError.NotFound(`Entity (${req.params.id}) is not found`))
      }
      res.json(entity)
    })
}

exports.create = (req, res, next) => {
  if (!checkModel(req.body, next)) {
    return
  }

  const newEntity = { ...req.body }

  entityService.create(newEntity)
    .then(createdEntity => {
      res.status(201)
      res.json(createdEntity)
    })
    .catch(err => next(new createError.InternalServerError(err.message)))
}

exports.update = (req, res, next) => {
  if (!checkModel(req.body, next)) {
    return
  }

  const updateEntity = { ...req.body }

  return entityService.update(req.params.id, updateEntity)
    .then(entity => {
      if (!entity) {
        return next(new createError.NotFound(`Entity (${req.params.id}) is not found`))
      }
      res.json(entity)
    })
    .catch(err => {
      next(new createError.InternalServerError(err.message))
    })
}

exports.delete = (req, res, next) => {
  return entityService.delete(req.params.id)
    .then(entity => {
      if (!entity) {
        return next(new createError.NotFound(`Entity (${req.params.id}) is not found`))
      }
      res.json({})
    })
    .catch(err => {
      next(new createError.InternalServerError(err.message))
    })
}
