import Comment from '../models/Comment'

interface PostProps {
  comment: Comment
  subcomments?: number
}

export default function CommentComponent(props: PostProps) {
  return (
    <>
      <br />
      <br />
      <div>
        <p>{props.comment.body}</p>
        <p>
          Posted by <b>{props.comment.author}</b>
        </p>
        <p>
          <b>{props.comment.upvotes}</b> Upvotes
        </p>
        <div style={{ marginLeft: '20px' }}>
          {props.comment.comments.slice(0, props.subcomments).map(comment => (
            <CommentComponent key={comment.body} comment={comment} />
          ))}
        </div>
      </div>
    </>
  )
}
