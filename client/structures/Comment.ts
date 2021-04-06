import Award from './Award'
import CommentListing from './Listings/CommentListing'

export default class Comment {
    public body: string
    public upvotes: number
    public awards: Array<Award>
    public createdAt: number
    public author: string
    public replies?: CommentListing

    constructor(data: Record<string, any>) {
        const awards: Array<Award> = []
        data.data.all_awardings.forEach((award: Record<string, any>) => {
            awards.push(new Award(award))
        })
        this.body = data.data.body
        this.upvotes = data.data.ups
        this.awards = awards
        this.createdAt = data.data.created_utc
        this.author = data.data.author
        if (data.data.replies) this.replies = new CommentListing(data.data.replies, 200)
    }
}