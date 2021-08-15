const { mockRequest, mockResponse } = require('jest-mock-req-res')

const controller = require('./controller')
const service = require('./service')

jest.mock('./service')

describe('resident controller', () => {
  const mockData = [
    { id: '6113c059a0821e4d55d47d8d', name: 'Jobbágy László', mother: 'Csörgő Rozália', dob: '1953.03.16', dop: 'Körmend', sin: '575 535 704', movin: '2016.06.12', movout: '' },
    { id: '6113c07e28bdb69261a4ebe1', name: 'Andirkó Sándor', mother: 'Rácz Mária', dob: '1947.02.16', dop: 'Bükkszentkereszt', sin: '447 217 734', movin: '2009.01.05', movout: '' },
    { id: '6113c07e28bdb69261a4ebe2', name: 'Tóth Alexandra Anett', mother: 'Kántor Judit Tímea', dob: '1943.04.22', dop: 'Hencse', sin: '329 535 510', movin: '2012.02.04', movout: '' }
  ]

  let response
  const nextFunction = jest.fn()

  beforeEach(() => {
    service.__setMockData(mockData)
    response = mockResponse()
  })

  test('find one with valid id', () => {
    const ITEM_ID = '6113c059a0821e4d55d47d8d'
    const request = mockRequest({
      params: {
        id: ITEM_ID
      }
    })

    return controller.findOne(request, response, nextFunction)
      .then(() => {
        expect(service.findOne).toBeCalledWith(ITEM_ID)
        expect(response.json).toBeCalledWith(
          mockData.find(item => item.id === ITEM_ID)
        )
      })
  })
})
