import { useRef, useState } from 'react'
import Client from '../models/Client'
import Post, { PostTime } from '../models/Post'

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
        ) : (
          posts.map(post => (
            <>
              <br />
              <br />
              <div key={post.title}>
                <a href={post.url}>{post.title}</a>
                <p>
                  Posted by <b>{post.author}</b>
                </p>
                <p>
                  <b>{post.comments}</b> Comments
                </p>
                <p>
                  <b>{post.karma.total}</b> Upvotes{' '}
                  <b>({Math.round(post.karma.ratio * 100)}%)</b>
                </p>
              </div>
            </>
          ))
        )}
      </div>
    </main>
  )
}
