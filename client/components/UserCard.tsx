import React, { useState } from "react";
import { User } from "../interfaces/user";
import styles from "../styles/UserCard.module.css";
import { deleteUser } from "../pages/api/users";

export default function UserCard(props: User) {
  const { id, username, email, password, age } = props;
  const [isBeingEdited, setIsBeingEdited] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<string>(email);
  const [newUsername, setNewUsername] = useState<string>(username);
  const [newPassword, setNewUPassword] = useState<string>(password);
  const [newAge, setNewAge] = useState<number>(age);

  async function deleteUserData(userId: number) {
    await deleteUser(userId);
  }

  function editUserData() {
    setIsBeingEdited(true);
  }

  function saveUserData() {
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
                : email
            }
          </p>
          {isBeingEdited
              ? <p>Password:
                <input
                    type="string"
                    value={password}
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
                  <button onClick={editUserData}>Edit</button>
                </div>
            )
        }
      </div>
  )
}