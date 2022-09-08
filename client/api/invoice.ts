import { performPostRequest } from "./utils";
import { Invoice } from "../interfaces/invoice";

export const createInvoice = async (invoiceData : Invoice) => {
  return await performPostRequest(`/invoices/add-invoice`, invoiceData)
}