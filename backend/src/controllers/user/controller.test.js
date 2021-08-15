const { mockRequest, mockResponse } = require('jest-mock-req-res')

const controller = require('./controller')
const service = require('./service')

jest.mock('./service')

describe('user controller', () => {
  const mockData = [
    { id: '6112d794701c64ec384c60a8', name: 'Nővér', email: 'nover@gmail.com', password: '$2a$10$FhJpeGd1qMs2IBZR . . . TCe43W9/lbaGOefre', role: '1' },
    { id: '6112d794701c64ec384c60a9', name: 'Főnővér', email: 'fonover@gmail.com', password: '$2a$10$LKms9iC5l9zl3hGA . . . AJi0YkROYnA1meU0m', role: '2' },
    { id: '611412eabdc3b086c9fa7283', name: 'Teszt', email: 'test@gmail.com', password: '$2a$10$CiJboVQUvZAUlLeP . . . IZpdBMZ8NYlrjfs4K', role: '1' }
  ]

  let response
  const nextFunction = jest.fn()

  beforeEach(() => {
    service.__setMockData(mockData)
    response = mockResponse()
  })

  test('find one with valid id', () => {
    const ITEM_ID = '6112d794701c64ec384c60a8'
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
