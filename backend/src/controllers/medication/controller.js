const createError = require('http-errors')

const entityService = require('./service')
const EntityModel = require('../../models/medication')

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

const entityRefactor = (item) => {
  if (item._doc && item.residentId && item.medicineId) {
    const entity = { ...item }._doc
    entity.residentName = entity.residentId.name
    entity.residentId = entity.residentId._id
    entity.medicineName = entity.medicineId.name
    entity.medicineId = entity.medicineId._id
    return entity
  }
  return item
}
exports.entityRefactor = entityRefactor

exports.findAll = (req, res, next) => {
  return entityService.findAll()
    .then(entities => {
      entities.forEach((item, index, arr) => { arr[index] = entityRefactor(item) })
      res.json(entities)
    })
}

exports.findOne = (req, res, next) => {
  return entityService.findOne(req.params.id)
    .then(entity => {
      if (!entity) {
        return next(new createError.NotFound(`Entity (${req.params.id}) is not found`))
      }
      const newEntity = entityRefactor(entity)
      res.json(newEntity)
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
