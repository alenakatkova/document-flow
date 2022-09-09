import { performPostRequest } from "./utils";
import { ContractTransaction } from "../interfaces/documentTransaction";
import { AgreementTransaction } from "../interfaces/documentTransaction";

export const createContractTransaction = async (transactionData : ContractTransaction) => {
  return await performPostRequest(`/contract-transactions/add-transaction`, transactionData)
}

export const createAgreementTransaction = async (transactionData : AgreementTransaction) => {
  return await performPostRequest(`/agreement-transactions/add-transaction`, transactionData)
}