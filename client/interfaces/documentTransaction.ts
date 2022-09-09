import { DocumentStatusFromDB } from "./documentStatus";

export interface ContractTransaction {
  comment? : string;
  documentStatusId? : number;
  contractId? : number;
}

export interface ContractTransactionFromDB extends ContractTransaction {
  id : number;
  DocumentStatus? : DocumentStatusFromDB;
  clientId? : number;
  createdAt? : Date;
  updatedAt? : Date;
}

export interface AgreementTransaction {
  comment? : string;
  documentStatusId? : number;
  agreementId? : number;
}

export interface AgreementTransactionFromDB extends AgreementTransaction {
  id : number;
  DocumentStatus? : DocumentStatusFromDB;
  clientId? : number;
  createdAt? : Date;
  updatedAt? : Date;
}


