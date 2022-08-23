import { User } from "../interfaces/user";
import styles from "../styles/UserCard.module.css";
import React from "react";
import { deleteUser } from "../pages/api/users";

export default function UserCard(props: User) {
  const { id, username, email, password, age } = props;

  async function deleteUserData(userId: number) {
    await deleteUser(userId);
  }

  return (
      <div className={styles.card}>
        <div>
          <p>Username: {username}</p>
          <p>E-mail: {email}</p>
          <p>Возраст: {age}</p>
        </div>
        <div className={styles.btnsContainer}>
          <button onClick={() => deleteUserData(id)}>Delete</button>
          <button>Edit</button>
        </div>
      </div>
  )
}