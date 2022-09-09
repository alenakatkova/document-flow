import { DocumentTransactionFromDB } from "./documentTransaction";
import { AgreementFromDB } from "./agreement";
import { CounterpartyFromDB } from "./counterparty";

export interface Contract {
  number : string;
  startDate? : Date|null;
  endDate? : Date|null;
  linkToFileOnDisk? : string;
  signDate? : Date|null;
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

