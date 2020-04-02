import { BillsSummaryResponse, http } from '../http';

export class Bills {
  private billsSummaryResponse: BillsSummaryResponse;

  constructor(billsSummaryResponse: BillsSummaryResponse) {
    this.billsSummaryResponse = billsSummaryResponse;
  }

  public async getOpen() {
    const { data } = await http.request.get(this.billsSummaryResponse._links.open.href);

    return data;
  }
}
