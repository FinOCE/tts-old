import Listing from '../Listing'
import Post from '../Post'

export default class PostListing extends Listing {
    public children: Array<Post>

    constructor(data: Record<string, any>, minComments: number = 0) {
        super(data)
        this.children = data.data.children.map((post: Record<string, any>) => {return new Post(post)}).filter((post: Post) => post.comments! > minComments)
        this.length = this.children.length
    }
}