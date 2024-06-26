import { PostForm } from '@/components/admin/postForm/PostForm'
import { PostList } from '@/components/admin/postList/PostList'
import { UserForm } from '@/components/admin/userForm/UserForm'
import { UserList } from '@/components/admin/userList/UserList'
import { Suspense } from 'react'
import { auth } from '@/lib/auth'
import styles from './admin.module.css'

const Admin = async () => {
  const session = await auth()

  return (
    <div className={styles.container}>
      <h1>Admin Dashboard:</h1>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <PostList />
          </Suspense>
        </div>
        <div className={styles.col}>
          <PostForm userId={session.user.id} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <UserList />
          </Suspense>
        </div>
        <div className={styles.col}>
          <UserForm userId={session.user.id} />
        </div>
      </div>
    </div>
  )
}

export default Admin
