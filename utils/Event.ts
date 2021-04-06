import Client from '../client/Client'

export default abstract class Event {
    client: Client

    constructor(client: Client) {
        this.client = client
    }
    
    abstract run(...args: Array<any>): void | Promise<void>
}