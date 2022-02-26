import { inject, injectable, Lifecycle, registry } from 'tsyringe'

import { BillsSummaryResponse, DefaultHttp, FeaturesUrls, Http } from '../http'
import { Bills, DefaultBills } from '../resources'
import { DefaultAuthenticator } from '.'
import { Authenticator, Nubank } from './interfaces'
import { Credentials } from './types'

@injectable()
@registry([
  { token: 'Authenticator', useToken: DefaultAuthenticator },
  { token: 'Http', useToken: DefaultHttp },
  { token: 'Bills', useToken: DefaultBills },
])
export class DefaultNubank implements Nubank {
  private credentials: Credentials
  private featuresUrls: FeaturesUrls
  private uuid: string

  constructor(
    @inject('Authenticator')
    private authenticator: Authenticator,
    @inject('Http')
    private http: Http,
    @inject('Bills')
    private bills: Bills,
  ) {}

  public setCredentials(credentials: Credentials) {
    this.credentials = credentials
  }

  public async generateQRCode(): Promise<string> {
    const { qrCode, uuid } = await this.authenticator.generateLiftToken()

    this.uuid = uuid

    return qrCode
  }

  public async authenticate(retries = 15) {
    const { login, password } = this.credentials
    const { access_token: accessToken } = await this.authenticator.login(login, password)
    const { _links: featuresUrls } = await this.authenticator.lift(this.uuid, accessToken, retries)

    this.featuresUrls = featuresUrls
  }

  public async getBills(): Promise<Bills> {
    const { data: billsSummaryResponse } = await this.http.request.get<BillsSummaryResponse>(this.featuresUrls.bills_summary.href)

    this.bills.setBillsSummaryResponse(billsSummaryResponse)

    return this.bills
  }
}
