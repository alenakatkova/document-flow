import { ContractFromDB } from "./contract";
import { ContactFromDB } from "./contact";

export interface Counterparty {
  name : string;
  bankDetails? : string;
  isPriority? : boolean;
  officeAddress? : string;
  phone? : string;
  type? : string;
}

export interface CounterpartyFromDB extends Counterparty {
  id : number;
  Contracts? : ContractFromDB[];
  Contacts? : ContactFromDB[];
  teamId? : number;
  createdAt? : Date;
  updatedAt? : Date;
}