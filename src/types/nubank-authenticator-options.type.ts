import { QRCodeToDataURLOptions } from 'qrcode';

export type NubankAuthenticatorOptions = {
  qrCodeOptions?: QRCodeToDataURLOptions;
  liftRetries?: number;
};
