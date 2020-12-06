import { AxiosRequestConfig } from 'axios';
import { inject, injectable } from 'inversify';
import { QRCodeToDataURLOptions, toDataURL } from 'qrcode';
import { v4 as uuidV4 } from 'uuid';

import { Services } from '../config';
import { ApiUrls, AppUrls, DiscoveryUrls, Http, LiftResponse, LoginParameters, LoginResponse } from '../http';
import { Authenticator } from './interfaces';
import { LiftToken } from './types';

@injectable()
export class DefaultAuthenticator implements Authenticator {
  @inject(Services.Http)
  private http: Http;

  public async generateLiftToken(qrCodeOptions?: QRCodeToDataURLOptions): Promise<LiftToken> {
    const uuid = uuidV4();
    const qrCode = await toDataURL(uuid, qrCodeOptions);

    return { uuid, qrCode };
  }

  public async login(login: string, password: string): Promise<LoginResponse> {
    const { data: apiUrls } = await this.http.request.get<ApiUrls>(DiscoveryUrls.API);
    const { data } = await this.http.request.post<LoginResponse>(apiUrls.login, {
      grant_type: LoginParameters.GRANT_TYPE,
      client_id: LoginParameters.CLIENT_ID,
      client_secret: LoginParameters.CLIENT_SECRET,
      login,
      password,
    });

    return data;
  }

  public async lift(uuid: string, accessToken: string, liftRetries?: number): Promise<LiftResponse> {
    const retries = liftRetries && liftRetries <= 15 && liftRetries >= 1 ? liftRetries : 0;
    const { data: appUrls } = await this.http.request.get<AppUrls>(DiscoveryUrls.APP);
    const body = { qr_code_id: uuid, type: LoginParameters.LOGIN_TYPE };
    const config = {
      'axios-retry': {
        retryDelay: (retryCount) => retryCount * 500,
        retryCondition: (error) => error.response.status === 404,
        retries,
      },
    };

    this.http.setAccessToken(accessToken);

    const { data: liftResponse } = await this.http.request.post<LiftResponse>(appUrls.lift, body, config as AxiosRequestConfig);

    this.http.setAccessToken(liftResponse.access_token);

    return liftResponse;
  }
}
