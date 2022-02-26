import { container } from 'tsyringe'

import { DefaultNubank, Nubank } from './client'
import { InstanceOptions } from './types'

export function createInstance(options?: InstanceOptions): Nubank {
  const nubank = container.resolve<Nubank>(DefaultNubank)

  if (options?.login && options?.password) {
    nubank.setCredentials({ login: options.login, password: options.password })
  }

  return nubank
}

export default {
  createInstance,
}
