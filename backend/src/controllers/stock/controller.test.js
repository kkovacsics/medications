const { mockRequest, mockResponse } = require('jest-mock-req-res')

const controller = require('./controller')
const service = require('./service')

jest.mock('./service')

describe('stock controller', () => {
  const mockData = [
    { id: '6113f20cc890e423bab5aa20', residentId: '6113c07e28bdb69261a4ebe9', medicineId: '6113c0ec98d38561776cb4bc', pills: '89', recipes: '0' },
    { id: '611404638465adc6db79d4d1', residentId: '6113c07e28bdb69261a4ebe9', medicineId: '6113c0ec98d38561776cb4b1', pills: '120', recipes: '0' },
    { id: '61140743e234321237e2839a', residentId: '6113c07e28bdb69261a4ebff', medicineId: '6113c0ec98d38561776cb4a7', pills: '42', recipes: '0' }
  ]

  let response
  const nextFunction = jest.fn()

  beforeEach(() => {
    service.__setMockData(mockData)
    response = mockResponse()
  })

  test('find one with valid id', () => {
    const ITEM_ID = '6113f20cc890e423bab5aa20'
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
