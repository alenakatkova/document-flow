import { performPostRequest } from "./utils";
import { Contract } from "../interfaces/contract";

export const createContract = async (contractData : Contract) => {
  return await performPostRequest(`/contracts/add-contract`, contractData)
}