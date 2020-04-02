import { AxiosRequestConfig } from 'axios';
import { QRCodeToDataURLOptions, toDataURL } from 'qrcode';
import { v4 as uuidV4 } from 'uuid';

import { ApiUrls, AppUrls, DiscoveryUrls, http, LiftResponse, LoginParameters, LoginResponse } from './http';

export class NubankAuthorizer {
  public async getLiftId(options?: QRCodeToDataURLOptions): Promise<{ uuid: string; qrCode: string }> {
    const uuid = uuidV4();
    const qrCode = await toDataURL(uuid, options);

    return { uuid, qrCode };
  }

  public async login(login: string, password: string): Promise<LoginResponse> {
    const apiUrls = (await http.request.get<ApiUrls>(DiscoveryUrls.API)).data;
    const { data } = await http.request.post<LoginResponse>(apiUrls.login, {
      grant_type: LoginParameters.GRANT_TYPE,
      client_id: LoginParameters.CLIENT_ID,
      client_secret: LoginParameters.CLIENT_SECRET,
      login,
      password,
    });

    return data;
  }

  public async lift(uuid: string, accessToken: string, retries?: number): Promise<LiftResponse> {
    const actualRetries = retries && retries <= 15 && retries >= 1 ? retries : 0;
    const appUrls = (await http.request.get<AppUrls>(DiscoveryUrls.APP)).data;
    const body = { qr_code_id: uuid, type: LoginParameters.LOGIN_TYPE };
    const config = {
      'axios-retry': {
        retries: actualRetries,
        retryDelay: (retryCount) => retryCount * 1000,
        retryCondition: (error) => error.response.status === 404,
      },
    };

    http.setAccessToken(accessToken);

    const { data } = await http.request.post<LiftResponse>(appUrls.lift, body, config as AxiosRequestConfig);

    return data;
  }
}
