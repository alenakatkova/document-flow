import { Contact } from "../interfaces/contact";
import { performPostRequest } from "./utils";
import { Contract } from "../interfaces/contract";

export const createContact = async (contactData : Contact, counterpartyId : number) => {
  return await performPostRequest(`/counterparties/${counterpartyId}/add-contact`, { counterpartyId: counterpartyId, ...contactData })
};

// export const createContract = async (clientContractData : Contract, clientId : number) => {
//   return await performPostRequest(`/clients/${clientId}/add-contract`, clientContractData)
// };