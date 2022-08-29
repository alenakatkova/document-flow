import React, { useState } from "react";
import { User, UserFromDB } from "../interfaces/user";
import styles from "../styles/UserCard.module.css";
import { deleteUser, editUser } from "../pages/api/users";

export default function UserCard(props: UserFromDB) {
  const { id, username, email, password, age } = props;
  const [isBeingEdited, setIsBeingEdited] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<string>(email);
  const [newUsername, setNewUsername] = useState<string>(username);
  const [newPassword, setNewPassword] = useState<string>(password);
  const [newAge, setNewAge] = useState<number>(age);

  async function deleteUserData(userId: number) {
    await deleteUser(userId);
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
    }
    await editUser(newData, id)
    setIsBeingEdited(false);
  }

  return (
      <div className={styles.card}>
        <div>
          <p>Username:
            {isBeingEdited
                ? <input
                    type="string"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                />
                : username
            }
          </p>
          <p>E-mail:
            {isBeingEdited
                ? <input
                    type="string"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                />
                : email
            }
          </p>
          <p>Age:
            {isBeingEdited
                ? <input
                    type="number"
                    value={newAge}
                    onChange={(e) => setNewAge(Number(e.target.value))}
                />
                : age
            }
          </p>
          {isBeingEdited
              ? <p>Password:
                <input
                    type="string"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
              </p>
              : ""
          }
        </div>
        {isBeingEdited
            ? (
                <div className={styles.btnsContainer}>
                  <button onClick={saveUserData}>Save</button>
                </div>)
            : (
                <div className={styles.btnsContainer}>
                  <button onClick={() => deleteUserData(id)}>Delete</button>
                  <button onClick={startEditingUserData}>Edit</button>
                </div>
            )
        }
      </div>
  )
}