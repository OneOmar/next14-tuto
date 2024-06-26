import styles from './posts.module.css'
import PostCard from '@/components/postCard/PostCard'
// import { getPosts } from '@/lib/data'

export const metadata = {
  title: 'Posts Page',
  description: 'This is the posts page of the blog app.'
}

const apiUrl = process.env.API_URL

// FETCH DATA FROM API
// const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
//   cache: 'no-store', // disable cache
//   next: { revalidate: 3600 } // revalidate every hour
// })
const getData = async () => {
  const response = await fetch(`${apiUrl}/posts`)
  if (!response.ok) {
    throw new Error('Failed to fetch posts')
  }
  const data = await response.json()
  return data
}

const Posts = async () => {
  // FETCH DATA FROM API
  const posts = await getData()

  // FETCH DATA FROM DATABASE
  // const posts = await getPosts()

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div key={post.id} className={styles.postContainer}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  )
}

export default Posts
