import { ContractTransactionFromDB } from "../../interfaces/documentTransaction";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { findLastStatusChange } from "../../utils/functions";
import React from "react";

interface CurrentStatusProps {
  contractTransactions : ContractTransactionFromDB[];
}

export const CurrentStatus = ({ contractTransactions } : CurrentStatusProps) => {
  return (
      <Box>
        <Typography variant="h6" sx={{ marginBottom: "0.5rem" }}>
          Текущий статус
        </Typography>
        {
          contractTransactions.length === 0 || !contractTransactions
              ? "Статус не менялся"
              : <Box>
                <Typography>
                  {findLastStatusChange(contractTransactions).DocumentStatus?.stage}
                </Typography>
              </Box>
        }
      </Box>
  )
};