'use client'

import { NavLink } from './navLink/NavLink'
import styles from './links.module.css'
import { useState } from 'react'
import Image from 'next/image'
import { handleLogout } from '@/lib/action'

const links = [
  { path: '/', title: 'Home' },
  { path: '/about', title: 'About' },
  { path: '/contact', title: 'Contact' },
  { path: '/posts', title: 'Blog' }
]

// const isLogged = true
// const isAdmin = true

export const Links = ({ session }) => {
  const [open, setOpen] = useState(false)

  const toggleMenu = () => setOpen((prev) => !prev)

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link, index) => (
          <NavLink key={index} item={link} />
        ))}

        {session?.user ? (
          <>
            {session.user?.isAdmin && (
              <NavLink item={{ title: 'Admin', path: '/admin' }} />
            )}
            <form action={handleLogout}>
              <button type='submit' className={styles.logout}>
                Logout
              </button>
            </form>
          </>
        ) : (
          <NavLink item={{ path: '/login', title: 'Login' }} />
        )}
      </div>

      <Image
        src='/menu.png'
        alt='logo'
        className={styles.menuButton}
        width={25}
        height={25}
        onClick={toggleMenu}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link, index) => (
            <NavLink key={index} item={link} />
          ))}
        </div>
      )}
    </div>
  )
}
