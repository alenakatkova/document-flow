import { ClientContract } from "../interfaces/contract";
import { performPostRequest } from "./utils";

export const createContract = async (clientContractData : ClientContract, clientId : number) => {
  return await performPostRequest(`/clients/${clientId}/add-contract`, clientContractData)
};