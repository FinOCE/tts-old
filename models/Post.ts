import Award, { AwardData } from './Award'

export type PostTime = 'hour' | 'day' | 'week' | 'month' | 'year' | 'all'

// MANY TYPES MAY BE INACCURATE OR MISSING
export interface PostData {
  all_awardings: AwardData[]
  allow_live_comments: boolean
  approved_at_utc: number | null
  approved_by: string | null
  archived: boolean
  author: string
  author_flair_background_color: string | null
  author_flair_css_class: null
  author_flair_richtext: never[]
  author_flair_template_id: null
  author_flair_text: null
  author_flair_text_color: string
  author_flair_type: 'text'
  author_fullname: string
  author_is_blocked: boolean
  author_patreon_flair: boolean
  author_premium: boolean
  awarders: unknown[]
  banned_at_utc: number | null
  banned_by: string | null
  can_gild: boolean
  can_mod_post: boolean
  category: null
  clicked: boolean
  content_categories: null
  contest_mode: boolean
  created: number
  created_utc: number
  discussion_type: null
  distinguished: null
  domain: string
  downs: number
  edited: boolean
  gilded: number
  gildings: {
    gid_1: number
  }
  hidden: boolean
  hide_score: boolean
  id: string
  is_created_from_ads_ui: boolean
  is_crosspostable: boolean
  is_meta: boolean
  is_original_content: boolean
  is_reddit_media_domain: boolean
  is_robot_indexable: boolean
  is_self: boolean
  is_video: boolean
  likes: null
  link_flair_background_color: string | null
  link_flair_css_class: null
  link_flair_richtext: never[]
  link_flair_template_id: null
  link_flair_text: string | null
  link_flair_text_color: string
  link_flair_type: 'text'
  locked: boolean
  media: null
  media_embed: unknown
  media_only: boolean
  mod_note: null
  mod_reason_by: null
  mod_reason_title: null
  mod_reports: never[]
  name: string
  no_follow: boolean
  num_comments: number
  num_crossposts: number
  num_reports: null
  over_18: boolean
  parent_whitelist_status: string
  permalink: string
  pinned: boolean
  preview?: {
    images: {
      id: string
      resolutions: {
        url: string
        height: number
        width: number
      }[]
      source: {
        url: string
        height: number
        width: number
      }
      variants: unknown
    }[]
  }
  pwls: number
  quarantine: boolean
  removal_reason: null
  removed_by: null
  removed_by_category: null
  report_reasons: null
  saved: boolean
  score: number
  secure_media: null
  secure_media_embed: unknown
  selftext: string
  selftext_html: null
  send_replies: boolean
  spoiler: boolean
  stickied: boolean
  subreddit: string
  subreddit_id: string
  subreddit_name_prefixed: string
  subreddit_subscribers: number
  subreddit_type: 'public'
  suggested_sort: null
  thumbnail: string
  title: string
  top_awarded_type: null
  total_awards_received: number
  treatment_tags: never[]
  ups: number
  upvote_ratio: number
  url: string
  url_overridden_by_dest?: string
  user_reports: never[]
  view_count: null
  visited: boolean
  whitelist_status: string
  wls: number
}

export default class Post {
  public title: string
  public author: string
  public timestamp: number
  public nsfw: boolean
  public stickied: boolean
  public comments: number
  public subreddit: string
  public permalink: string
  public karma: {
    upvotes: number
    downvotes: number
    total: number
    ratio: number
  }
  public awards: Award[]

  public constructor(data: PostData) {
    this.title = data.title
    this.author = data.author
    this.timestamp = data.created_utc
    this.nsfw = data.over_18
    this.stickied = data.stickied
    this.comments = data.num_comments
    this.subreddit = data.subreddit
    this.permalink = data.permalink
    this.karma = {
      upvotes: Math.round(data.ups / data.upvote_ratio),
      downvotes: Math.round(data.ups / data.upvote_ratio - data.ups),
      total: data.score,
      ratio: data.upvote_ratio
    }
    this.awards = data.all_awardings.map(a => new Award(a))
  }
}
