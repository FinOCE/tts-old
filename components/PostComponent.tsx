import Post from '../models/Post'

interface PostProps {
  post: Post
  showComments?: () => Promise<void>
  present?: () => Promise<void>
}

export default function PostComponent(props: PostProps) {
  return (
    <>
      <br />
      <br />
      <div>
        <a href={`https://reddit.com${props.post.permalink}`}>
          {props.post.title}
        </a>
        <p>
          Posted by <b>{props.post.author}</b>
        </p>
        <p>
          <b>{props.post.comments}</b> Comments
        </p>
        <p>
          <b>{props.post.karma.total}</b> Upvotes{' '}
          <b>({Math.round(props.post.karma.ratio * 100)}%)</b>
        </p>
        <input
          type="button"
          value="Show Comments"
          onClick={props.showComments}
        />{' '}
        <input type="button" value="Present" onClick={props.present} />
      </div>
    </>
  )
}
