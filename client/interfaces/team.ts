export interface Team {
  name : string;
  password : string;
  assistant_name : string;
  assistant_email : string;
  junior_name : string;
  junior_email : string;
}

export interface TeamFromDB extends Team {
  id : number;
  createdAt : string;
  updatedAt : string;
}
