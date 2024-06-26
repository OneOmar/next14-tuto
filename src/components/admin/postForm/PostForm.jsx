'use client'

import { addPost } from '@/lib/action'
import { useFormState } from 'react-dom'
import styles from './postForm.module.css'

export const PostForm = ({ userId }) => {
  const [state, formAction] = useFormState(addPost, undefined)

  return (
    <div className={styles.container}>
      <h2>Add New Post:</h2>
      <form className={styles.form} action={formAction}>
        <input type='hidden' name='userId' value={userId} />
        <input type='text' name='title' placeholder='Title' />
        <input type='text' name='slug' placeholder='Slug' />
        <textarea name='desc' placeholder='Description' rows={10} />
        <input type='file' name='img' className={styles.file} />
        <button className={styles.addButton} type='submit'>
          Publish
        </button>
        {state?.error && <span className={styles.error}>{state.error}</span>}
        {state?.success && (
          <span className={styles.success}>{state.success}</span>
        )}
      </form>
    </div>
  )
}
