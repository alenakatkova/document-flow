import React from "react";
import Box from "@mui/material/Box";
import { CARD } from "../styles/constants";
import { Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import format from "date-fns/format";
import HtmlLink from '@mui/material/Link';
import isBefore from 'date-fns/isBefore';
import { ContractFromDB } from "../interfaces/contract";
import CounterpartyAgreementsTable from "./CounterpartyAgreementsTable";
import { formatLastTransactionDate } from "../utils/functions";

interface CounterpartyDocumentsBigBlockProps {
  isLoading : boolean;
  contracts : ContractFromDB[]|undefined;
}

const CounterpartyDocumentsBigBlock = ({ isLoading, contracts } : CounterpartyDocumentsBigBlockProps) => {
  return (
      <Box sx={CARD}>
        <Typography variant="h6" sx={{ marginBottom: "1rem" }}>Документы</Typography>
        {isLoading || (contracts === undefined) || (contracts.length === 0)
            ? ""
            : (
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Номер</TableCell>
                        <TableCell align="center">Дата подписания</TableCell>
                        <TableCell align="center">Статус</TableCell>
                        <TableCell align="center">Дата присвоения статуса</TableCell>
                        <TableCell align="center">Срок действия</TableCell>
                        <TableCell align="center">Ссылка на последнюю версию</TableCell>
                        <TableCell align="center">Действия</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {contracts?.map((contract) => (
                          <>
                            <TableRow
                                key={"contract" + contract?.number}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {contract?.number}
                              </TableCell>
                              <TableCell align="center">
                                {contract?.signDate && format(new Date(contract?.signDate), 'dd/MM/yyyy')}
                              </TableCell>
                              <TableCell align="center">
                                {contract?.ContractTransactions
                                    && contract?.ContractTransactions[0].DocumentStatus?.stage}
                              </TableCell>
                              <TableCell align="center">
                                {
                                  contract?.ContractTransactions && contract?.ContractTransactions.length > 0
                                      ? formatLastTransactionDate(contract?.ContractTransactions)
                                      : ""
                                }
                              </TableCell>
                              <TableCell align="center">
                                {contract?.startDate && format(new Date(contract?.startDate), 'dd/MM/yyyy')}
                                —
                                {contract?.endDate && format(new Date(contract?.endDate), 'dd/MM/yyyy')}
                                ,
                                {
                                    contract?.endDate
                                    && isBefore(new Date(), new Date(contract?.endDate))
                                    && <Typography color="warning.main"> действует</Typography>
                                }
                              </TableCell>
                              <TableCell align="center">
                                {<HtmlLink href={contract?.linkToFileOnDisk}>Ссылка</HtmlLink>}
                              </TableCell>
                              <TableCell align="center">
                                <Button>Редактировать</Button>
                                <Button>Удалить</Button>
                              </TableCell>
                            </TableRow>
                            <CounterpartyAgreementsTable isLoading={isLoading} agreements={contract?.Agreements}/>
                          </>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            )
        }
      </Box>
  )
}

export default CounterpartyDocumentsBigBlock;

