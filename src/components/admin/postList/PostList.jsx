import { getPosts } from '@/lib/data'
import { deletePost } from '@/lib/action'
import Image from 'next/image'
import styles from './postList.module.css'

export const PostList = async () => {
  const posts = await getPosts()

  return (
    <div className={styles.container}>
      <h2>Posts List:</h2>
      {posts.map((post) => (
        <div key={post.id} className={styles.post}>
          <div className={styles.detail}>
            <Image
              src={post.img || '/no-image.png'}
              alt={post.title}
              width={100}
              height={100}
            />
            <span className={styles.title}>{post.title}</span>
          </div>
          <div className={styles.actions}>
            {/* <form action={editPost}>
              <input type='hidden' name='id' value={post.id} />
              <button className={styles.edit}>Edit</button>
            </form> */}
            <form action={deletePost}>
              <input type='hidden' name='id' value={post.id} />
              <button className={styles.delete}>Delete</button>
            </form>
          </div>
        </div>
      ))}
    </div>
  )
}
