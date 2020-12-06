import { inject, injectable } from 'inversify';

import { Services } from '../config';
import { BillResponse, BillsSummaryResponse, BillStates, BillSummary, FutureBillResponse, Http, NotFoundError } from '../http';
import { UnprocessableError } from './error';
import { Bills } from './interfaces';
import { RecursivePartial } from './types';

@injectable()
export class DefaultBills implements Bills {
  @inject(Services.Http)
  private http: Http;
  private billsSummaryResponse: BillsSummaryResponse;

  public setBillsSummaryResponse(billsSummaryResponse: BillsSummaryResponse) {
    this.billsSummaryResponse = billsSummaryResponse;
  }

  public getBillsSummaryResponse(): BillsSummaryResponse {
    return this.billsSummaryResponse;
  }

  public findBillSummary(parameters: RecursivePartial<BillSummary>): BillSummary {
    const bills = this.billsSummaryResponse.bills;
    const reducer = (target: object, parameters: object) => (carry, key) => {
      return carry && typeof parameters[key] === 'object'
        ? Object.keys(parameters[key]).reduce(reducer(target[key], parameters[key]), carry)
        : carry && parameters[key] === target[key];
    };
    const bill = bills.find((bill) => Object.keys(parameters).reduce(reducer(bill, parameters), true));

    if (!bill) {
      throw new NotFoundError('No bill was found for provided parameters');
    }

    return bill;
  }

  public async getOpen(): Promise<BillResponse> {
    const { data } = await this.http.request.get<BillResponse>(this.billsSummaryResponse._links.open.href);

    return data;
  }

  public async getFuture(): Promise<FutureBillResponse> {
    const { data } = await this.http.request.get(this.billsSummaryResponse._links.future.href);

    return data;
  }

  public async getByCloseDate(closeDate: string): Promise<BillResponse> {
    const bill = this.findBillSummary({ summary: { close_date: closeDate } });

    if (bill.state === BillStates.FUTURE) {
      throw new UnprocessableError("You can't get details about an unique future bill, use `getFuture` instead");
    }

    const { data } = await this.http.request.get(bill._links.self.href);

    return data;
  }
}
