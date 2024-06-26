import Link from 'next/link'
import styles from './navLink.module.css'
import { usePathname } from 'next/navigation'

export const NavLink = ({ item }) => {
  const pathName = usePathname()
  return (
    <Link
      href={item.path}
      className={pathName === item.path ? styles.active : ''}
    >
      {item.title}
    </Link>
  )
}
