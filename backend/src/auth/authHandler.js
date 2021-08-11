// ez végzi el az autentikációt
const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')
// const salt = bcrypt.genSaltSync(10)

const User = require('../models/user')

const refreshTokens = []

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && bcrypt.compareSync(password, user.password)) { // minden stimmel
    // Generate an access token
    const accessToken = jwt.sign({
      email: user.email,
      role: user.role
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRY
    })

    const refreshToken = jwt.sign({
      email: user.email,
      role: user.role
    }, process.env.REFRESH_TOKEN_SECRET) // nincs lejárati idő
    refreshTokens.push(refreshToken) // elmentjük a tömbbe

    res.json({
      accessToken,
      refreshToken,
      user
    })
  } else {
    res.status(400)
    res.send('email or password incorrect')
  }
}

module.exports.refresh = (req, res, next) => {
  const { token } = req.body

  if (!token) {
    return res.sendStatus(401)
  }

  if (!refreshTokens.includes(token)) {
    return res.sendStatus(403)
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403)
    }

    const accessToken = jwt.sign({
      email: user.email,
      role: user.role
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRY })

    res.json({
      accessToken
    })
  })
}

module.exports.logout = (req, res) => {
  const { token } = req.body

  const tokenIndex = refreshTokens.indexOf(token)
  if (tokenIndex === -1) {
    res.sendStatus(403)
  }
  refreshTokens.splice(tokenIndex, 1)
  res.sendStatus(200)
}
