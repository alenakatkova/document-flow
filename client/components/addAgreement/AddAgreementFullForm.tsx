import React, { useState } from "react";
import Box from "@mui/material/Box";
import { RadioButtonChoice } from "../common/RadioButtonChoice";
import { getOptionsForContractsRadioBtns, mapCounterpartiesDataForRadioBtn } from "../../utils/functions";
import { AddAgreementShortForm } from "./AddAgreementShortForm";
import { CounterpartyFromDB } from "../../interfaces/counterparty";

interface AddAgreementFullFormProps {
  counterparties : CounterpartyFromDB[]
}

export const AddAgreementFullForm = ({ counterparties } : AddAgreementFullFormProps) => {
  const [ chosenCounterparty, setChosenCounterparty ] = useState<number | undefined>(undefined);
  const [ chosenContract, setChosenContract ] = useState<number | undefined>(undefined);

  const onContractorChoiceChange = (counterpartyId : number) => {
    setChosenCounterparty(counterpartyId);
    setChosenContract(undefined);
  }

  return (
      <Box>
        <Box>
          <RadioButtonChoice
              options={mapCounterpartiesDataForRadioBtn(counterparties)}
              heading="Выберите контрагента"
              setChosenOption={onContractorChoiceChange}
              whatToAdd="контрагента"
              radioGroupName="контрагент"
          />
        </Box>

        {chosenCounterparty !== undefined &&
            <Box>
              <RadioButtonChoice
                  options={getOptionsForContractsRadioBtns(chosenCounterparty, counterparties)}
                  heading="Выберите договор"
                  setChosenOption={setChosenContract}
                  whatToAdd="договор"
                  radioGroupName="contract"
              />
            </Box>
        }

        {chosenContract !== undefined && <AddAgreementShortForm contractId={chosenContract} />}
      </Box>
  )
}