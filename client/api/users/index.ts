import { User } from "../../interfaces/user";
import { performPostRequest, performDeleteRequest, performUpdateRequest } from "../utils";

export const createUser = async (userData : User) => await performPostRequest("/users/signup", userData);

export const deleteUser = async (id : number) => await performDeleteRequest("/users/", id);

export const editUser = async (userData : User, id : number) => await performUpdateRequest("/users/", id, userData);
