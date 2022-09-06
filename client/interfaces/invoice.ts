export interface Invoice {
  number : string;
  due? : Date;
  status? : "string";
  linkToFileOnDisk? : string;
}

export interface InvoiceFromDB extends Invoice {
  id : number;
  agreementId? : number;
  createdAt? : string;
  updatedAt? : string;
}

