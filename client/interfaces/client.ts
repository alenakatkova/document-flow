export interface Client {
  fullName : string;
  shortName : string;
  businessAddress : string;
  postalAddress : string;
  inn : string;
  kpp : string;
  account : string;
  corrAccount : string;
  phone : string;
}

export interface ClientFromDB extends Client {
  id : number;
  teamId : number;
  createdAt : string;
  updatedAt : string;
}