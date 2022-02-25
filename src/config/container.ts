import { Container } from 'inversify'

import { DefaultAuthenticator, DefaultNubank } from '../client'
import { DefaultHttp } from '../http'
import { DefaultBills } from '../resources'
import { Services } from './constants'

export const container = new Container()

/**
 * Singleton scope
 */
container.bind(Services.Http).to(DefaultHttp).inSingletonScope()

/**
 * Transient scope
 */
container.bind(Services.Authenticator).to(DefaultAuthenticator)
container.bind(Services.Nubank).to(DefaultNubank)
container.bind(Services.Bills).to(DefaultBills)
