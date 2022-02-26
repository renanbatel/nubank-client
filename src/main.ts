import { container } from 'tsyringe'

import { DefaultNubank, Nubank } from './client'
import { InstanceOptions } from './types'

export function createInstance(options: InstanceOptions): Nubank {
  const nubank = container.resolve<Nubank>(DefaultNubank)
  const { login, password } = options

  nubank.setCredentials({ login, password })

  return nubank
}

export default {
  createInstance,
}
