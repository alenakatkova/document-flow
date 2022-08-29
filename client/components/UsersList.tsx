import React, {useCallback, useEffect, useState} from "react";
import { User, UserFromDB } from "../interfaces/user";
import styles from "../styles/UserCard.module.css";
import {deleteUser, editUser, getUsers} from "../pages/api/users";
import UserCard from "./UserCard";

interface UsersListProps {
  idOfLastCreatedUser: number | null;
}

export default function UsersList({ idOfLastCreatedUser }: UsersListProps) {
  const [users, setUsers] = useState<UserFromDB[]>([]);

  const getUsersFromServer = useCallback(async () => {
    const usersFromServer = await getUsers();
    return usersFromServer === undefined ? [] : usersFromServer;
  }, []);

  useEffect(() => {
    getUsersFromServer().then(users => setUsers(users));
  }, [getUsersFromServer]);

  useEffect(() => {
    if (typeof idOfLastCreatedUser === "number" && users.find(user => user.id === idOfLastCreatedUser) === undefined) {
      getUsersFromServer().then(usersFromDB => setUsers(usersFromDB));
    }
  }, [idOfLastCreatedUser]);

  return (
      <div className={styles.cardContainer}>
        <h2>Users stored in DB:</h2>
        {users.map((user: UserFromDB) => (
            <UserCard key={user.id} {...user} />
        ))}
      </div>
  )
}