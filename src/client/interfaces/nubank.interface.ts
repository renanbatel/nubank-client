import { Bills } from '../../resources';
import { Credentials } from '../types';

export interface Nubank {
  setCredentials(credentials: Credentials);
  generateQRCode(): Promise<string>;
  authenticate(retries?: number): Promise<void>;
  getBills(): Promise<Bills>;
}
