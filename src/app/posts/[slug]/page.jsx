import styles from './singlePost.module.css'
import Image from 'next/image'
import PostUser from '@/components/postUser/PostUser'
import { Suspense } from 'react'
import { getPost } from '@/lib/data'

// GENERATE METADATA FOR SEO OPTIMIZATION (NEXT SEO)
export const generateMetadata = async ({ params }) => {
  const { slug } = params
  const post = await getPost(slug)
  return {
    title: post.title,
    description: post.desc
  }
}

const apiUrl = process.env.API_URL

// FETCH DATA FROM API
const getData = async (slug) => {
  const response = await fetch(`${apiUrl}/posts/${slug}`)

  if (!response.ok) {
    throw new Error('Failed to fetch post')
  }
  const data = await response.json()
  return data
}

const SinglePost = async ({ params }) => {
  // console.log(params)
  const { slug } = params

  // FETCH DATA FROM API
  const post = await getData(slug)

  // FETCH DATA FROM DATABASE
  // const post = await getPost(slug)
  // console.log(post)

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src={post.img || '/no-image.png'}
          alt='post img'
          fill
          // sizes='(max-width: 600px) 100vw, 600px'
          className={styles.img}
        />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          <Suspense fallback={<div>Loading...</div>}>
            <PostUser userId={post.userId} />
          </Suspense>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>01.01.2024</span>
          </div>
        </div>
        <div className={styles.content}>{post.desc}</div>
      </div>
    </div>
  )
}

export default SinglePost
