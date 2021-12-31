import fetch from 'node-fetch'
import { EventEmitter } from 'events'
import Listing from './Listing'
import Post, { PostData } from './Post'

type PostTime = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all'

export default class Client extends EventEmitter {
  private token?: string

  constructor() {
    super()
    this.initializeEvents()
  }

  async login(clientId: string | undefined, clientSecret: string | undefined) {
    if (!clientId || !clientSecret)
      throw 'Logging in requires a client ID and secret'

    await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'client_credentials'
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString('base64')}`
      }
    })
      .then(res => res.json())
      .then(token => {
        if (token.error) throw `Error ${token.error}: ${token.message}`
        this.token = token.access_token
        this.emit('ready')
      })
  }

  private async initializeEvents() {
    this.on('ready', () => new (require('../events/ready').default)(this).run())
  }

  public async getPosts(subreddit: string, sort: string, duration: string) {
    if (!this.token) throw 'Client must be logged in to use getPosts'

    const result = await fetch(
      `https://oauth.reddit.com/r/${subreddit}/${sort}?t=${duration}`,
      { headers: { authorization: `Bearer ${this.token}` } }
    ).then(res => res.json())

    return new Listing<PostData, Post>(result, Post).entries
  }
}
