import { CounterpartyFromDB } from "../../interfaces/counterparty";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { RadioButtonChoice } from "../common/RadioButtonChoice";
import { mapCounterpartiesDataForRadioBtn } from "../../utils/functions";
import { AddContractShortForm } from "./AddContractShortForm";

interface AddContractFullFormProps {
  counterparties : CounterpartyFromDB[];
}

export const AddContractFullForm = ({ counterparties } : AddContractFullFormProps) => {
  const [ chosenContractor, setChosenContractor ] = useState<number | undefined>(undefined);

  return (
      <Box>
        {counterparties && <RadioButtonChoice
            options={mapCounterpartiesDataForRadioBtn(counterparties)}
            heading="Выберите подрядчика"
            setChosenOption={setChosenContractor}
            whatToAdd="подрядчика"
            radioGroupName="contractor"
        />}
        {chosenContractor !== undefined && <AddContractShortForm counterpartyId={chosenContractor} />}
      </Box>
  )
}