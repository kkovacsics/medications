// middleware, amin csak admin-ok tudnak átjutni
module.exports = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.sendStatus(401) // forbidden
  }
  next()
}
