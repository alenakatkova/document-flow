import { AgreementTransactionFromDB } from "./documentTransaction";
import { InvoiceFromDB } from "./invoice";

export interface Agreement {
  number : string;
  linkToFile? : string;
  signDate? : Date;
}

export interface AgreementFromDB extends Agreement {
  id : number;
  Invoice? : InvoiceFromDB;
  AgreementTransactions? : AgreementTransactionFromDB[];
  contractId? : number;
  createdAt? : Date;
  updatedAt? : Date;
}

