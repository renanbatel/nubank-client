import { AxiosRequestConfig } from 'axios';
import { toDataURL } from 'qrcode';
import { v4 as uuidV4 } from 'uuid';

import { ApiUrls, AppUrls, DiscoveryUrls, http, LiftResponse, LoginParameters, LoginResponse } from './http';
import { Authenticator } from './interfaces';
import { LiftToken, NubankAuthenticatorOptions } from './types';

export class NubankAuthenticator implements Authenticator {
  private options: NubankAuthenticatorOptions;

  constructor(options?: NubankAuthenticatorOptions) {
    this.options = options || {};
  }

  public async generateLiftToken(): Promise<LiftToken> {
    const uuid = uuidV4();
    const { qrCodeOptions } = this.options;
    const qrCode = await toDataURL(uuid, qrCodeOptions);

    return { uuid, qrCode };
  }

  public async login(login: string, password: string): Promise<LoginResponse> {
    const { data: apiUrls } = await http.request.get<ApiUrls>(DiscoveryUrls.API);
    const { data } = await http.request.post<LoginResponse>(apiUrls.login, {
      grant_type: LoginParameters.GRANT_TYPE,
      client_id: LoginParameters.CLIENT_ID,
      client_secret: LoginParameters.CLIENT_SECRET,
      login,
      password,
    });

    return data;
  }

  public async lift(uuid: string, accessToken: string): Promise<LiftResponse> {
    const { liftRetries } = this.options;
    const retries = liftRetries && liftRetries <= 15 && liftRetries >= 1 ? liftRetries : 0;
    const { data: appUrls } = await http.request.get<AppUrls>(DiscoveryUrls.APP);
    const body = { qr_code_id: uuid, type: LoginParameters.LOGIN_TYPE };
    const config = {
      'axios-retry': {
        retryDelay: (retryCount) => retryCount * 500,
        retryCondition: (error) => error.response.status === 404,
        retries,
      },
    };

    http.setAccessToken(accessToken);

    const { data: liftResponse } = await http.request.post<LiftResponse>(appUrls.lift, body, config as AxiosRequestConfig);

    http.setAccessToken(liftResponse.access_token);

    return liftResponse;
  }
}
