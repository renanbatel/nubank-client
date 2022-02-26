import { inject, injectable, registry } from 'tsyringe'

import { BillResponse, BillsSummaryResponse, BillStates, BillSummary, DefaultHttp, FutureBillResponse, Http, NotFoundError } from '../http'
import { UnprocessableError } from './error'
import { Bills } from './interfaces'
import { RecursivePartial } from './types'

@injectable()
@registry([{ token: 'Http', useToken: DefaultHttp }])
export class DefaultBills implements Bills {
  private billsSummaryResponse: BillsSummaryResponse

  constructor(
    @inject('Http')
    private http: Http,
  ) {}

  public setBillsSummaryResponse(billsSummaryResponse: BillsSummaryResponse) {
    this.billsSummaryResponse = billsSummaryResponse
  }

  public getBillsSummaryResponse(): BillsSummaryResponse {
    return this.billsSummaryResponse
  }

  public findBillSummary(parameters: RecursivePartial<BillSummary>): BillSummary {
    const bills = this.billsSummaryResponse.bills
    const reducer =
      (target: object, parameters: object) =>
      (carry: boolean, key: keyof BillSummary): boolean => {
        if (carry && typeof parameters[key] === 'object') {
          return Object.keys(parameters[key] as object).reduce(reducer(target[key] as object, parameters[key] as object), carry)
        }

        return carry && parameters[key] === target[key]
      }
    const bill = bills.find((bill) => Object.keys(parameters).reduce(reducer(bill, parameters), true))

    if (!bill) {
      throw new NotFoundError('No bill was found for provided parameters')
    }

    return bill
  }

  public async getOpen(): Promise<BillResponse> {
    const { data } = await this.http.request.get<BillResponse>(this.billsSummaryResponse._links.open.href)

    return data
  }

  public async getFuture(): Promise<FutureBillResponse> {
    const { data } = await this.http.request.get<FutureBillResponse>(this.billsSummaryResponse._links.future.href)

    return data
  }

  public async getByCloseDate(closeDate: string): Promise<BillResponse> {
    const bill = this.findBillSummary({ summary: { close_date: closeDate } })

    if (bill.state === BillStates.FUTURE) {
      throw new UnprocessableError("You can't get details about an unique future bill, use `getFuture` instead")
    }

    const { data } = await this.http.request.get<BillResponse>(bill._links.self.href)

    return data
  }
}
