import Image from 'next/image'
import styles from './home.module.css'

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Creative Thoughts Agency.</h1>
        <p className={styles.text}>
          We are a creative agency that specializes in creating beautiful and
          engaging digital experiences that help brands connect with their
          audience. We are here to help you achieve your goals and grow your
          business. Let&apos;s create something amazing together.
        </p>
        <div className={styles.buttons}>
          <button className={styles.button}>Learn more</button>
          <button className={styles.button}>Contact</button>
        </div>
        <div className={styles.brand}>
          <Image
            src='/brands.png'
            alt='brands'
            fill
            className={styles.brandImg}
          />
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src='/hero.gif' alt='hero' fill className={styles.heroImg} />
      </div>
    </div>
  )
}

export default Home
