import { BillItem, BillSummary } from './resources'

export type FutureBillResponse = {
  bills: Array<BillSummary & { line_items: BillItem[] }>
  _links: {
    open: { href: string }
    future: { href: string }
  }
}
