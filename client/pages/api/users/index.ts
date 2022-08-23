import { User } from "../../../interfaces/user";
import { instance } from "../utils";

export default async function getUsers() {
  let users: User[] = [];

  try {
    const res = await instance.get("/users");
    users = res.data;
    return users;
  } catch (error) {
    console.log(error);
  }
}