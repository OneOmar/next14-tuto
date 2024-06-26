'use client'

import { addUser } from '@/lib/action'
import { useFormState } from 'react-dom'
import styles from './userForm.module.css'

export const UserForm = () => {
  const [state, formAction] = useFormState(addUser, undefined)

  return (
    <div className={styles.container}>
      <h2>Add New User:</h2>
      <form action={formAction} className={styles.form}>
        <input type='text' name='username' placeholder='username' />
        <input type='text' name='email' placeholder='email' />
        <input type='password' name='password' placeholder='password' />
        <input type='text' name='img' placeholder='img' />
        <select name='isAdmin'>
          <option value='false'>Is Admin?</option>
          <option value='false'>No</option>
          <option value='true'>Yes</option>
        </select>
        <button type='submit' className={styles.addButton}>
          Add User
        </button>
        {state?.error && <span className={styles.error}>{state.error}</span>}
        {state?.success && <span className={styles.success}>User added!</span>}
      </form>
    </div>
  )
}
