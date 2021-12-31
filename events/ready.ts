import Event from '../models/Event'
import Client from '../models/Client'

export default abstract class Ready extends Event {
  constructor(client: Client) {
    super(client)
  }

  async run() {
    console.log('Reddit application is now online')
  }
}
