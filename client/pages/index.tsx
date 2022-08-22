import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create new user</title>
        <meta name="description" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Create new user here!
        </h1>


        <form method="post" className={styles.userForm}>
          <div className={styles.formLine}>
            <label htmlFor="username">Username:</label>
            <input name="username" id="username" />
          </div>

          <div className={styles.formLine}>
            <label htmlFor="password">Password:</label>
            <input name="password" id="password" />
          </div>

          <div className={styles.formLine}>
            <label htmlFor="email">E-mail:</label>
            <input name="email" id="email" />
          </div>

          <div className={styles.formLine}>
            <label htmlFor="age">Age:</label>
            <input name="age" id="age" />
          </div>

          <button>Save</button>
        </form>


      </main>

      <footer className={styles.footer}>
        <p className={styles.description}>
          This is an example page for the boilerplate built on NodeJS, Express.js, PostgreSQL, Sequelize, TypeScript and Next.js.
        </p>
      </footer>
    </div>
  )
}

export default Home
