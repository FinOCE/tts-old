import { DetailedHTMLProps, HTMLAttributes, useRef, useState } from 'react'
import Client from '../models/Client'
import Comment from '../models/Comment'
import Post, { PostTime } from '../models/Post'
import PostComponent from '../components/PostComponent'
import CommentComponent from '../components/CommentComponent'
import ViewBase from '../components/ViewBase'
import ViewPost from '../components/ViewPost'
import ViewComment from '../components/ViewComment'

type HTMLMainElement = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
>

export default function Index() {
  const [client] = useState(new Client())
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

  const [view, setView] = useState<HTMLMainElement>()
  if (typeof window !== 'undefined') window.speechSynthesis.cancel()

  async function present(post: Post) {
    let comments = await client.getComments(post)

    // Limit comments to 3 subcomments with no further
    comments = comments.map(c => {
      c.comments = c.comments.splice(0, 3)
      c.comments.forEach(c2 => (c2.comments = []))
      return c
    })

    // Get voice
    const preferredVoice =
      'Microsoft Natasha Online (Natural) - English (Australia)'
    const synth = window.speechSynthesis

    const voice = await new Promise<SpeechSynthesisVoice>(resolve => {
      const fetchVoices = setInterval(() => {
        if (
          synth.getVoices().some(voice => voice.voiceURI === preferredVoice)
        ) {
          const voice = synth
            .getVoices()
            .find(voice => voice.voiceURI === preferredVoice)!
          clearInterval(fetchVoices)
          resolve(voice)
        }
      }, 50)
    })

    // Show post
    setView(
      <ViewBase>
        <ViewPost {...post} />
      </ViewBase>
    )
    await new Promise(resolve => {
      const utterance = new SpeechSynthesisUtterance(post.title)
      utterance.voice = voice
      utterance.onend = () => resolve(true)
      synth.speak(utterance)
    })

    // Show comments
    for (const comment of comments) {
      setView(
        <ViewBase>
          <ViewComment {...comment} subcomments={0} />
        </ViewBase>
      )

      await new Promise(resolve => {
        const utterance = new SpeechSynthesisUtterance(comment.body)
        utterance.voice = voice
        utterance.onend = () => resolve(true)
        synth.speak(utterance)
      })

      for (let i = 0; i < comment.comments.length; i++) {
        const subcomment = comment.comments[i]

        setView(
          <ViewBase>
            <ViewComment {...comment} subcomments={i + 1} />
          </ViewBase>
        )

        await new Promise(resolve => {
          const utterance = new SpeechSynthesisUtterance(subcomment.body)
          utterance.voice = voice
          utterance.onend = () => resolve(true)
          synth.speak(utterance)
        })
      }
    }
  }

  return (
    <>
      {view ? (
        view
      ) : (
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
              defaultValue={''}
            >
              <option value="">Hot</option>
              <option value="top">Top</option>
              <option value="new">New</option>
              <option value="rising">Rising</option>
            </select>
            <br />
            <br />
            <label htmlFor="duration">Past</label>
            <br />
            <select
              id="duration"
              disabled={isHot}
              ref={durationInput}
              defaultValue={''}
            >
              {isHot && <option value=""></option>}
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
              <>
                <br />
                <br />
                {posts.length !== 0 && (
                  <>
                    <input
                      type="button"
                      value="Clear posts"
                      onClick={() => setPosts([])}
                    />
                  </>
                )}
                {posts.map(post => (
                  <PostComponent
                    key={post.title}
                    post={post}
                    showComments={async () => {
                      setLoading(true)
                      setComments(await client.getComments(post))
                      setLoading(false)
                    }}
                    present={() => present(post)}
                  />
                ))}
              </>
            )}
          </div>
        </main>
      )}
    </>
  )
}
