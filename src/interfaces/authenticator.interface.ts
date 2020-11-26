import { LiftResponse, LoginResponse } from '../http';
import { LiftToken } from '../types';

export interface Authenticator {
  generateLiftToken(): Promise<LiftToken>;
  login(login: string, password: string): Promise<LoginResponse>;
  lift(uuid: string, accessToken: string): Promise<LiftResponse>;
}
