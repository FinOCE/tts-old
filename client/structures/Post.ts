import Award from './Award'
import CommentListing from './Listings/CommentListing'

export default class Post {
    public subreddit: string
    public title: string
    public upvotes: number
    public awards: Array<Award>
    public createdAt: number
    public author: string
    public completeURL: string
    public relativeURL: string
    public comments?: CommentListing | number

    constructor(data: Record<string, any>) {
        const awards: Array<Award> = []
        data.data.all_awardings.forEach((award: Record<string, any>) => {
            awards.push(new Award(award))
        })
        this.subreddit = data.data.subreddit_name_prefixed
        this.title = data.data.title
        this.upvotes = data.data.ups
        this.awards = awards
        this.createdAt = data.data.created_utc
        this.author = data.data.author
        this.completeURL = data.data.url
        this.relativeURL = data.data.permalink
        this.comments = data.data.num_comments
    }
}