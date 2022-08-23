import { NewUserData, User } from "../../../interfaces/user";
import { instance } from "../utils";

export async function getUsers() {
  let users: User[] = [];

  try {
    const res = await instance.get("/users");
    users = res.data;
    return users;
  } catch (error) {
    console.error(error);
  }
}

export async function createUser(userData: NewUserData) {
  try {
    return await instance.post("/users/signup", userData);
  } catch (error) {
    console.error(error);
  }
}

export async function deleteUser(id: number) {
  try {
    return await instance.delete("/users/" + id, {
      data: {
        id: id
      }
    });
  } catch (error) {
    console.error(error);
  }
}