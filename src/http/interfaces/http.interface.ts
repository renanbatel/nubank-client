import { AxiosInstance } from 'axios'

export interface Http {
  request: AxiosInstance
  setAccessToken(accessToken: string)
}
