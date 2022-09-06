import { DocumentStatusFromDB } from "./documentStatus";

export interface DocumentTransaction {
  comment? : string;
  documentStatusId? : number;
  contractId? : number;
}

export interface DocumentTransactionFromDB extends DocumentTransaction {
  id : number;
  DocumentStatus? : DocumentStatusFromDB;
  clientId? : number;
  createdAt? : string;
  updatedAt? : string;
}

