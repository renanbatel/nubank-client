import { QRCodeToDataURLOptions, toDataURL } from 'qrcode';
import { v4 as uuidV4 } from 'uuid';

import { http } from './http';
import { DiscoveryUrls } from './http/enums';
import { ApiUrls, AppUrls } from './http/types';

export class Nubank {
  public apiUrls: ApiUrls;
  public appUrls: AppUrls;

  public async loadUrls(): Promise<void> {
    this.apiUrls = (await http.request.get<ApiUrls>(DiscoveryUrls.API)).data;
    this.appUrls = (await http.request.get<AppUrls>(DiscoveryUrls.APP)).data;
  }

  public async getLiftId(options?: QRCodeToDataURLOptions): Promise<{ uuid: string; qrCode: string }> {
    const uuid = uuidV4();
    const qrCode = await toDataURL(uuid, options);

    return { uuid, qrCode };
  }
}
