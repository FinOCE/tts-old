import fetch from 'node-fetch'
import {URLSearchParams} from 'url'
import {EventEmitter} from 'events'

import Post from './structures/Post'
import PostListing from './structures/Listings/PostListing'
import Comment from './structures/Comment'
import CommentListing from './structures/Listings/CommentListing'

export default class Client extends EventEmitter {
    private token?: string

    constructor() {
        super()
    }

    async login(clientID: string, clientSecret: string) {
        await fetch('https://www.reddit.com/api/v1/access_token', {
            method: 'POST',
            body: new URLSearchParams({
                grant_type: 'client_credentials'
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${clientID}:${clientSecret}`).toString('base64')}`
            }
        }).then(res => res.json()).then(token => {
            if (token.error) throw `Error ${token.error}: ${token.message}`
            this.token = token.access_token
            this.emit('ready')
        }).catch(err => console.error(err))
    }

    async getTopPosts(sub: string, t: string = 'day'): Promise<PostListing> {
        // Options for "t" are: hour, day, week, month, year, all
        return await fetch(`https://oauth.reddit.com/r/${sub}/top?t=${t}`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }).then(res => res.json())
        .then(data => {
            return new PostListing(data, 200)
        })
    }

    async getTopComments(post: Post): Promise<Post> {
        return await fetch('https://oauth.reddit.com' + post.relativeURL, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }).then(res => res.json())
        .then(data => {
            post.comments = new CommentListing(data[1], 200)
            return post
        })
    }
}