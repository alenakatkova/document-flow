export interface Team {
  username : string;
  managerName : string;
  password : string;
  assistantName? : string;
  assistantEmail? : string;
}

export interface TeamFromDB extends Team {
  id : number;
  createdAt? : Date;
  updatedAt? : Date;
}
