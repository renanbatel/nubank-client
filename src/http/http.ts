import axios, { AxiosInstance } from 'axios';

export class Http {
  private axiosInstance: AxiosInstance;
  private authToken: string;

  constructor() {
    this.axiosInstance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'X-Correlation-Id': 'WEB-APP.pewW9',
        'User-Agent': 'nubank-client - https://github.com/renanbatel/nubank-client',
        Origin: 'https://conta.nubank.com.br',
        Referer: 'https://conta.nubank.com.br',
      },
    });
    this.authToken = null;

    this.axiosInstance.interceptors.request.use((config) => {
      if (!config.headers['Authorization'] && this.authToken) {
        config.headers['Authorization'] = `Bearer ${this.authToken}`;
      }

      return config;
    });
  }

  public setAuthToken(authToken: string): void {
    this.authToken = authToken;
  }

  get request(): AxiosInstance {
    return this.axiosInstance;
  }
}

export const http = new Http();
