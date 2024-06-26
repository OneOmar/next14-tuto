import { getUsers } from '@/lib/data'
import Image from 'next/image'
import { deleteUser } from '@/lib/action'
import styles from './userList.module.css'

export const UserList = async () => {
  const users = await getUsers()

  return (
    <div className={styles.container}>
      <h2>Users List:</h2>
      {users.map((user) => (
        <div key={user.id} className={styles.user}>
          <div className={styles.detail}>
            <Image
              src={user.img || '/no-avatar.png'}
              alt={user.username}
              width={50}
              height={50}
            />
            <span className={styles.title}>{user.username}</span>
          </div>
          <div className={styles.actions}>
            {/* <form action={editPost}>
              <input type='hidden' name='id' value={post.id} />
              <button className={styles.edit}>Edit</button>
            </form> */}
            <form action={deleteUser}>
              <input type='hidden' name='id' value={user.id} />
              <button className={styles.delete}>Delete</button>
            </form>
          </div>
        </div>
      ))}
    </div>
  )
}
