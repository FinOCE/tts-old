import {config} from 'dotenv'
config()
import * as fs from 'fs'

import Client from './client/Client'

const client = new Client()

client.on('ready', async () => {
    console.log('Reddit application is now online')

    const posts = await client.getTopPosts('askreddit')
    for (let i = 0; i < posts.length; i++) {
        const comments = await client.getTopComments(posts.get(0))
        posts.get(i).comments = comments
    }
    fs.writeFileSync('./posts.json', JSON.stringify(posts, null, 4))
})

client.login(process.env.client_id, process.env.client_secret)