import React, { useState, useEffect, useCallback } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getUsers, createUser } from "./api/users";
import { UserFromDB, User } from "../interfaces/user";
import UsersList from "../components/UsersList";

const Home: NextPage = () => {
  const [newUser, setNewUser] = useState<User>({
    username: "",
    email: "",
    password: "",
    age: 0
  });
  const [idOfLastCreatedUser, setIdOfLastCreatedUser] = useState<number | null>(null)

  async function saveUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await createUser(newUser).then(res => res && setIdOfLastCreatedUser(res.data.newUserId));
    reset();
  }

  function handleChange(event : React.ChangeEvent<HTMLInputElement>) {
    setNewUser({...newUser, [event.target.name] : event.target.value});
  }

  function reset() {
    setNewUser({
      username: "",
      email: "",
      password: "",
      age: 0
    })
  }

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


        <form method="post" className={styles.userForm} onSubmit={saveUser}>
          <div className={styles.formLine}>
            <label htmlFor="username">Username:</label>
            <input name="username" id="username"  onChange={handleChange} value={newUser.username} />
          </div>

          <div className={styles.formLine}>
            <label htmlFor="password">Password:</label>
            <input name="password" id="password"  onChange={handleChange} value={newUser.password} />
          </div>

          <div className={styles.formLine}>
            <label htmlFor="email">E-mail:</label>
            <input name="email" id="email"  onChange={handleChange} value={newUser.email} />
          </div>

          <div className={styles.formLine}>
            <label htmlFor="age">Age:</label>
            <input name="age" id="age" type="number" onChange={handleChange} value={newUser.age} />
          </div>

          <button>Save</button>
        </form>

        <UsersList
            // users={users}
            idOfLastCreatedUser={idOfLastCreatedUser} />
      </main>

      <footer className={styles.footer}>
        <p className={styles.description}>
          This is an example page for the boilerplate built on NodeJS, Express.js, PostgreSQL, Sequelize, TypeScript and Next.js.
        </p>
      </footer>
    </div>
  )
}

export default Home;
