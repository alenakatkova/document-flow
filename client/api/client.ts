import { Contract } from "../interfaces/contract";
import { performPostRequest } from "./utils";

export const createContract = async (clientContractData : Contract, clientId : number) => {
  return await performPostRequest(`/clients/${clientId}/add-contract`, clientContractData)
};