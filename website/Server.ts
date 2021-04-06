import express from 'express'

import Client from '../client/Client'

export default function Server(client: Client) {
    const app = express()

    app.get('/', (req, res) => {
        client.emit('connection')
        res.sendFile(__dirname + '/index.html')
    })

    app.get('/:file', (req, res) => {
        res.sendFile(__dirname + `/${req.params.file}`)
    })

    app.listen(1234)
    console.log('Server is now online')
}