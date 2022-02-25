import { BillStates } from '../../../enum'

export type BillSummary = {
  id?: string
  state: BillStates
  summary: {
    remaining_balance?: number
    due_date: string
    close_date: string
    late_interest_rate?: string
    past_balance: number
    late_fee?: string
    effective_due_date: string
    total_balance: number
    interest_rate: string
    interest: number
    total_cumulative: number
    paid: number
    minimum_payment: number
    remaining_minimum_payment?: number
    open_date: string
  }
  _links: {
    self: { href: string }
    barcode: { href: string }
    boleto_mail: { href: string }
    invoice_email: { href: string }
  }
}
