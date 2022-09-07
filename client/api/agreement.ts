import { performDeleteRequest } from "./utils";

export const deleteAgreement = async (id : number) => {
  return await performDeleteRequest("/agreements/", id)
};