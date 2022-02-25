export class NotFoundError extends Error {
  constructor(message = 'NotFoundError') {
    super(message)

    this.name = 'NotFoundError'
  }
}
