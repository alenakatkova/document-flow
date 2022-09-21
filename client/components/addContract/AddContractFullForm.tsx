import { CounterpartyFromDB } from "../../interfaces/counterparty";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { RadioButtonChoice } from "../common/RadioButtonChoice";
import { mapCounterpartiesDataForRadioBtn } from "../../utils/functions";
import { AddContractShortForm } from "../common/AddContractShortForm";

interface AddContractFullFormProps {
  counterparties : CounterpartyFromDB[];
}

export const AddContractFullForm = ({ counterparties } : AddContractFullFormProps) => {
  const [ chosenCounterparty, setChosenCounterparty ] = useState<number | undefined>(undefined);

  return (
      <Box>
        {counterparties && <RadioButtonChoice
            options={mapCounterpartiesDataForRadioBtn(counterparties)}
            heading="Выберите контрагента"
            setChosenOption={setChosenCounterparty}
            whatToAdd="контрагента"
            radioGroupName="counterparty"
        />}
        {chosenCounterparty !== undefined && <AddContractShortForm counterpartyId={chosenCounterparty} />}
      </Box>
  )
}