import React from "react";
import Box from "@mui/material/Box";
import format from "date-fns/format";
import HtmlLink from "@mui/material/Link";
import Button from "@mui/material/Button";
import { AddContractShortForm } from "../common/AddContractShortForm";
import { ContractFromDB } from "../../interfaces/contract";

interface ContractInfoProps {
  contract : ContractFromDB;
}

export const ContractInfo = ({ contract } : ContractInfoProps) => {
  const [ isBeingEdited, setIsBeingEdited ] = React.useState(false);

  return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {contract?.startDate
            && <Box sx={{ marginBottom: "0.8rem" }}>
              Начало действия: {format(new Date(contract?.startDate), 'dd/MM/yyyy')}
            </Box>}
        {contract?.endDate
            && <Box sx={{ marginBottom: "0.8rem" }}>
              Конец действия: {format(new Date(contract?.endDate), 'dd/MM/yyyy')}
            </Box>}
        {contract?.signDate
            && <Box sx={{ marginBottom: "1rem" }}>
              Дата подписания: {format(new Date(contract?.signDate), 'dd/MM/yyyy')}
            </Box>}
        {contract?.linkToFileOnDisk
            && <Box sx={{ marginBottom: "1rem" }}>
              <HtmlLink href={contract?.linkToFileOnDisk}>Ссылка на документ на Google Disk</HtmlLink>
            </Box>}

        {!isBeingEdited
            && <Box>
              <Button onClick={() => setIsBeingEdited(true)} variant="contained">Редактировать</Button>
            </Box>
        }
        {isBeingEdited && contract?.counterpartyId &&
            <AddContractShortForm counterpartyId={contract?.counterpartyId}
                                  contract={contract}
                                  finishEditing={() => setIsBeingEdited(false)}
                                  isEditMode={true}
            />}
      </Box>
  )
}