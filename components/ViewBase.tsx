import Sound from 'react-sound'
import styles from '../styles/ViewBase.module.sass'

export default function ViewBase(props: { children: JSX.Element }) {
  return (
    <main id={styles.view}>
      <div id={styles.videoWrapper}>
        <video playsInline autoPlay muted loop>
          <source src={'milky_way.mp4'} type={'video/mp4'} />
        </video>
        <Sound
          url={'lovely.mp3'}
          loop
          autoLoad
          volume={25}
          playStatus={'PLAYING'}
        />
      </div>
      <div id={styles.content}>{props.children}</div>
    </main>
  )
}
