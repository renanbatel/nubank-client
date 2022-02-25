import { BillSummary } from './resources'

export type BillsSummaryResponse = {
  bills: BillSummary[]
  _links: {
    open: { href: string }
    future: { href: string }
  }
}
