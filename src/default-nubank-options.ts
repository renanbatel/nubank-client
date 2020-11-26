import { NubankAuthenticator } from './nubank-authenticator';
import { NubankOptions } from './types';

export const defaultNubankOptions: NubankOptions = {
  login: null,
  password: null,
  authenticator: new NubankAuthenticator({ liftRetries: 15 }),
};
