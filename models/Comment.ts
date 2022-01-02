import Award, { AwardData } from './Award'
import Listing, { ListingData } from './Listing'

export interface CommentData {
  all_awardings: AwardData[]
  approved_at_utc: number | null
  approved_by: string | null
  archived: boolean
  associated_award: null
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
  body: string
  body_html: string
  can_gild: boolean
  can_mod_post: boolean
  collapsed: boolean
  collapsed_because_of_crowd_control: null
  collapsed_reason: null
  collapsed_reason_code: null
  controversiality: number
  created: number
  created_utc: number
  depth: number
  distinguished: null
  downs: number
  edited: boolean
  gilded: number
  gildings: {
    gid_1: number
  }
  id: string
  is_submitter: boolean
  likes: null
  link_id: string
  locked: boolean
  mod_note: null
  mod_reason_by: null
  mod_reason_title: null
  mod_reports: unknown[]
  name: string
  no_follow: boolean
  num_reports: null
  parent_id: string
  permalink: string
  removal_reason: null
  replies: ListingData<CommentData>
  report_reasons: null
  saved: boolean
  score: number
  score_hidden: boolean
  send_replies: boolean
  stickied: boolean
  subreddit: string
  subreddit_id: string
  subreddit_name_prefixed: string
  subreddit_subscribers: number
  subreddit_type: 'public'
  top_awarded_type: null
  total_awards_received: number
  treatment_tags: unknown[]
  ups: number
}

export default class Comment {
  public body: string
  public author: string
  public timestamp: number
  public upvotes: number
  public awards: Award[]
  public comments: Comment[]

  public constructor(data: CommentData) {
    this.body = data.body
    this.author = data.author
    this.timestamp = data.created_utc
    this.upvotes = data.ups
    this.awards = data.all_awardings.map(a => new Award(a))
    this.comments = new Listing<CommentData, Comment>(
      data.replies,
      Comment
    ).entries
  }
}
