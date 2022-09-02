import { User } from "../../interfaces/user";
import { instance, performPostRequest } from "../utils";

export async function createUser(userData : User) {
  return await performPostRequest("/users/signup", userData);
}

export async function deleteUser(id : number) {
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

export async function editUser(userData : User, id : number) {
  try {
    return await instance.post("/users/" + id, {
      id: id,
      newData: userData
    });
  } catch (error) {
    console.error(error);
  }
}