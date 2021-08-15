const app = require('./server')
const logger = require('./config/logger')
const mongoose = require('mongoose')
const supertest = require('supertest')
const config = require('config')
const User = require('./models/user')
const Resident = require('./models/resident')
const Medicine = require('./models/medicine')
const Stock = require('./models/stock')
const Medication = require('./models/medication')

const dotenv = require('dotenv')
dotenv.config('../.env') // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

describe('REST API integration tests', () => {
  const tempUser = [
    { name: 'Teszt', email: 'test@gmail.com', password: '$2a$10$lvFm6BRUSX2Lg1uMpyLT2usRw0mcfnaG20JgxagnyU0Gc1LUYIF82', role: 2 }
  ]
  const tempResident = [
    { _id: '6113c059a0821e4d55d47d8d', name: 'Jobbágy László', mother: 'Csörgő Rozália', dob: '1953.03.16', dop: 'Körmend', sin: '575 535 704', movin: '2016.06.12', movout: '' },
    { _id: '6113c07e28bdb69261a4ebe1', name: 'Andirkó Sándor', mother: 'Rácz Mária', dob: '1947.02.16', dop: 'Bükkszentkereszt', sin: '447 217 734', movin: '2009.01.05', movout: '' },
    { _id: '6113c07e28bdb69261a4ebe2', name: 'Tóth Alexandra Anett', mother: 'Kántor Judit Tímea', dob: '1943.04.22', dop: 'Hencse', sin: '329 535 510', movin: '2012.02.04', movout: '' }
  ]

  const tempMedicine = [
    { _id: '6113c0ec98d38561776cb49d', name: 'CAMELOX  7,5 mg', agent: 'meloxicam', packing: 50 },
    { _id: '6113c0ec98d38561776cb49e', name: 'Ibandronsav Teva  50 mg', agent: 'ibandronic acid', packing: 28 },
    { _id: '6113c0ec98d38561776cb49f', name: 'HISTISYNT 5 mg', agent: 'levocetirizine', packing: 30 }
  ]

  const tempStock = [
    { _id: '6113f20cc890e423bab5aa20', residentId: '6113c07e28bdb69261a4ebe9', medicineId: '6113c0ec98d38561776cb4bc', pills: 89, recipes: 0 },
    { _id: '611404638465adc6db79d4d1', residentId: '6113c07e28bdb69261a4ebe9', medicineId: '6113c0ec98d38561776cb4b1', pills: 120, recipes: 0 },
    { _id: '61140743e234321237e2839a', residentId: '6113c07e28bdb69261a4ebff', medicineId: '6113c0ec98d38561776cb4a7', pills: 42, recipes: 0 }
  ]

  const tempMedication = [
    { _id: '6113f20cc890e423bab5aa20', residentId: '6113c07e28bdb69261a4ebe9', medicineId: '6113c0ec98d38561776cb4bc', morning: 1, afternoon: 2, evening: 3 },
    { _id: '611404638465adc6db79d4d1', residentId: '6113c07e28bdb69261a4ebe9', medicineId: '6113c0ec98d38561776cb4b1', morning: 3, afternoon: 2, evening: 1 },
    { _id: '61140743e234321237e2839a', residentId: '6113c07e28bdb69261a4ebff', medicineId: '6113c0ec98d38561776cb4a7', morning: 1, afternoon: 0, evening: 1 }
  ]

  let accessToken = ''
  // minden teszt eset előtt le fog futni
  beforeEach(done => { // a done jelzi a teszt rendszernek, hogy az előkészítés megtörtént, kezdődhet a tesztelés
    const { username, password, host } = config.get('database')
    // felépítem az adatbázis kapcsolatot
    mongoose
      .connect(`mongodb+srv://${username}:${password}@${host}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        logger.info('MongoDB test connection has been established successfully')
        // done() // sikeres csatlakozás, indulhat a teszt
        User.insertMany(tempUser)
          .then(users => {
            logger.info('User inserted')

            supertest(app)
              .post('/login')
              .send({ email: 'test@gmail.com', password: 'test' }) // az éles DB-ben ne legyen ilyen felhasználó :)
              .set('Content-Type', 'application/json')
              .set('accept', 'json')
              .end((err, res) => {
                if (err) {
                  logger.error('Login error:', JSON.stringify(err))
                  return done()
                }
                accessToken = res.body.accessToken
                done()
              })
          })
          .catch(err => {
            logger.error(err)
            process.exit()
          })
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

  test('GET /users', () => {
    // az adat beszúrás már megvolt a beforeEach() -ben :)
    return supertest(app).get('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)
      .then(response => {
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(tempUser.length)

        response.body.forEach((user, index) => {
          expect(user.name).toBe(tempUser[index].name)
          expect(user.email).toBe(tempUser[index].email)
          expect(user.role).toBe(tempUser[index].role)
        })
      })
  })

  test('GET /users/:id', () => { // egy bizonyos beszúrt rekord adatait ellenőrizzük
    let firstPostId
    return User.insertMany(tempUser) // beszúrjuk a teszt adatokat a jestDB-be
      .then(users => { // visszaadja a felvitt adatokat
        firstPostId = users[0]._id // lekérem az 1. rekord id-jét
        return supertest(app).get(`/users/${firstPostId}`) // majd lekérdezzük az 1. rekordot
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200)
      })
      .then(response => {
        const user = response.body
        expect(user.name).toBe(tempUser[0].name)
        expect(user.email).toBe(tempUser[0].email)
        expect(user.role).toBe(tempUser[0].role)
      })
  })

  test('GET /residents', () => {
    return Resident.insertMany(tempResident) // beszúrjuk a teszt adatokat a jestDB-be
      .then(() => supertest(app).get('/residents') // majd lekérdezzük a felvitt adatokat
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
      )
      .then(response => {
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(tempResident.length)

        response.body.forEach((resident, index) => {
          expect(resident.name).toBe(tempResident[index].name)
          expect(resident.mother).toBe(tempResident[index].mother)
          expect(resident.dob).toBe(tempResident[index].dob)
          expect(resident.dop).toBe(tempResident[index].dop)
          expect(resident.sin).toBe(tempResident[index].sin)
          expect(resident.movin).toBe(tempResident[index].movin)
          expect(resident.movout).toBe(tempResident[index].movout)
        })
      })
  })

  test('GET /residents/:id', () => { // egy bizonyos beszúrt rekord adatait ellenőrizzük
    let firstPostId
    return Resident.insertMany(tempResident) // beszúrjuk a teszt adatokat a jestDB-be
      .then(residents => { // visszaadja a felvitt adatokat
        firstPostId = residents[0]._id // lekérem az 1. rekord id-jét
        return supertest(app).get(`/residents/${firstPostId}`) // majd lekérdezzük az 1. rekordot
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200)
      })
      .then(response => {
        const resident = response.body
        expect(resident.name).toBe(tempResident[0].name)
        expect(resident.mother).toBe(tempResident[0].mother)
        expect(resident.dob).toBe(tempResident[0].dob)
        expect(resident.dop).toBe(tempResident[0].dop)
        expect(resident.sin).toBe(tempResident[0].sin)
        expect(resident.movin).toBe(tempResident[0].movin)
        expect(resident.movout).toBe(tempResident[0].movout)
      })
  })

  test('GET /medicines', () => {
    return Medicine.insertMany(tempMedicine) // beszúrjuk a teszt adatokat a jestDB-be
      .then(() => supertest(app).get('/medicines') // majd lekérdezzük a felvitt adatokat
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
      )
      .then(response => {
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(tempMedicine.length)

        response.body.forEach((medicine, index) => {
          expect(medicine.name).toBe(tempMedicine[index].name)
          expect(medicine.agent).toBe(tempMedicine[index].agent)
          expect(medicine.packing).toBe(tempMedicine[index].packing)
        })
      })
  })

  test('GET /medicines/:id', () => { // egy bizonyos beszúrt rekord adatait ellenőrizzük
    let firstPostId
    return Medicine.insertMany(tempMedicine) // beszúrjuk a teszt adatokat a jestDB-be
      .then(medicines => { // visszaadja a felvitt adatokat
        firstPostId = medicines[0]._id // lekérem az 1. rekord id-jét
        return supertest(app).get(`/medicines/${firstPostId}`) // majd lekérdezzük az 1. rekordot
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200)
      })
      .then(response => {
        const medicine = response.body
        expect(medicine.name).toBe(tempMedicine[0].name)
        expect(medicine.agent).toBe(tempMedicine[0].agent)
        expect(medicine.packing).toBe(tempMedicine[0].packing)
      })
  })

  test('GET /stocks', () => {
    return Stock.insertMany(tempStock) // beszúrjuk a teszt adatokat a jestDB-be
      .then(() => supertest(app).get('/stocks') // majd lekérdezzük a felvitt adatokat
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
      )
      .then(response => {
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(tempStock.length)

        response.body.forEach((stock, index) => {
          expect(stock._id).toBe(tempStock[index]._id)
          expect(stock.pills).toBe(tempStock[index].pills)
          expect(stock.recipes).toBe(tempStock[index].recipes)
        })
      })
  })

  test('GET /stocks/:id', () => { // egy bizonyos beszúrt rekord adatait ellenőrizzük
    let firstPostId
    return Stock.insertMany(tempStock) // beszúrjuk a teszt adatokat a jestDB-be
      .then(stocks => { // visszaadja a felvitt adatokat
        firstPostId = stocks[0]._id // lekérem az 1. rekord id-jét
        return supertest(app).get(`/stocks/${firstPostId}`) // majd lekérdezzük az 1. rekordot
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200)
      })
      .then(response => {
        const stock = response.body
        expect(stock._id).toBe(tempStock[0]._id)
        expect(stock.pills).toBe(tempStock[0].pills)
        expect(stock.recipes).toBe(tempStock[0].recipes)
      })
  })

  test('GET /medications', () => {
    return Medication.insertMany(tempMedication) // beszúrjuk a teszt adatokat a jestDB-be
      .then(() => supertest(app).get('/medications') // majd lekérdezzük a felvitt adatokat
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
      )
      .then(response => {
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(tempMedication.length)

        response.body.forEach((medication, index) => {
          expect(medication._id).toBe(tempMedication[index]._id)
          expect(medication.morning).toBe(tempMedication[index].morning)
          expect(medication.afternoon).toBe(tempMedication[index].afternoon)
          expect(medication.evening).toBe(tempMedication[index].evening)
        })
      })
  })

  test('GET /medications/:id', () => { // egy bizonyos beszúrt rekord adatait ellenőrizzük
    let firstPostId
    return Medication.insertMany(tempMedication) // beszúrjuk a teszt adatokat a jestDB-be
      .then(medications => { // visszaadja a felvitt adatokat
        firstPostId = medications[0]._id // lekérem az 1. rekord id-jét
        return supertest(app).get(`/medications/${firstPostId}`) // majd lekérdezzük az 1. rekordot
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200)
      })
      .then(response => {
        const medication = response.body
        expect(medication._id).toBe(tempMedication[0]._id)
        expect(medication.morning).toBe(tempMedication[0].morning)
        expect(medication.afternoon).toBe(tempMedication[0].afternoon)
        expect(medication.evening).toBe(tempMedication[0].evening)
      })
  })
})
