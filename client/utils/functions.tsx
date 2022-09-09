import { DocumentTransactionFromDB } from "../interfaces/documentTransaction";
import format from "date-fns/format";
import React from "react";

export const generateDateFromYYYYMMDD = (
    year : number|string|undefined,
    month : number|string|undefined,
    day : number|string|undefined
) => {
  if (!year || !day || !month) {
    return undefined;
  }
  return new Date(Number(year), Number(month) - 1, Number(day))
}

const sortById = (a : DocumentTransactionFromDB, b : DocumentTransactionFromDB) => {
  if (a.id > b.id) {
    return -1;
  }
  if (a.id < b.id) {
    return 1;
  }
  return 0;
}

export const findLastStatusChange = (transactions : DocumentTransactionFromDB[]) => {
  const sorted = transactions.sort(sortById);
  return sorted[0];
}

export const formatLastTransactionDate = (transactions : DocumentTransactionFromDB[]) => {
  const transaction = findLastStatusChange(transactions);

  return !!transaction?.createdAt
      ? (
          <>
            {
              format(
                  new Date(transaction?.createdAt),
                  'dd/MM/yyyy'
              )
            }
          </>
      )
      : ""
};