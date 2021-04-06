import {config} from 'dotenv'
config()
import * as fs from 'fs'

import Client from './client/Client'

const client = new Client()

client.on('ready', async () => {
    console.log('Reddit application is now online')

    const posts = await client.getTopPosts('askreddit')
    const post = await client.getTopComments(posts.get(0))
    fs.writeFileSync('./post.json', JSON.stringify(post, null, 4))
})

client.login(process.env.client_id, process.env.client_secret)