const { mockRequest, mockResponse } = require('jest-mock-req-res')
const createError = require('http-errors')

const personController = require('./person.controller')
const personService = require('./person.service')

jest.mock('./person.service') // ebből tudja a jest, hogy a mocks mappából kell a service-t vennie és nem az eredetivel kell dolgoznia

describe('person controller', () => {
  const mockData = [{
    "id": 1,
    "first_name": "Fiorenze",
    "last_name": "Dyneley",
    "email": "fdyneley0@narod.ru"
    }, {
    "id": 2,
    "first_name": "Owen",
    "last_name": "Jirka",
    "email": "ojirka1@squidoo.com"
    }, {
    "id": 3,
    "first_name": "Terra",
    "last_name": "Hurdman",
    "email": "thurdman2@reverbnation.com"
    }, {
    "id": 4,
    "first_name": "Thomasin",
    "last_name": "de Keep",
    "email": "tdekeep3@fc2.com"
    }, {
    "id": 5,
    "first_name": "Lawrence",
    "last_name": "Tearle",
    "email": "ltearle4@infoseek.co.jp"
    }];
  
  let response
  const nextFunction = jest.fn()
  
  beforeEach(() => { // a beforeEach minden teszt eset előtt lefut, beállítja a szükséges értékeket
    personService.__setMockData(mockData)
    response = mockResponse(); // készít egy HTTP-szerű választ, ami a teszthez kell majd
  })

  // a tesztek futtatása
  test('find one with valid id', () => {
    const PERSON_ID = 1
    const request = mockRequest({ // HTTP szerű request obj-t csinál
      params: {
        id: PERSON_ID
      }
    })

    return personController.findOne(request, response, nextFunction)
      .then(() => {
        expect(personService.findOne).toBeCalledWith(PERSON_ID)
        expect(response.json).toBeCalledWith(
          mockData.find(p=>p.id===PERSON_ID)
        )
      })
  })
})