import { Nubank } from '../nubank';

type SetUpEntities = {
  nubank: Nubank;
};

function setUp(): SetUpEntities {
  const nubank = new Nubank();

  return { nubank };
}

describe('nubank', () => {
  describe('getLiftId', () => {
    it('should return the uuid and the qrCode', async () => {
      const { nubank } = setUp();
      const result = await nubank.getLiftId();

      expect(result.uuid).toBeDefined();
      expect(typeof result.uuid).toBe('string');
      expect(result.qrCode).toBeDefined();
      expect(typeof result.qrCode).toBe('string');
    });
  });
});
