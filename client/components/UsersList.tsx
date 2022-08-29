import React, { useState } from "react";
import { User, UserFromDB } from "../interfaces/user";
import styles from "../styles/UserCard.module.css";
import { deleteUser, editUser } from "../pages/api/users";
import UserCard from "./UserCard";

interface UsersListProps {
  users: UserFromDB[];
}

export default function UsersList({ users }: UsersListProps) {
  return (
      <div className={styles.cardContainer}>
        <h2>Users stored in DB:</h2>
        {users.map((user: UserFromDB) => (
            <UserCard key={user.id} {...user} />
        ))}
      </div>
  )
}