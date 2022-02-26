import { mock, MockProxy } from 'jest-mock-extended'
import { container } from 'tsyringe'

import { BillStates, BillSummary, Http } from '../../http'
import { DefaultBills } from '../default-bills'

describe('DefaultBills', () => {
  let httpMock: MockProxy<Http> & Http
  let defaultBills: DefaultBills

  beforeEach(() => {
    httpMock = mock<Http>()

    container.registerInstance<Http>('Http', httpMock)

    defaultBills = container.resolve(DefaultBills)
  })
  afterEach(() => {
    container.clearInstances()
  })
  describe('findBillSummary', () => {
    it('should find the bill for provided parameters and return it', () => {
      const expectedResult = {
        state: BillStates.OPEN,
        summary: { close_date: '2020-12-12' },
      }

      defaultBills.setBillsSummaryResponse({
        _links: {
          future: { href: 'foo' },
          open: { href: 'bar' },
        },
        bills: [expectedResult] as BillSummary[],
      })

      const result = defaultBills.findBillSummary({ summary: { close_date: '2020-12-12' } })

      expect(result).toEqual(expectedResult)
    })
  })
})
