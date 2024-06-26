import styles from './footer.module.css'

export const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Logo</div>
      <div className={styles.footerText}>
        <p className={styles.text}>
          &copy; 2024 Creative Thoughts Agency. All rights reserved.
        </p>
      </div>
    </div>
  )
}
