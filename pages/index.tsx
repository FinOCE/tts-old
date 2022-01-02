import { useRef, useState } from 'react'
import Client from '../models/Client'
import { PostTime } from '../models/Post'

export default function Index() {
  const client = new Client()
  client.login(process.env.clientId, process.env.clientSecret)

  const [isHot, setIsHot] = useState(false)

  const subredditInput = useRef<HTMLSelectElement>(null)
  const sortInput = useRef<HTMLSelectElement>(null)
  const durationInput = useRef<HTMLSelectElement>(null)
  const minCommentInput = useRef<HTMLInputElement>(null)
  const minUpvoteInput = useRef<HTMLInputElement>(null)

  return (
    <main
      onSubmit={async e => {
        e.preventDefault()
        console.log(
          await client.getPosts(
            subredditInput.current!.value,
            sortInput.current!.value,
            durationInput.current!.value as PostTime
          )
        )
      }}
    >
      <h1>Subreddit Search</h1>
      <form>
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
          <option value="">Hot</option>
          <option value="top" selected>
            Top
          </option>
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
          <option value="week" selected>
            Week
          </option>
          <option value="month">Month</option>
          <option value="year">Year</option>
          <option value="all">All Time</option>
        </select>
        <br />
        <br />
        <label htmlFor="minPostUpvotes">Minimum Post Comments</label>
        <br />
        <input
          id="minPostComments"
          type="number"
          defaultValue="200"
          ref={minCommentInput}
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
        />
        <br />
        <br />
        <input type="submit" value="Search" />{' '}
        <input type="reset" value="Reset" onClick={() => setIsHot(false)} />
      </form>
    </main>
  )
}
