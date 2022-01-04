import moment from 'moment'
import millify from 'millify'
import Post from '../models/Post'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronCircleDown,
  faChevronCircleUp
} from '@fortawesome/free-solid-svg-icons'
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons'
import styles from '../styles/ViewPost.module.sass'

export default function ViewPost(props: Post & { isBanner?: boolean }) {
  const timestamp = moment
    .duration(props.timestamp - Date.now() / 1000, 'seconds')
    .humanize(true)

  if (props.isBanner)
    return (
      <div className={styles.banner}>
        <span>r/{props.subreddit}: </span>
        {props.title}
      </div>
    )

  return (
    <div className={styles.post}>
      <div className={styles.sidebar}>
        <FontAwesomeIcon icon={faChevronCircleUp} />
        <span className={styles.upvotes}>
          {millify(props.karma.upvotes).toLowerCase()}
        </span>
        <FontAwesomeIcon icon={faChevronCircleDown} />
      </div>
      <div className={styles.header}>
        <span className={styles.subreddit}>r/{props.subreddit}</span>
        &middot;
        <span className={styles.user}>Posted by u/{props.author}</span>
        <span className={styles.timestamp}>{timestamp}</span>
        {/* TODO: Add awards here */}
      </div>
      <div className={styles.body}>{props.title}</div>
      <div className={styles.footer}>
        <span className={styles.comments}>
          <FontAwesomeIcon icon={faCommentAlt} />{' '}
          {millify(props.comments).toLowerCase()} Comments
        </span>
        <span className={styles.ratio}>
          {Math.round(props.karma.ratio * 100)}% Upvoted
        </span>
      </div>
    </div>
  )
}
