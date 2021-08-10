/* eslint-disable camelcase */
const createError = require('http-errors')
const postService = require('./post.service')

exports.create = (req, res, next) => { // egy komplett HTTP kérést kezel le
  const { title, body, author } = req.body
  if (!title || !body || !author) {
    return next(new createError.BadRequest('Request body must contain title, body, author parameters'))
  }

  const postData = { title, body, author }

  return postService.create(postData)
    .then(createdPost => { // amit frissen létrehozott
      res.status(201)
      res.json(createdPost)
    })
    .catch(err => next(new createError.BadRequest(err.message)))
  // éles rendszerben nem jó a mongoDB-től kapott hibaüzenetet tovább küldeni,mert abból kiderül a verzió, adatbázis nevek, stb.,
  // ami sebezhetőséget jelenthet
}

exports.findOne = (req, res, next) => {
  return postService.findOne(req.params.id)
    .then(post => {
      if (!post) {
        return next(new createError.BadRequest('Post is not found!'))
      }
      res.json(post)
    })
    .catch(err => {
      return next(new createError.InternalServerError(err.message))
    })
}
