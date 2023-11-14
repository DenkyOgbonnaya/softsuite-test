import Image from 'next/image'
import styles from './page.module.scss'

export default function Home() {
  return (
    <main className={styles.main}>
      <p className={styles.p}>Hello word</p>
    </main>
  )
}
