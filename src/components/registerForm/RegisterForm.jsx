'use client'

import { register } from '@/lib/action'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import styles from './registerForm.module.css'

export const RegisterForm = () => {
  const [state, formAction] = useFormState(register, {})

  const router = useRouter()

  // Redirect to login page if registration is successful
  useEffect(() => {
    if (state.success) {
      router.push('/login')
    }
  }, [state.success, router])

  return (
    <form className={styles.form} action={formAction}>
      <input type='text' placeholder='username' name='username' />
      <input type='email' placeholder='email' name='email' />
      <input type='password' placeholder='password' name='password' />
      <input
        type='password'
        placeholder='confirm password'
        name='confirmPassword'
      />
      <button type='submit'>Register</button>
      {state.error && <span className={styles.error}>{state.error}</span>}
      <Link href='/login'>
        Have an account? <b>Login</b>
      </Link>
    </form>
  )
}
