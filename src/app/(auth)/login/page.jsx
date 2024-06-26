import styles from './login.module.css'
import { LoginForm } from '@/components/loginForm/LoginForm'

const Login = () => {
  // auth?.user && router.push('/')
  // auth?.user.isAdmin && router.push('/admin')

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
