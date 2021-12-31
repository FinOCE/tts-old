export interface ListingData<T> {
  kind: 'Listing'
  data: {
    after: string | null
    before: string | null
    dist: number
    geo_filter: string
    modhash: string
    children: ListingChild<T>[]
  }
}

export interface ListingChild<T, K = 't3'> {
  kind: K
  data: T
}

export default class Listing<T1, T2> {
  public entries: T2[]

  public constructor(listing: ListingData<T1>, constructor: new (c: T1) => T2) {
    this.entries = listing.data.children.map(c => new constructor(c.data))
  }
}
