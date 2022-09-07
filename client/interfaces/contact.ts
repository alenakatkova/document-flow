export interface Contact {
  name : string;
  phone? : string;
  email? : string;
  birthday? : Date;
  job? : string;
}

export interface ContactFromDB extends Contact {
  id : number;
  counterpartyId? : number;
  createdAt? : Date;
  updatedAt? : Date;
}

