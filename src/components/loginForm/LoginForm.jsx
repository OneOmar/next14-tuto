'use client'

import { login, handleGithubLogin } from '@/lib/action'
import { useFormState } from 'react-dom'
import Link from 'next/link'
import styles from './loginForm.module.css'

export const LoginForm = () => {
  const [state, formAction] = useFormState(login, {})

  return (
    <>
      <h1>Login</h1>
      <form className={styles.credentialsForm} action={formAction}>
        <input type='text' placeholder='username' name='username' />
        <input type='password' placeholder='password' name='password' />
        <button type='submit'>Login with credentials</button>
      </form>
      <form className={styles.githubForm} action={handleGithubLogin}>
        <button type='submit'>Login with GitHub</button>
      </form>
      {state?.error && <span className={styles.error}>{state.error}</span>}
      <Link href='/register'>
        {"Don't have an account?"} <b>Register</b>
      </Link>
    </>
  )
}
