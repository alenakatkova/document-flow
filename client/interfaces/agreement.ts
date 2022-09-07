import { DocumentTransactionFromDB } from "./documentTransaction";
import { InvoiceFromDB } from "./invoice";

export interface Agreement {
  number : string;
  linkToFileOnDisk? : string;
  signDate? : Date;
}

export interface AgreementFromDB extends Agreement {
  id : number;
  Invoice? : InvoiceFromDB;
  AgreementTransactions? : DocumentTransactionFromDB[];
  contractId? : number;
  createdAt? : Date;
  updatedAt? : Date;
}

