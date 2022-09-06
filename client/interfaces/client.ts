export interface Client {
  name : string;
  bankDetails : string;
  isPriority : boolean;
  officeAddress : string;
  phone : string;
}

export interface ClientFromDB extends Client {
  id : number;
  teamId : number;
  createdAt : string;
  updatedAt : string;
}