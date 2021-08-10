const app = require('./server')
const logger = require('./config/logger')
const mongoose = require('mongoose')
const supertest = require('supertest')
const config = require('config')
const Person = require('./models/person.model')
// const { response } = require('express')

describe('REST API integration tests', () => {
  const insertData = [
    {
      firstName: 'John',
      lastName: 'Test',
      email: 'john@test.com'
    },
    {
      firstName: 'Kate',
      lastName: 'Test',
      email: 'kate@test.com'
    }
  ]

  // minden teszt esetnpm test után le fog futni
  beforeEach(done => { // a done jelzi a teszt rendszernek, hogy az előkészítés megtörtént, kezdődhet a tesztelés
    const { username, password, host } = config.get('database')
    // felépítem az adatbázis kapcsolatot
    mongoose
      .connect(`mongodb+srv://${username}:${password}@${host}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        logger.info('MongoDB connection has been established successfully')
        done() // sikeres csatlakozás, indulhat a teszt
      })
      .catch(err => {
        logger.error(err)
        process.exit() // leállítjuk az alkalmazást, mert DB kapcsolat nélkül mit sem ér :)
      })
  })

  // minden teszt eset után le fog futni
  afterEach(done => {
    // megszüntetem az adatbázis kapcsolatot, pontosabban először törlöm az adatbázist
    mongoose.connection.db.dropDatabase(() => { // ha sikerült a törlés, akkor disconnect
      mongoose.connection.close(() => done()) // ha megvolt a disconnect, megy a jelzés, hogy kész
    })
  })

  test('GET /person', () => {
    return Person.insertMany(insertData) // beszúrjuk a teszt adatokat a jestDB-be
      .then(() => supertest(app).get('/person').expect(200)) // majd lekérdezzük a felvitt adatokat
      .then(response => {
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(insertData.length)

        response.body.forEach((person, index) => {
          expect(person.firstName).toBe(insertData[index].firstName)
          expect(person.lastName).toBe(insertData[index].lastName)
          expect(person.email).toBe(insertData[index].email)
        })
      })
  })

  test('GET /person/:id', () => { // egy bizonyos beszúrt rekord adatait ellenőrizzük
    let firstPostId
    return Person.insertMany(insertData) // beszúrjuk a teszt adatokat a jestDB-be
      .then(people => { // visszaadja a felvitt adatokat
        firstPostId = people[0]._id // lekérem az 1. rekord id-jét
        return supertest(app).get(`/person/${firstPostId}`).expect(200) // majd lekérdezzük az 1. rekordot
      })
      .then(response => {
        const person = response.body
        expect(person.firstName).toBe(insertData[0].firstName)
        expect(person.lastName).toBe(insertData[0].lastName)
        expect(person.email).toBe(insertData[0].email)
      })
  })
})
