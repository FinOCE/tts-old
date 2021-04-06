require('dotenv').config()

import Client from './client/Client'
const client = new Client()

client.on('ready', async () => {
    console.log('Reddit application is now online')

    const posts = await client.getTopPosts('askreddit')
    posts.set(0, await client.getTopComments(posts.get(0)))
})

client.on('connection', async () => {
    console.log('Web client has connected to the application')
})

client.login(process.env.client_id!, process.env.client_secret!)