import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import axiosRetry from 'axios-retry'
import { injectable } from 'inversify'

import { generateCorrelationId } from '../utils'
import { Http } from './interfaces'

@injectable()
export class DefaultHttp implements Http {
  private axiosInstance: AxiosInstance
  private accessToken: string

  constructor() {
    const axiosInstance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'nubank-client - https://github.com/renanbatel/nubank-client',
        Origin: 'https://conta.nubank.com.br',
        Referer: 'https://conta.nubank.com.br',
      },
    })

    axiosInstance.interceptors.request.use((config) => this.correlationIdInterceptor(config))
    axiosInstance.interceptors.request.use((config) => this.authTokenInterceptor(config))
    axiosRetry(axiosInstance, { retries: 0 })

    this.axiosInstance = axiosInstance
    this.accessToken = undefined
  }

  get request(): AxiosInstance {
    return this.axiosInstance
  }

  private correlationIdInterceptor(config: AxiosRequestConfig): AxiosRequestConfig {
    const id = generateCorrelationId()

    config.headers['X-Correlation-Id'] = `WEB-APP.${id}`

    return config
  }

  private authTokenInterceptor(config: AxiosRequestConfig): AxiosRequestConfig {
    if (!config.headers['Authorization'] && this.accessToken) {
      config.headers['Authorization'] = `Bearer ${this.accessToken}`
    }

    return config
  }

  public setAccessToken(accessToken: string) {
    this.accessToken = accessToken
  }
}
