// ami kell a tesztelésnél és az éles működésnél is
const express = require('express')
const app = express()
const config = require('config') // alapvetően a config mappában a default.json fájlt használja
const morgan = require('morgan')
const path = require('path')
const logger = require('./config/logger')

// swagger docs
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./docs/swagger.yaml')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// cors
const cors = require('./config/cors')

// Authentication
const authenticateJwt = require('./auth/authenticate')
const adminOnly = require('./auth/adminOnly')
const authHandler = require('./auth/authHandler')

const { host } = config.get('database')
// const { username, password, host } = config.get('database')

mongoose
  .connect(`mongodb://${host}`, {
  // .connect(`mongodb+srv://${username}:${password}@${host}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => logger.info('MongoDB connection has been established successfully'))
  .catch(err => {
    logger.error(err)
    process.exit() // leállítjuk az alkalmazást, mert DB kapcsolat nélkül mit sem ér :)
  })

// cors
app.use(cors())

app.use(morgan('combined', { stream: logger.stream })) // logolás a legelső helyre kerül a middleware-k között

// app.use('/images', express.static(path.join(__dirname, '../public/images')))
app.use(express.static(path.join(__dirname, '../public')))

app.use(express.json())

// Router
app.post('/login', authHandler.login)
app.post('/refresh', authHandler.refresh)
app.post('/logout', authHandler.logout)

app.use('/person', authenticateJwt, require('./controllers/person/person.routes'))
app.use('/post', authenticateJwt, adminOnly, require('./controllers/post/post.routes'))

app.use('/users', authenticateJwt, adminOnly, require('./controllers/user/routes'))
app.use('/residents', authenticateJwt, require('./controllers/resident/routes'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use((err, req, res, next) => {
  res.status(err.status)
  res.json({
    hasError: true,
    message: err.message
  })
})

module.exports = app
