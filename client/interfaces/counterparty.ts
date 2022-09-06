import { ContractFromDB } from "./contract";
import { ContactFromDB } from "./contact";

export interface Counterparty {
  name : string;
  bankDetails? : string;
  isPriority? : boolean;
  officeAddress? : string;
  phone? : string;
}

export interface CounterpartyFromDB extends Counterparty {
  id : number;
  Contracts? : ContractFromDB[];
  Contacts? : ContactFromDB[];
  type? : string;
  teamId? : number;
  createdAt? : string;
  updatedAt? : string;
}