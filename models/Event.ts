import Client from './Client'

export default abstract class Event {
  client: Client

  constructor(client: Client) {
    this.client = client
  }

  abstract run(...args: any[]): void | Promise<void>
}
