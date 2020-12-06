import { QRCodeToDataURLOptions } from 'qrcode';

import { LiftResponse, LoginResponse } from '../../http';
import { LiftToken } from '../types';

export interface Authenticator {
  generateLiftToken(qrCodeOptions?: QRCodeToDataURLOptions): Promise<LiftToken>;
  login(login: string, password: string): Promise<LoginResponse>;
  lift(uuid: string, accessToken: string, liftRetries?: number): Promise<LiftResponse>;
}
