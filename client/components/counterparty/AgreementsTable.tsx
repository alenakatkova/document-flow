import React from "react";
import Box from "@mui/material/Box";
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
import { InvoiceFromDB } from "../../interfaces/invoice";
import { AgreementFromDB } from "../../interfaces/agreement";
import { formatLastTransactionDate } from "../../utils/functions";
import Link from "next/link";
import { deleteAgreement } from "../../api/agreement";

const translateInvoiceStatus = (invoice : InvoiceFromDB) : string => {
  const status = invoice.status;
  if (status === null || status === undefined) {
    return "";
  } else {
    let translation = "";
    switch (status as string) {
      case "no invoice":
        translation = "Не выставлен";
        break;
      case "payed":
        translation = "Оплачен";
        break;
      case "not payed":
        translation = "Требуется оплата";
        break;
      default:
        translation = "";
    }
    return translation;
  }
}

interface AgreementsTableProps {
  isLoading : boolean;
  agreements : AgreementFromDB[] | undefined;
}

const AgreementsTable = ({ isLoading, agreements } : AgreementsTableProps) => {
  return (
      <>
        {isLoading || (agreements === undefined) || (agreements.length === 0)
            ? ""
            : (
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Box sx={{ margin: 1 }}>
                      <Typography gutterBottom component="div"
                                  sx={{ margin: "1.5rem 0" }}>
                        Дополнительные соглашения к договору
                      </Typography>
                      <TableContainer
                          sx={{ border: "1px solid", borderColor: "lightgray" }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Номер</TableCell>
                              <TableCell align="center">Дата подписания</TableCell>
                              <TableCell align="center">Статус</TableCell>
                              <TableCell align="center">Дата присвоения статуса</TableCell>
                              <TableCell align="center">Документ в облачном хранилище</TableCell>
                              <TableCell align="center">Счет</TableCell>
                              <TableCell align="center">Статус счета</TableCell>
                              <TableCell align="center">Действия</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {agreements.map((agreement) => (
                                    <TableRow
                                        key={"agreement" + agreement?.number}
                                    >
                                      <TableCell component="th" scope="row">
                                        {agreement?.number}
                                      </TableCell>
                                      <TableCell align="center">
                                        {agreement?.signDate && format(new Date(agreement?.signDate), 'dd/MM/yyyy')}
                                      </TableCell>
                                      <TableCell align="center">
                                        {agreement?.AgreementTransactions
                                            && agreement?.AgreementTransactions[0]?.DocumentStatus?.stage}
                                      </TableCell>
                                      <TableCell align="center">
                                        {agreement?.AgreementTransactions &&
                                        agreement?.AgreementTransactions?.length > 0
                                            ? formatLastTransactionDate(agreement?.AgreementTransactions)
                                            : ""
                                        }
                                      </TableCell>
                                      <TableCell align="center">
                                        {
                                          agreement?.linkToFile
                                              ? <HtmlLink
                                                  href={agreement?.linkToFile}>Перейти</HtmlLink>
                                              : <Typography color="warning.main">
                                                Необходимо добавить ссылку
                                              </Typography>
                                        }
                                      </TableCell>
                                      <TableCell align="center">
                                        {agreement?.Invoice?.linkToFile
                                            ? <HtmlLink href={agreement?.Invoice?.linkToFile}>
                                              Ссылка на счет № {agreement?.Invoice?.number}
                                            </HtmlLink>
                                            : <Typography>Счет № {agreement?.Invoice?.number}</Typography>
                                        }
                                      </TableCell>
                                      <TableCell align="center">
                                        {agreement?.Invoice && translateInvoiceStatus(agreement?.Invoice)}
                                      </TableCell>
                                      <TableCell align="center">
                                        {/*<Button>Редактировать</Button>*/}
                                        {/*<Button>Удалить</Button>*/}
                                        <Link href={`/agreements/${agreement.id}`}>
                                          <Button>Открыть</Button>
                                        </Link>
                                      </TableCell>
                                    </TableRow>
                                )
                            )
                            }
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </TableCell>
                </TableRow>
            )
        }
      </>
  )
}

export default AgreementsTable;

