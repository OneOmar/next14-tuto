import Image from 'next/image'
import styles from './contact.module.css'

export const metadata = {
  title: 'Contact Page',
  description: 'This is the contact page of the blog app.'
}

const Contact = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src='/contact.png'
          alt='contact image'
          fill
          className={styles.contactImg}
        />
      </div>
      <div className={styles.formContainer}>
        <form action='' className={styles.form}>
          <input type='text' placeholder='Name and Surname' />
          <input type='text' placeholder='Email Address' />
          <input type='text' placeholder='Phone Number (Optional)' />
          <textarea
            name='message'
            cols='30'
            rows='10'
            placeholder='Message'
          ></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Contact
