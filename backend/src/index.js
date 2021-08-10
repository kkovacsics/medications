require('dotenv').config() // elérhetővé teszi a .env fájl tartalmát
const config = require('config') // alapvetően a config mappában a default.json fájlt használja
const logger = require('./config/logger')
const app = require('./server')

const port = process.env.PORT || 3000 // a .env fájl PORT kulcsának értéke, ha ez nincs, akkor 3000

// Database connection
if (!config.has('database')) {
  logger.error('No database config found.')
  process.exit()
}

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
