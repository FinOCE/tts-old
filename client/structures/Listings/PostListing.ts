import Listing from '../Listing'
import Post from '../Post'

export default class PostListing extends Listing {
    public children: Array<Post>

    constructor(data: Record<string, any>) {
        super(data)
        this.children = data.data.children.map((post: Record<string, any>) => {return new Post(post)}).filter((post: Post) => post.comments > 200)
        this.length = this.children.length
    }
}