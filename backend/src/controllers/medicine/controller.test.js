const { mockRequest, mockResponse } = require('jest-mock-req-res')

const controller = require('./controller')
const service = require('./service')

jest.mock('./service')

describe('medicine controller', () => {
  const mockData = [
    { id: '6113c0ec98d38561776cb49d', name: 'CAMELOX  7,5 mg', agent: 'meloxicam', packing: '50' },
    { id: '6113c0ec98d38561776cb49e', name: 'Ibandronsav Teva  50 mg', agent: 'ibandronic acid', packing: '28' },
    { id: '6113c0ec98d38561776cb49f', name: 'HISTISYNT 5 mg', agent: 'levocetirizine', packing: '30' }
  ]

  let response
  const nextFunction = jest.fn()

  beforeEach(() => {
    service.__setMockData(mockData)
    response = mockResponse()
  })

  test('find one with valid id', () => {
    const ITEM_ID = '6113c0ec98d38561776cb49d'
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
