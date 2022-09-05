export interface ClientContract {
  number : string;
  startDate : string;
  endDate : string;
  signedVersion : File;
}

export interface ClientContractFromDB extends ClientContract {
  id : number;
  clientId : number;
  createdAt : string;
  updatedAt : string;
}