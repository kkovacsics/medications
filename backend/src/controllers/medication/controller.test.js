const { mockRequest, mockResponse } = require('jest-mock-req-res')

const controller = require('./controller')
const service = require('./service')

jest.mock('./service')

describe('medication controller', () => {
  const mockData = [
    { id: '6113f763b78b71369ff59d5c', residentId: '6113c07e28bdb69261a4ebe9', medicineId: '6113c0ec98d38561776cb4bc', morning: '1', afternoon: '3', evening: '1' },
    { id: '6113fb77a0d695040b3e52f9', residentId: '6113c07e28bdb69261a4ebe9', medicineId: '6113c0ec98d38561776cb4b1', morning: '2', afternoon: '0', evening: '2' },
    { id: '6114072718b65b4ea8d2ebe4', residentId: '6113c07e28bdb69261a4ebff', medicineId: '6113c0ec98d38561776cb4a7', morning: '2', afternoon: '0', evening: '0' }
  ]

  let response
  const nextFunction = jest.fn()

  beforeEach(() => {
    service.__setMockData(mockData)
    response = mockResponse()
  })

  test('find one with valid id', () => {
    const ITEM_ID = '6113f763b78b71369ff59d5c'
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
