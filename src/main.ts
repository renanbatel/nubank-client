import { Nubank } from './client';
import { container, Services } from './config';
import { InstanceOptions } from './types';

function createInstance(options: InstanceOptions): Nubank {
  const nubank = container.get<Nubank>(Services.Nubank);
  const { login, password } = options;

  nubank.setCredentials({ login, password });

  return nubank;
}

export default {
  createInstance,
};
