import { ContractTransactionFromDB } from "../../interfaces/documentTransaction";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import format from "date-fns/format";
import React from "react";

interface StatusChangeHistoryProps {
  transactions? : ContractTransactionFromDB[];
}

export const StatusChangeHistory = ({ transactions } : StatusChangeHistoryProps) => {
  return (
      <Box>
        <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
          История изменений статуса договора
        </Typography>
        {transactions && <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Дата</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell>Комментарий</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions?.map(transaction => (
                  <TableRow key={transaction?.id}>
                    <TableCell>{transaction?.createdAt
                        && format(new Date(transaction?.createdAt), 'dd/MM/yyyy')}</TableCell>
                    <TableCell>{transaction?.DocumentStatus?.stage}</TableCell>
                    <TableCell>{transaction?.comment}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>}
      </Box>
  )
}