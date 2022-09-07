import { performDeleteRequest } from "./utils";

export const deleteContact = async (id : number) => {
  return await performDeleteRequest("/contacts/", id)
};