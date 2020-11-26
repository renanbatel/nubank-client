import { NubankAuthenticator } from '../nubank-authenticator';

type SetUpEntities = {
  nubankAuthenticator: NubankAuthenticator;
};

function setUp(): SetUpEntities {
  const nubankAuthenticator = new NubankAuthenticator();

  return { nubankAuthenticator };
}

describe('NubankAuthenticator', () => {
  describe('getLiftId', () => {
    it('should return the uuid and the qrCode', async () => {
      const { nubankAuthenticator } = setUp();
      const result = await nubankAuthenticator.generateLiftToken();

      expect(result.uuid).toBeDefined();
      expect(typeof result.uuid).toBe('string');
      expect(result.qrCode).toBeDefined();
      expect(typeof result.qrCode).toBe('string');
    });
  });
});
