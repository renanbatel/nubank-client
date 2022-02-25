export class UnprocessableError extends Error {
  constructor(message = 'UnprocessableError') {
    super(message)

    this.name = 'UnprocessableError'
  }
}
