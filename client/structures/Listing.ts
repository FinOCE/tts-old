import Post from './Post'

export default class Listing {
    public dist: number
    public children: Array<any>
    public after: string | null
    public before: string | null
    public length: number

    constructor(data: Record<string, any>) {
        this.dist = data.data.dist
        this.children = data.data.children
        this.after = data.data.after
        this.before = data.data.before
        this.length = this.children.length
    }

    get(i: number) {
        return this.children[i]
    }

    set(i: number, value: any) {
        this.children[i] = value
    }
}