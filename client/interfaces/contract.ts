import { DocumentTransactionFromDB } from "./documentTransaction";
import { AgreementFromDB } from "./agreement";

export interface Contract {
  number : string;
  startDate? : Date;
  endDate? : Date;
  linkToFileOnDisk? : string;
  signDate? : Date;
}

export interface ContractFromDB extends Contract {
  id : number;
  ContractTransactions? : DocumentTransactionFromDB[];
  Agreements? : AgreementFromDB[];
  clientId? : number;
  createdAt? : string;
  updatedAt? : string;
}

