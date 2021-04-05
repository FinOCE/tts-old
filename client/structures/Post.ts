import Award from './Award'

export default class Post {
    public subreddit: string
    public title: string
    public upvotes: number
    public awards: Array<Record<string, any>>
    public createdAt: number
    public author: string
    public completeURL: string
    public comments: number

    constructor(data: Record<string, any>) {
        const awards = []
        data.data.all_awardings.forEach(award => {
            awards.push(new Award(award))
        })
        this.subreddit = data.data.subreddit_name_prefixed
        this.title = data.data.title
        this.upvotes = data.data.ups
        this.awards = awards
        this.createdAt = data.data.created_utc
        this.author = data.data.author
        this.completeURL = data.data.url
        this.comments = data.data.num_comments
    }
}