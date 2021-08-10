// ez végzi el az autentikációt
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    // HTTP Header-ben
    // Authorization: Bearer < JWT token >
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403) // forbidden
      }
      req.user = user
      next()
    })
  } else {
    res.sendStatus(401) // unauthorized
  }
}
