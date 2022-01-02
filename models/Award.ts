export interface AwardData {
  award_sub_type: 'GLOBAL'
  award_type: 'global'
  awardings_required_to_grant_benefits: null
  coin_price: number
  coin_reward: number
  count: number
  days_of_drip_extension: number
  days_of_premium: number
  description: string
  end_date: null
  giver_coin_reward: null
  icon_format: null
  icon_height: number
  icon_url: string
  icon_width: number
  id: string
  is_enabled: boolean
  is_new: boolean
  name: string
  penny_donate: null
  penny_price: null
  resized_icons: {
    height: number
    url: string
    width: number
  }[]
  resized_static_icons: {
    height: number
    url: string
    width: number
  }[]
  start_date: null
  static_icon_height: number
  static_icon_url: string
  static_icon_width: number
  subreddit_id: null
  tiers_by_required_awardings: null
}

export default class Award {
  public height: number
  public width: number
  public url: string
  public name: string
  public description: string
  public price: number

  public constructor(data: AwardData) {
    this.height = data.icon_height
    this.width = data.icon_width
    this.url = data.icon_url
    this.name = data.name
    this.description = data.description
    this.price = data.coin_price
  }
}
