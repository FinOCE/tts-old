import glob from 'glob'
import {parse} from 'path'
require('dotenv').config()

import Client from './client/Client'
const client = new Client()

glob('./events/*.ts', (err: Error | null, events: Array<string>) => {
    if (err) throw err
    events.filter(file => file !== './events/Event.ts').forEach(file => {
        const {name} = parse(file)

        const event = new (require(file).default)(client)
        client.on(name, (...args) => event.run(...args))
    })
})

client.login(process.env.client_id!, process.env.client_secret!)