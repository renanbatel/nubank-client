import { NubankAuthorizer } from '../nubank-authorizer';

type SetUpEntities = {
  nubankAuthorizer: NubankAuthorizer;
};

function setUp(): SetUpEntities {
  const nubankAuthorizer = new NubankAuthorizer();

  return { nubankAuthorizer };
}

describe('nubankAuthorizer', () => {
  describe('getLiftId', () => {
    it('should return the uuid and the qrCode', async () => {
      const { nubankAuthorizer } = setUp();
      const result = await nubankAuthorizer.getLiftId();

      expect(result.uuid).toBeDefined();
      expect(typeof result.uuid).toBe('string');
      expect(result.qrCode).toBeDefined();
      expect(typeof result.qrCode).toBe('string');
    });
  });
});
