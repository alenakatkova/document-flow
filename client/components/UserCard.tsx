import { User } from "../interfaces/user";
import styles from "../styles/UserCard.module.css";

export default function UserCard(props: User) {
  const { id, username, email, password, age } = props;

  return (
      <div className={styles.card}>
        <div>
          <p>Username: {username}</p>
          <p>E-mail: {email}</p>
          <p>Возраст: {age}</p>
        </div>
        <div className={styles.btnsContainer}>
          <button>Delete</button>
          <button>Edit</button>
        </div>
      </div>
  )
}