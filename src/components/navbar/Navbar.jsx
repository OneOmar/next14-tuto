import { auth } from '@/lib/auth'
import { Links } from './links/Links'
import styles from './navbar.module.css'

export const Navbar = async () => {
  const session = await auth()
  // console.log(session)

  return (
    <div className={styles.container}>
      <div className={styles.logo}>logo</div>
      <Links session={session} />
    </div>
  )
}
