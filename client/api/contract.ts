import { performPostRequest, performUpdateRequest } from "./utils";
import { Contract } from "../interfaces/contract";

export const createContract = async (contractData : Contract) => {
  return await performPostRequest(`/contracts/add-contract`, contractData)
}

export const updateContract = async (contractData : Contract, contractId : number) => {
  return await performPostRequest(`/contracts/${contractId}/update`, contractData)
};