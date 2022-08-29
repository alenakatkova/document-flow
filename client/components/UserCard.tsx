import React, { useState } from "react";
import { User, UserFromDB } from "../interfaces/user";
import styles from "../styles/UserCard.module.css";
import { deleteUser, editUser } from "../pages/api/users";

interface UserCardProps {
  user: UserFromDB;
  updateUsersList: () => void;
}

export default function UserCard({ user, updateUsersList }: UserCardProps) {
  const { id, username, email, password, age } = user;
  const [isBeingEdited, setIsBeingEdited] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<string>(email);
  const [newUsername, setNewUsername] = useState<string>(username);
  const [newPassword, setNewPassword] = useState<string>(password);
  const [newAge, setNewAge] = useState<number>(age);

  async function deleteUserData(userId: number) {
    await deleteUser(userId);
    updateUsersList();
  }

  function startEditingUserData() {
    setIsBeingEdited(true);
  }

  async function saveUserData() {
    const newData: User = {
      username: newUsername,
      password: newPassword,
      age: newAge,
      email: newEmail
    };
    await editUser(newData, id);
    setIsBeingEdited(false);
    updateUsersList();
  }

  return (
      <div className={styles.card}>
          {!isBeingEdited
              ? <>
                  <div className={styles.infoContainer}>
                    <p className={styles.line}>Username: {username}</p>
                    <p className={styles.line}>E-mail: {email}</p>
                    <p className={styles.line}>Age: {age}</p>
                    <p className={styles.line}>Password: {password}</p>
                  </div>
                  <div className={styles.btnsContainer}>
                    <button onClick={() => deleteUserData(id)}>Delete</button>
                    <button onClick={startEditingUserData}>Edit</button>
                  </div>
                </>
              : <>
                  <div className={styles.infoContainer}>
                    <p className={styles.line}>
                      <span>Username: </span>
                      <input
                          className={styles.input}
                          type="string"
                          value={newUsername}
                          onChange={(e) => setNewUsername(e.target.value)}
                      />
                    </p>
                    <p className={styles.line}>
                      <span>E-mail: </span>
                      <input
                          className={styles.input}
                          type="string"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                      />
                    </p>
                    <p className={styles.line}>
                      <span>Age: </span>
                      <input
                          className={styles.input}
                          type="number"
                          value={newAge}
                          onChange={(e) => setNewAge(Number(e.target.value))}
                      />
                    </p>
                    <p className={styles.line}>
                      <span>Password: </span>
                      <input
                          className={styles.input}
                          type="string"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </p>
                  </div>
                  <div className={styles.btnsContainer}>
                    <button onClick={saveUserData}>Save</button>
                  </div>
              </>
          }
      </div>
  )
}