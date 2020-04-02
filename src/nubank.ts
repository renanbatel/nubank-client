import { BillsSummaryResponse, FeaturesUrls, http, LiftResponse } from './http';
import { Bills } from './resources';

export class Nubank {
  private featuresUrls: FeaturesUrls;

  constructor(liftResponse: LiftResponse) {
    this.featuresUrls = liftResponse._links;

    http.setAccessToken(liftResponse.access_token);
  }

  public async getBills(): Promise<Bills> {
    const { data } = await http.request.get<BillsSummaryResponse>(this.featuresUrls.bills_summary.href);
    const bills = new Bills(data);

    return bills;
  }
}
