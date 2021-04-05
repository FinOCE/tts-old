export default class Award {
    public name: string
    public description: string
    public count: number
    public icon: string

    constructor(data: Record<string, any>) {
        this.name = data.name
        this.description = data.description
        this.count = data.count
        this.icon = data.icon_url
    }
}