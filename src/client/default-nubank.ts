import { inject, injectable } from 'inversify'

import { Services } from '../config'
import { BillsSummaryResponse, FeaturesUrls, Http } from '../http'
import { Bills } from '../resources'
import { Authenticator, Nubank } from './interfaces'
import { Credentials } from './types'

@injectable()
export class DefaultNubank implements Nubank {
  @inject(Services.Authenticator)
  private authenticator: Authenticator
  @inject(Services.Http)
  private http: Http
  @inject(Services.Bills)
  private bills: Bills
  private credentials: Credentials
  private featuresUrls: FeaturesUrls
  private uuid: string

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
