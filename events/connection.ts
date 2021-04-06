import Event from '../utils/Event'
import Client from '../client/Client';

export default abstract class Ready extends Event {
    constructor(client: Client) {
        super(client)
    }

    async run() {
        console.log('Web client has connected to the application')
    }
}