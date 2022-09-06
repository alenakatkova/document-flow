export interface ClientContract {
  number : string;
  startDate : Date;
  endDate : Date;
  file? : string;
}

export interface ClientContractFromDB extends ClientContract {
  id : number;
  clientId : number;
  createdAt : string;
  updatedAt : string;
}