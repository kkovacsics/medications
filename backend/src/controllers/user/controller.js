const createError = require('http-errors')

const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

const entityService = require('./service')
const EntityModel = require('../../models/user')

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
    .then(entities => {
      entities.forEach(entity => { entity.password = '' }) // password-öt nem küldünk
      res.json(entities)
    })
}

exports.findOne = (req, res, next) => {
  return entityService.findOne(req.params.id)
    .then(entity => {
      if (!entity) {
        return next(new createError.NotFound(`Entity (${req.params.id}) is not found`))
      }
      entity.password = '' // password-öt nem küldünk
      res.json(entity)
    })
}

exports.create = (req, res, next) => {
  if (!checkModel(req.body, next)) {
    return
  }

  const newEntity = { ...req.body, password: bcrypt.hashSync(req.body.password, salt) }

  entityService.create(newEntity)
    .then(createdEntity => {
      createdEntity.password = '' // password-öt nem küldünk vissza
      res.status(201)
      res.json(createdEntity)
    })
    .catch(err => next(new createError.InternalServerError(err.message)))
}

exports.update = (req, res, next) => {
  if (!checkModel(req.body, next)) {
    return
  }

  let updateEntity
  if (req.body.password) { // ha van jelszó, akkor titkosítunk
    updateEntity = { ...req.body, password: bcrypt.hashSync(req.body.password, salt) }
  } else { // ha nincs, akkor békén hagyjuk
    updateEntity = { ...req.body }
  }

  return entityService.update(req.params.id, updateEntity)
    .then(entity => {
      if (!entity) {
        return next(new createError.NotFound(`Entity (${req.params.id}) is not found`))
      }
      entity.password = '' // password-öt nem küldünk vissza
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
