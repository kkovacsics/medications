const jwt = require('jsonwebtoken')

// ennek igazából vmilyen DB-ben kellene lennie
const Users = [
  {
    username: 'admin',
    password: 'admin_pw',
    role: 'admin'
  },
  {
    username: 'user',
    password: 'user_pw',
    role: 'user'
  }
]

module.exports = (req, res) => {
  // Read username and password from request body
  const { username, password } = req.body

  // Filter user from the users array by username and password
  const user = Users.find(u => u.username === username && u.password === password)

  if (user) {
  // Generate an access token
    const accessToken = jwt.sign({
      username: user.username,
      role: user.role
    }, process.env.ACCESS_TOKEN_SECRET)

    res.json({
      accessToken: accessToken // {accessToken: accessToken} >>> {accessToken} ez is elég lenne
    })
  } else {
    res.send('Username or password incorrect')
  }
}
