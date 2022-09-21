import React, { useState } from "react";
import Box from "@mui/material/Box";
import { RadioButtonChoice } from "../RadioButtonChoice";
import {
  getOptionsForAgreementsRadioBtns,
  getOptionsForContractsRadioBtns,
  isInvoiceAlreadyExists,
  mapCounterpartiesDataForRadioBtn
} from "../../utils/functions";
import { AddInvoiceShortForm } from "./AddInvoiceShortForm";
import { CounterpartyFromDB } from "../../interfaces/counterparty";

interface AddInvoiceFullFormProps {
  counterparties : CounterpartyFromDB[]
}

export const AddInvoiceFullForm = ({ counterparties } : AddInvoiceFullFormProps) => {
  const [ chosenCounterparty, setChosenCounterparty ] = useState<number | undefined>(undefined);
  const [ chosenContract, setChosenContract ] = useState<number | undefined>(undefined);
  const [ chosenAgreement, setChosenAgreement ] = useState<number | undefined>(undefined);

  const onCounterpartyChoiceChange = (counterpartyId : number) => {
    setChosenCounterparty(counterpartyId);
    setChosenContract(undefined);
  }

  const onContractChoiceChange = (contractId : number) => {
    setChosenAgreement(undefined);
    setChosenContract(contractId);
  }

  return (
      <Box>
        <Box>
          <RadioButtonChoice
              options={mapCounterpartiesDataForRadioBtn(counterparties)}
              heading="Выберите клиента"
              setChosenOption={onCounterpartyChoiceChange}
              whatToAdd="клиента"
              radioGroupName="client"
          />
        </Box>

        {chosenCounterparty !== undefined &&
            <Box>
              <RadioButtonChoice
                  options={getOptionsForContractsRadioBtns(chosenCounterparty, counterparties)}
                  heading="Выберите договор"
                  setChosenOption={onContractChoiceChange}
                  whatToAdd="договор"
                  radioGroupName="contract"
              />
            </Box>
        }

        {chosenCounterparty !== undefined && chosenContract !== undefined &&
            <Box>
              <RadioButtonChoice
                  options={getOptionsForAgreementsRadioBtns(chosenCounterparty, chosenContract, counterparties)}
                  heading="Выберите допсоглашение"
                  setChosenOption={setChosenAgreement}
                  whatToAdd="допсоглашение"
                  radioGroupName="agreement"
              />
            </Box>
        }

        {chosenCounterparty !== undefined && chosenAgreement !== undefined && chosenContract !== undefined &&
            isInvoiceAlreadyExists(chosenCounterparty, chosenContract, chosenAgreement, counterparties) && "Счет уже добавлен"}
        {chosenCounterparty !== undefined && chosenAgreement !== undefined && chosenContract !== undefined &&
            !isInvoiceAlreadyExists(chosenCounterparty, chosenContract, chosenAgreement, counterparties) &&
            <AddInvoiceShortForm agreementId={chosenAgreement} />}
      </Box>
  )
}