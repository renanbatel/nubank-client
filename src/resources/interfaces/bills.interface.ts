import { BillResponse, BillsSummaryResponse, BillSummary, FutureBillResponse } from '../../http';
import { RecursivePartial } from '../types';

export interface Bills {
  setBillsSummaryResponse(billsSummaryResponse: BillsSummaryResponse);
  getBillsSummaryResponse(): BillsSummaryResponse;
  findBillSummary(parameters: RecursivePartial<BillSummary>): BillSummary;
  getOpen(): Promise<BillResponse>;
  getFuture(): Promise<FutureBillResponse>;
  getByCloseDate(closeDate: string): Promise<BillResponse>;
}
