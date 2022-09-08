import { DocumentTransactionFromDB } from "./documentTransaction";
import { AgreementFromDB } from "./agreement";
import { CounterpartyFromDB } from "./counterparty";

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
  Counterparty? : CounterpartyFromDB;
  counterpartyId? : number;
  createdAt? : Date;
  updatedAt? : Date;
}

