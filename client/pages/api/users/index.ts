import { User, UserFromDB } from "../../../interfaces/user";
import { instance } from "../utils";

export async function getUsers() {
  let users: UserFromDB[] = [];

  try {
    const res = await instance.get("/users");
    users = res.data;
    return users;
  } catch (error) {
    console.error(error);
  }
}

export async function createUser(userData: User) {
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

export async function editUser(userData: User, id: number) {
  try {
    return await instance.post("/users/" + id, {
        id: id,
        newData: userData
    });
  } catch (error) {
    console.error(error);
  }
}