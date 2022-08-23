import { NewUserData, User } from "../../../interfaces/user";
import { instance } from "../utils";

export async function getUsers() {
  let users: User[] = [];

  try {
    const res = await instance.get("/users");
    users = res.data;
    return users;
  } catch (error) {
    console.log(error);
  }
}

export async function createUser(userData: NewUserData) {
  try {
    return await instance.post("/users/signup", userData);
  } catch (e) {
    console.log(e);
  }
}