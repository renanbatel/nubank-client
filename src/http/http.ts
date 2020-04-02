import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';

import { generateCorrelationId } from '../util';

export class Http {
  private axiosInstance: AxiosInstance;
  private accessToken: string;

  constructor() {
    const axiosInstance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'nubank-client - https://github.com/renanbatel/nubank-client',
        Origin: 'https://conta.nubank.com.br',
        Referer: 'https://conta.nubank.com.br',
      },
    });

    axiosInstance.interceptors.request.use(this.correlationIdInterceptor.bind(this));
    axiosInstance.interceptors.request.use(this.authTokenInterceptor.bind(this));
    axiosRetry(axiosInstance, { retries: 0 });

    this.axiosInstance = axiosInstance;
    this.accessToken = null;
  }

  private correlationIdInterceptor(config: AxiosRequestConfig): AxiosRequestConfig {
    const id = generateCorrelationId();

    config.headers['X-Correlation-Id'] = `WEB-APP.${id}`;

    return config;
  }

  private authTokenInterceptor(config: AxiosRequestConfig): AxiosRequestConfig {
    if (!config.headers['Authorization'] && this.accessToken) {
      config.headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    return config;
  }

  public setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
  }

  get request(): AxiosInstance {
    return this.axiosInstance;
  }
}

export const http = new Http();
