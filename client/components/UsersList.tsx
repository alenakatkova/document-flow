import React, { useEffect } from "react";
import { UserFromDB } from "../interfaces/user";
import styles from "../styles/UsersList.module.css";
import UserCard from "./UserCard";
import useFetch from "../api/useFetch";

interface UsersListProps {
  idOfLastCreatedUser : number|null;
}

export default function UsersList({ idOfLastCreatedUser } : UsersListProps) {
  const { data: users, isLoading, fetchData: refetchUsers } = useFetch<UserFromDB[]>("/users", []);

  useEffect(() => {
    if (typeof idOfLastCreatedUser === "number" && users.find(user => user.id === idOfLastCreatedUser) === undefined) {
      refetchUsers();
    }
  }, [idOfLastCreatedUser]);

  return (
      <div className={styles.cardContainer}>
        <h2>Users stored in DB:</h2>
        {isLoading
            ? <div>Loading...</div>
            : users.map((user : UserFromDB) => (
                <UserCard key={user.id} user={user} updateUsersList={refetchUsers}/>
            ))
        }
      </div>
  )
}