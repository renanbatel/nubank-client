const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export function generateCorrelationId(): string {
  let id: string

  for (id = ''; id.length < 5; ) {
    id += characters[Math.floor(Math.random() * characters.length)]
  }

  return id
}
