import { Bill } from './resources';

export type BillsSummaryResponse = {
  bills: Bill[];
  _links: {
    open: { href: string };
    future: { href: string };
  };
};
