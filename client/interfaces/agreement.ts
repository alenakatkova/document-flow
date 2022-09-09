import { AgreementTransactionFromDB } from "./documentTransaction";
import { InvoiceFromDB } from "./invoice";
import { ContractFromDB } from "./contract";

export interface Agreement {
  number : string;
  linkToFile? : string;
  signDate? : Date|null;
}

export interface AgreementFromDB extends Agreement {
  id : number;
  Invoice? : InvoiceFromDB;
  Contract? : ContractFromDB,
  AgreementTransactions? : AgreementTransactionFromDB[];
  contractId? : number;
  createdAt? : Date;
  updatedAt? : Date;
}

