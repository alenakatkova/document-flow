import { InternalContactFromDB } from "./internalContact";

export interface InternalDepartment {
  name : string;
}

export interface InternalDepartmentFromDB extends InternalDepartment {
  id : number;
  InternalContacts? : InternalContactFromDB[];
  createdAt? : Date;
  updatedAt? : Date;
}

