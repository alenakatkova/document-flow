export interface Invoice {
  number : string;
  due? : Date;
  status? : string;
  linkToFile? : string;
  agreementId? : number;
}

export interface InvoiceFromDB extends Invoice {
  id : number;
  createdAt? : Date;
  updatedAt? : Date;
}

