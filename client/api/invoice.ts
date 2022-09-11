import { performPostRequest } from "./utils";
import { Invoice } from "../interfaces/invoice";
import { Agreement } from "../interfaces/agreement";

export const createInvoice = async (invoiceData : Invoice) => {
  return await performPostRequest(`/invoices/add-invoice`, invoiceData)
}

export const updateInvoice = async (invoiceData : Invoice, invoiceId : number) => {
  return await performPostRequest(`/invoices/${invoiceId}/update`, invoiceData)
};