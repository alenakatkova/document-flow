import { AgreementTransactionFromDB, ContractTransactionFromDB } from "../interfaces/documentTransaction";
import format from "date-fns/format";
import React from "react";
import { ContractFromDB } from "../interfaces/contract";
import { Option } from "../components/RadioButtonChoice";
import { AgreementFromDB } from "../interfaces/agreement";
import { CounterpartyFromDB } from "../interfaces/counterparty";

export const generateDateFromYYYYMMDD = (
    year : number | string | undefined,
    month : number | string | undefined,
    day : number | string | undefined
) => {
  if (!year || !day || !month) {
    return undefined;
  }
  return new Date(Number(year), Number(month) - 1, Number(day))
}

const sortById = (
    a : ContractTransactionFromDB | AgreementTransactionFromDB,
    b : ContractTransactionFromDB | AgreementTransactionFromDB
) => {
  if (a.id > b.id) {
    return -1;
  }
  if (a.id < b.id) {
    return 1;
  }
  return 0;
}

export const findLastStatusChange = (transactions : ContractTransactionFromDB[] | AgreementTransactionFromDB[]) => {
  const sorted = transactions?.sort(sortById);
  return sorted[0];
}

export const formatLastTransactionDate = (transactions : ContractTransactionFromDB[] | AgreementTransactionFromDB[]) => {
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

export const mapContractsDataForRadioBtns = (contracts : ContractFromDB[]) : Option[] => {
  return contracts.map(contract => {
    return {
      value: "Договор №" + contract.number,
      label: "Договор №" + contract.number,
      id: contract.id
    }
  });
};

export const mapAgreementsDataForRadioBtns = (agreements : AgreementFromDB[]) : Option[] => {
  return agreements.map(agreement => {
    return {
      value: "ДС №" + agreement.number,
      label: "ДС №" + agreement.number,
      id: agreement.id
    }
  });
};

const getContractsArrayOfChosenClient = (fetchedContractors : CounterpartyFromDB[], id : number) => {
  return fetchedContractors?.find(contractor => contractor.id === id)?.Contracts || [];
};

const getAgreementsArrayOfChosenContract = (fetchedContracts : ContractFromDB[], id : number) => {
  return fetchedContracts?.find(contract => contract.id === id)?.Agreements || [];
};

export const getOptionsForContractsRadioBtns = (chosenClientId : number, counterparties : CounterpartyFromDB[]) => {
  return mapContractsDataForRadioBtns(getContractsArrayOfChosenClient(counterparties, chosenClientId));
};

export const getOptionsForAgreementsRadioBtns = (chosenContractorId : number, chosenContractId : number, counterparties : CounterpartyFromDB[]) => {
  const clientContracts = getContractsArrayOfChosenClient(counterparties, chosenContractorId);
  const agreementsToContract = getAgreementsArrayOfChosenContract(clientContracts, chosenContractId)
  return mapAgreementsDataForRadioBtns(agreementsToContract)
};

export const isInvoiceAlreadyExists = (chosenContractorId : number, chosenContractId : number, chosenAgreementId : number, counterparties : CounterpartyFromDB[]) => {
  const clientContracts = getContractsArrayOfChosenClient(counterparties, chosenContractorId);
  const agreementsToContract = getAgreementsArrayOfChosenContract(clientContracts, chosenContractId);
  const agreement = agreementsToContract?.find(agreement => agreement.id === chosenAgreementId);
  return agreement?.Invoice !== null && agreement?.Invoice !== undefined;
};

export const mapCounterpartiesDataForRadioBtn = (counterparties : CounterpartyFromDB[]) => {
  return counterparties.map(contractor => {
    return {
      value: contractor.name,
      label: contractor.name,
      id: contractor.id
    }
  });
};