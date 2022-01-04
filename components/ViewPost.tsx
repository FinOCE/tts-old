import moment from 'moment'
import millify from 'millify'
import Post from '../models/Post'
import styles from '../styles/ViewPost.module.sass'

export default function ViewPost(props: Post) {
  const timestamp = moment
    .duration(props.timestamp - Date.now() / 1000, 'seconds')
    .humanize(true)

  return (
    <div className={styles.post}>
      <div className={styles.karma}>
        <span className={styles.upvotes}>
          {millify(props.karma.upvotes).toLowerCase()}
        </span>
      </div>
      <div className={styles.header}>
        <span className={styles.subreddit}>{props.subreddit}</span>
        &middot;
        <span className={styles.user}>Posted by u/{props.author}</span>
        <span className={styles.timestamp}>{timestamp}</span>
        {/* TODO: Add awards here */}
      </div>
      <div className={styles.body}>{props.title}</div>
      <div className={styles.footer}>
        <span className={styles.comments}>
          {millify(props.comments).toLowerCase()} Comments
        </span>
        <span className={styles.ratio}>
          {Math.round(props.karma.ratio)} Upvoted
        </span>
      </div>
    </div>
  )
}
