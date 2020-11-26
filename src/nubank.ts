import { defaultNubankOptions } from './default-nubank-options';
import { BillsSummaryResponse, FeaturesUrls, http } from './http';
import { Bills } from './resources';
import { NubankOptions } from './types';

export class Nubank {
  private featuresUrls: FeaturesUrls;
  private options: NubankOptions;
  private uuid: string;

  constructor(options: NubankOptions) {
    this.options = { ...defaultNubankOptions, ...options };
  }

  public async generateQRCode(): Promise<string> {
    const { authenticator } = this.options;
    const { qrCode, uuid } = await authenticator.generateLiftToken();

    this.uuid = uuid;

    return qrCode;
  }

  public async authenticate() {
    const { login, password, authenticator } = this.options;
    const { access_token: accessToken } = await authenticator.login(login, password);
    const { _links: featuresUrls } = await authenticator.lift(this.uuid, accessToken);

    this.featuresUrls = featuresUrls;
  }

  public async getBills(): Promise<Bills> {
    const { data } = await http.request.get<BillsSummaryResponse>(this.featuresUrls.bills_summary.href);
    const bills = new Bills(data);

    return bills;
  }
}
