export interface InternalContact {
  name : string;
  internalPhoneCode? : string;
  email? : string;
  birthday? : Date;
  job? : string;
}

export interface InternalContactFromDB extends InternalContact {
  id : number;
  internalDepartmentId? : number;
  createdAt? : Date;
  updatedAt? : Date;
}

