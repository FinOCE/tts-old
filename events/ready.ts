import Event from '../utils/Event'
import Client from '../client/Client';

export default abstract class Ready extends Event {
    constructor(client: Client) {
        super(client)
    }

    async run() {
        console.log('Reddit application is now online')

        const posts = await this.client.getTopPosts('askreddit')
        posts.set(0, await this.client.getTopComments(posts.get(0)))
    }
}