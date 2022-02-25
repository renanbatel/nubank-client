import { Container, injectable } from 'inversify'

import { Services } from '../../config'
import { BillStates, BillSummary } from '../../http'
import { DefaultBills } from '../default-bills'
import { Bills } from '../interfaces'

describe('DefaultBills', () => {
  let container: Container

  beforeEach(() => {
    container = new Container()

    container.bind(Services.Bills).to(DefaultBills)
  })
  describe('findBillSummary', () => {
    it('should find the bill for provided parameters and return it', () => {
      @injectable()
      class HttpMock {}

      container.bind(Services.Http).to(HttpMock)

      const expectedResult = {
        state: BillStates.OPEN,
        summary: { close_date: '2020-12-12' },
      }
      const bills = container.get<Bills>(Services.Bills)

      bills.setBillsSummaryResponse({
        _links: {
          future: { href: 'foo' },
          open: { href: 'bar' },
        },
        bills: [expectedResult] as BillSummary[],
      })

      const result = bills.findBillSummary({ summary: { close_date: '2020-12-12' } })

      expect(result).toEqual(expectedResult)
    })
  })
})
