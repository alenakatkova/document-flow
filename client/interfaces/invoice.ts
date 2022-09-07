export interface Invoice {
  number : string;
  due? : Date;
  status? : "string";
  linkToFile? : string;
}

export interface InvoiceFromDB extends Invoice {
  id : number;
  agreementId? : number;
  createdAt? : Date;
  updatedAt? : Date;
}

