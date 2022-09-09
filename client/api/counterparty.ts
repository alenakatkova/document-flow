import { Contact } from "../interfaces/contact";
import { performPostRequest } from "./utils";
import { Counterparty } from "../interfaces/counterparty";

export const createContact = async (contactData : Contact, counterpartyId : number) => {
  return await performPostRequest(`/counterparties/${counterpartyId}/add-contact`, { counterpartyId: counterpartyId, ...contactData })
};

export const createCounterparty = async (counterpartyData : Counterparty, teamId : number) => {
  return await performPostRequest(`/counterparties/add-counterparty`, { teamId: teamId, ...counterpartyData })
};