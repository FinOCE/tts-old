import { useRef, useState } from 'react'
import Client from '../models/Client'
import Comment from '../models/Comment'
import Post, { PostTime } from '../models/Post'
import PostComponent from '../components/PostComponent'
import CommentComponent from '../components/CommentComponent'

export default function Index() {
  const client = new Client()
  client.login(process.env.clientId, process.env.clientSecret)

  const [isHot, setIsHot] = useState(true)
  const [isFiltered, setIsFiltered] = useState(false)

  const subredditInput = useRef<HTMLSelectElement>(null)
  const sortInput = useRef<HTMLSelectElement>(null)
  const durationInput = useRef<HTMLSelectElement>(null)
  const minCommentInput = useRef<HTMLInputElement>(null)
  const minUpvoteInput = useRef<HTMLInputElement>(null)

  const [posts, setPosts] = useState<Post[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(false)

  return (
    <main>
      <h1>Subreddit Search</h1>
      <form
        onSubmit={async e => {
          e.preventDefault()
          setLoading(true)
          setPosts(
            await client.getPosts(
              subredditInput.current!.value,
              sortInput.current!.value,
              durationInput.current!.value as PostTime
            )
          )
          setComments([])
          setLoading(false)
        }}
      >
        <label htmlFor="subreddit">Select Subreddit</label>
        <br />
        <select id="subreddit" ref={subredditInput}>
          <option value="askreddit">r/askreddit</option>
          <option value="memes">r/memes</option>
        </select>
        <br />
        <br />
        <label htmlFor="sort">Sort by</label>
        <br />
        <select
          id="sort"
          onChange={e => {
            if (e.target.value === '') setIsHot(true)
            else setIsHot(false)
          }}
          ref={sortInput}
        >
          <option value="" selected>
            Hot
          </option>
          <option value="top">Top</option>
          <option value="new">New</option>
          <option value="rising">Rising</option>
        </select>
        <br />
        <br />
        <label htmlFor="duration">Past</label>
        <br />
        <select id="duration" disabled={isHot} ref={durationInput}>
          {isHot && <option value="" selected></option>}
          <option value="hour">Hour</option>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
          <option value="all">All Time</option>
        </select>
        <br />
        <br />
        <input
          type="checkbox"
          name="filters"
          onChange={() => setIsFiltered(!isFiltered)}
        />
        <label htmlFor="filters">Use filters</label>
        <br />
        <br />
        <label htmlFor="minPostUpvotes">Minimum Post Comments</label>
        <br />
        <input
          id="minPostComments"
          type="number"
          defaultValue="200"
          ref={minCommentInput}
          disabled={!isFiltered}
        />
        <br />
        <br />
        <label htmlFor="minCommentUpvotes">Minimum Comment Upvotes</label>
        <br />
        <input
          id="minCommentUpvotes"
          type="number"
          defaultValue="200"
          ref={minUpvoteInput}
          disabled={!isFiltered}
        />
        <br />
        <br />
        <input type="submit" value="Search" />{' '}
        <input type="reset" value="Reset" onClick={() => setIsHot(true)} />
      </form>

      <div>
        {loading ? (
          <>
            <br />
            <p>Loading...</p>
          </>
        ) : comments.length > 0 ? (
          <>
            <br />
            <br />
            <input
              type="button"
              value="Return to posts"
              onClick={() => setComments([])}
            />
            {comments.map(comment => (
              <CommentComponent key={comment.body} comment={comment} />
            ))}
          </>
        ) : (
          posts.map(post => (
            <>
              <br />
              <br />
              <input
                type="button"
                value="Clear posts"
                onClick={() => setPosts([])}
              />
              <PostComponent
                key={post.title}
                post={post}
                showComments={async () => {
                  setLoading(true)
                  setComments(await client.getComments(post))
                  setLoading(false)
                }}
              />
            </>
          ))
        )}
      </div>
    </main>
  )
}
