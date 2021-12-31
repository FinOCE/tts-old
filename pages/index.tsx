import { useState } from 'react'
import Client from '../models/Client'

export default function Index() {
  const client = new Client()
  client.login(process.env.clientId, process.env.clientSecret)

  const [isHot, setIsHot] = useState(false)

  return (
    <main>
      <h1>Subreddit Search</h1>
      <form>
        <label htmlFor="subreddit">Select Subreddit</label>
        <br />
        <select id="subreddit">
          <option value="askreddit">r/askreddit</option>
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
        <select id="duration" disabled={isHot}>
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
        <input id="minPostComments" type="number" defaultValue="200" />
        <br />
        <br />
        <label htmlFor="minCommentUpvotes">Minimum Comment Upvotes</label>
        <br />
        <input id="minCommentUpvotes" type="number" defaultValue="200" />
        <br />
        <br />
        <input type="submit" value="Search" />{' '}
        <input type="reset" value="Reset" onClick={() => setIsHot(false)} />
      </form>
    </main>
  )
}
