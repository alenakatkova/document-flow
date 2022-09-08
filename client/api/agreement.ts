import { performDeleteRequest, performPostRequest } from "./utils";
import { Agreement } from "../interfaces/agreement";

export const deleteAgreement = async (id : number) => {
  return await performDeleteRequest("/agreements/", id)
};

export const createAgreement = async (agreementData : Agreement) => {
  return await performPostRequest(`/agreements/add-agreement`, agreementData)
}