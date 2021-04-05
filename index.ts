import {config} from 'dotenv'
config()

import Client from './client/Client'

const client = new Client()

client.on('ready', async () => {
    console.log('Reddit application is now online')

    const posts = await client.getTopPosts('askreddit')
    console.log(posts.get(0))
})

client.login(process.env.client_id, process.env.client_secret)