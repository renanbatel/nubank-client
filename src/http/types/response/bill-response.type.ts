import { BillItem, BillSummary } from './resources';

export type BillResponse = {
  bill: BillSummary & { line_items: BillItem[] };
};
