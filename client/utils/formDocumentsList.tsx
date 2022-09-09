import { AgreementTransactionFromDB, ContractTransactionFromDB } from "../interfaces/documentTransaction";
import { DocumentStatusFromDB } from "../interfaces/documentStatus";
import { findLastStatusChange } from "./functions";
import { CounterpartyFromDB } from "../interfaces/counterparty";

export interface Doc {
  link : string;
  isPriority : boolean;
  counterpartyName : string;
  counterpartyLink : string;
  type : "invoice"|"contract"|"agreement";
  status : string;
  isAssistantsResponsibility : boolean;
  number : string;
  parentDocumentLink : string|null;
  parentDocumentName : string|null;
  rusType : string;
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
  const docs : Doc[] = counterparties.reduce((acc : Doc[], curr) => {
    curr?.Contracts && curr.Contracts.forEach(contract => {
      const statusText = getStatusText(contract?.ContractTransactions, documentStatuses)
      const isAssistantResponsible = getIsAssistantResponsibility(contract?.ContractTransactions, documentStatuses)
      acc.push({
        link: "/contracts/" + contract.id,
        isPriority: Boolean(curr.isPriority),
        counterpartyName: curr.name,
        counterpartyLink: `/${curr.type}s/` + curr.id,
        type: "contract",
        rusType: "договор, контракт",
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
          link: "/agreements/" + agreement.id,
          isPriority: Boolean(curr.isPriority),
          counterpartyName: curr.name,
          counterpartyLink: `/${curr.type}s/` + curr.id,
          type: "agreement",
          rusType: "дополнительное соглашение, дс",
          status: statusText,
          isAssistantsResponsibility: isAssistantResponsible,
          number: agreement.number,
          parentDocumentLink: "/contracts/" + contract.id,
          parentDocumentName: "Договор №" + contract.number
        });

        if (agreement.Invoice === null) {
          acc.push({
            link: "",
            isPriority: Boolean(curr.isPriority),
            counterpartyName: curr.name,
            counterpartyLink: `/${curr.type}s/` + curr.id,
            type: "invoice",
            rusType: "счет",
            status: "Счет не занесен в систему",
            isAssistantsResponsibility: true,
            number: "Нет номера",
            parentDocumentLink: "/agreements/" + agreement.id,
            parentDocumentName: "ДС №" + agreement.number
          });
        } else if (agreement.Invoice && agreement.Invoice?.status === "no invoice") {
          acc.push({
            link: "",
            isPriority: Boolean(curr.isPriority),
            counterpartyName: curr.name,
            rusType: "счет",
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
            link: "",
            isPriority: Boolean(curr.isPriority),
            counterpartyName: curr.name,
            counterpartyLink: `/${curr.type}s/` + curr.id,
            type: "invoice",
            rusType: "счет",
            status: status || "Счет не выставлен",
            isAssistantsResponsibility: status === "Оплачен" ? false : true,
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