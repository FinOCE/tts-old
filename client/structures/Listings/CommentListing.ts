import Listing from '../Listing'
import Comment from '../Comment'

export default class CommentListing extends Listing {
    public children: Array<Comment>

    constructor(data: Record<string, any>, minUpvotes: number = 0) {
        super(data)
        this.children = data.data.children.filter((comment: Record<string, any>) => comment.data.all_awardings).map((comment: Record<string, any>) => {return new Comment(comment)}).filter((comment: Comment) => comment.upvotes > minUpvotes)
        this.length = this.children.length
    }
}