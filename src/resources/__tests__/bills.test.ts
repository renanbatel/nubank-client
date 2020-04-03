import { BillStates, BillSummary } from '../../http';
import { RecursivePartial } from '../types';
import { Bills } from './../bills';

type SetUpEntities = {
  bills: Bills;
};

function setUp(params: { bills?: Array<RecursivePartial<BillSummary>> }): SetUpEntities {
  const bills = new Bills({
    _links: {
      future: { href: 'foo' },
      open: { href: 'bar' },
    },
    bills: params.bills as BillSummary[],
  });

  return { bills };
}

describe('Nubank', () => {
  describe('findBillSummary', () => {
    it('should find the bill for provided parameters and return it', () => {
      const expectedResult = {
        state: BillStates.OPEN,
        summary: { close_date: '2020-12-12' },
      };
      const { bills } = setUp({ bills: [expectedResult] });
      const result = bills.findBillSummary({ summary: { close_date: '2020-12-12' } });

      expect(result).toEqual(expectedResult);
    });
  });
});
