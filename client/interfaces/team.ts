export interface Team {
  name : string;
  password : string;
  assistantName : string;
  assistantEmail : string;
  juniorName : string;
  juniorEmail : string;
}

export interface TeamFromDB extends Team {
  id : number;
  createdAt : string;
  updatedAt : string;
}
