import moment from 'moment'
import millify from 'millify'
import Comment from '../models/Comment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronCircleDown,
  faChevronCircleUp
} from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/ViewComment.module.sass'

export default function ViewComment(
  props: Comment & { subcomments: number; isSubcomment?: boolean }
) {
  const timestamp = moment
    .duration(props.timestamp - Date.now() / 1000, 'seconds')
    .humanize(true)

  return (
    <div
      className={[
        styles.comment,
        props.isSubcomment ? styles.subcomment : ''
      ].join(' ')}
      key={props.body.slice(0, 15)}
    >
      <div className={styles.sidebar}>
        <img />
        <hr />
      </div>
      <div className={styles.header}>
        <span className={styles.user}>{props.author}</span>
        &middot;
        <span className={styles.timestamp}>{timestamp}</span>
        {/* TODO: Add awards here */}
      </div>
      <div className={styles.body}>{props.body}</div>
      <div className={styles.footer}>
        <span className={styles.upvotes}>
          <FontAwesomeIcon icon={faChevronCircleUp} />
          {millify(props.upvotes).toLowerCase()}
          <FontAwesomeIcon icon={faChevronCircleDown} />
        </span>
      </div>
      <div className={styles.comments}>
        {props.comments.slice(0, props.subcomments).map(comment => (
          <ViewComment
            isSubcomment={true}
            key={comment.body}
            {...comment}
            subcomments={0}
          />
        ))}
      </div>
    </div>
  )
}
