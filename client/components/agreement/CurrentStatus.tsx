import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { findLastStatusChange } from "../../utils/functions";
import { AgreementTransactionFromDB } from "../../interfaces/documentTransaction";

interface CurrentStatusProps {
  transactions? : AgreementTransactionFromDB[];
}

export const CurrentStatus = ({ transactions } : CurrentStatusProps) => {
  return (
      <Box>
        <Typography variant="h6" sx={{ marginBottom: "0.5rem" }}>
          Текущий статус
        </Typography>
        {
          transactions?.length === 0 || !transactions
              ? "Статус не менялся"
              : <Box>
                <Typography>
                  {findLastStatusChange(transactions).DocumentStatus?.stage}
                </Typography>
              </Box>
        }
      </Box>
  )
}