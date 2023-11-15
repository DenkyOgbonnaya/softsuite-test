import Image from 'next/image'
import styles from './page.module.scss'
import { Button } from './components'

export default function Home() {
  return (
    <main className={styles.main}>
      <Button  size="medium" intent="primary">Hello World</Button>
      <Button isLoading  size="medium" intent="primary">Hello World</Button>
    </main>
  )
}
