import { Authenticator } from '../interfaces';

export type NubankOptions = {
  login: string;
  password: string;
  authenticator?: Authenticator;
};
