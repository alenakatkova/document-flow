import { AgreementTransactionFromDB, ContractTransactionFromDB } from "../interfaces/documentTransaction";
import { DocumentStatusFromDB } from "../interfaces/documentStatus";
import { findLastStatusChange } from "./functions";
import { CounterpartyFromDB } from "../interfaces/counterparty";

interface Document {
  isPriority : boolean;
  counterpartyName : string;
  counterpartyLink : string;
  type : "invoice"|"contract"|"agreement";
  status : string;
  isAssistantsResponsibility : boolean;
  number : string;
  parentDocumentLink : string|null;
  parentDocumentName : string|null;
}

const getStatusText = (
    transactions : ContractTransactionFromDB[]|AgreementTransactionFromDB[]|undefined,
    possibleStatuses : DocumentStatusFromDB[]
) => {
  if (transactions === undefined) return "Статус не задан";

  const statusId = transactions && transactions.length > 0
      ? findLastStatusChange(transactions)?.DocumentStatus?.id
      : -1;

  let statusText : string;
  if (statusId === -1) {
    statusText = "Статус не задан"
  } else {
    statusText = possibleStatuses.find(item => item.id === statusId)?.stage || "Статус не задан";
  }

  return statusText;
};
const getIsAssistantResponsibility = (
    transactions : ContractTransactionFromDB[]|AgreementTransactionFromDB[]|undefined,
    possibleStatuses : DocumentStatusFromDB[]
) => {
  if (transactions === undefined) return true;

  const lastStatusId = transactions && transactions.length > 0
      ? findLastStatusChange(transactions)?.DocumentStatus?.id
      : -1;

  let isAssistantResponsible : boolean;
  if (lastStatusId === -1) {
    isAssistantResponsible = true;
  } else {
    const boolFromDB = possibleStatuses.find(item => item.id === lastStatusId)?.isAssistantResponsibility
    isAssistantResponsible = boolFromDB === undefined ? true : boolFromDB;
  }

  return isAssistantResponsible;
};
export const formDocumentsList = (counterparties : CounterpartyFromDB[], documentStatuses : DocumentStatusFromDB[]) => {
  const docs : Document[] = counterparties.reduce((acc : Document[], curr) => {
    curr?.Contracts && curr.Contracts.forEach(contract => {
      const statusText = getStatusText(contract?.ContractTransactions, documentStatuses)
      const isAssistantResponsible = getIsAssistantResponsibility(contract?.ContractTransactions, documentStatuses)
      acc.push({
        isPriority: Boolean(curr.isPriority),
        counterpartyName: curr.name,
        counterpartyLink: `/${curr.type}s/` + curr.id,
        type: "contract",
        status: statusText,
        isAssistantsResponsibility: isAssistantResponsible,
        number: contract.number,
        parentDocumentLink: null,
        parentDocumentName: null
      });

      contract.Agreements && contract.Agreements.forEach(agreement => {
        const statusText = getStatusText(agreement?.AgreementTransactions, documentStatuses)
        const isAssistantResponsible = getIsAssistantResponsibility(agreement?.AgreementTransactions, documentStatuses)
        acc.push({
          isPriority: Boolean(curr.isPriority),
          counterpartyName: curr.name,
          counterpartyLink: `/${curr.type}s/` + curr.id,
          type: "agreement",
          status: statusText,
          isAssistantsResponsibility: isAssistantResponsible,
          number: agreement.number,
          parentDocumentLink: "/contracts/" + contract.id,
          parentDocumentName: "Договор №" + contract.number
        });

        if (agreement.Invoice === null) {
          acc.push({
            isPriority: Boolean(curr.isPriority),
            counterpartyName: curr.name,
            counterpartyLink: `/${curr.type}s/` + curr.id,
            type: "invoice",
            status: "Счет не занесен в систему",
            isAssistantsResponsibility: true,
            number: "Нет номера",
            parentDocumentLink: "/agreements/" + agreement.id,
            parentDocumentName: "ДС №" + agreement.number
          });
        } else if (agreement.Invoice && agreement.Invoice?.status === "no invoice") {
          acc.push({
            isPriority: Boolean(curr.isPriority),
            counterpartyName: curr.name,
            counterpartyLink: `/${curr.type}s/` + curr.id,
            type: "invoice",
            status: "Счет не выставлен",
            isAssistantsResponsibility: false,
            number: agreement.number,
            parentDocumentLink: "/agreements/" + agreement.id,
            parentDocumentName: "ДС №" + agreement.number
          });
        } else {
          const status = agreement.Invoice?.status;
          console.log(status)
          acc.push({
            isPriority: Boolean(curr.isPriority),
            counterpartyName: curr.name,
            counterpartyLink: `/${curr.type}s/` + curr.id,
            type: "invoice",
            status: status || "Счет не выставлен",
            isAssistantsResponsibility: false,
            number: agreement.number,
            parentDocumentLink: "/agreements/" + agreement.id,
            parentDocumentName: "ДС №" + agreement.number
          });
        }

      });
    });
    return acc;
  }, []);

  return docs;
};