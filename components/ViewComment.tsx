import moment from 'moment'
import millify from 'millify'
import Comment from '../models/Comment'
import styles from '../styles/ViewComment.module.sass'

export default function ViewComment(props: Comment & { subcomments: number }) {
  const timestamp = moment
    .duration(props.timestamp - Date.now() / 1000, 'seconds')
    .humanize(true)

  return (
    <div className={styles.comment}>
      <div className={styles.header}>
        <span className={styles.user}>Posted by u/{props.author}</span>
        &middot;
        <span className={styles.timestamp}>{timestamp}</span>
        {/* TODO: Add awards here */}
      </div>
      <div className={styles.body}>{props.body}</div>
      <div className={styles.footer}>
        <span className={styles.ratio}>
          {millify(props.upvotes).toLowerCase()} Upvoted
        </span>
      </div>
      <div className={styles.comments}>
        {props.comments.slice(0, props.subcomments).map(comment => (
          <ViewComment key={comment.body} {...comment} subcomments={0} />
        ))}
      </div>
    </div>
  )
}
