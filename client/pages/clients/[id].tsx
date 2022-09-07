import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import useFetch from "../../api/useFetch";
import RequireAuth from "../../components/RequireAuth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { CARD_SPACING, CARD } from "../../styles/constants";
import { CounterpartyFromDB } from "../../interfaces/counterparty";
import { Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import format from "date-fns/format";
import HtmlLink from '@mui/material/Link';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import isBefore from 'date-fns/isBefore';
import { DocumentTransactionFromDB } from "../../interfaces/documentTransaction";

function sortById(a : DocumentTransactionFromDB, b : DocumentTransactionFromDB) {
  if (a.id > b.id) {
    return -1;
  }
  if (a.id < b.id) {
    return 1;
  }
  return 0;
}

const findLastStatusChange = (transactions : DocumentTransactionFromDB[]) => {
  const sorted = transactions.sort(sortById);
  return sorted[0];
}

const formatLastTransactionDate = (transactions : DocumentTransactionFromDB[]) => {
  const transaction = findLastStatusChange(transactions);

  return !!transaction?.createdAt
      ? (
          <>
            {
              format(
                  new Date(transaction?.createdAt),
                  'dd/MM/yyyy'
              )
            }
          </>
      )
      : ""
};

const Client : NextPage = () => {
  const router = useRouter();

  const { data: client, isLoading } = useFetch<CounterpartyFromDB>(`counterparties/${router.query.id}`,
      {
        id: 0,
        name: ""
      }
  );

  return (
      <RequireAuth>
        <Layout title={client.name + ": страница клиента"} heading={client.name}>

          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={12}>
                <Box sx={CARD}>
                  <Typography variant="h6" sx={{ marginBottom: "1rem" }}>Контакты</Typography>
                  {isLoading && !client?.Contacts
                      ? ""
                      : (
                          <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                              <TableHead>
                                <TableRow>
                                  <TableCell>ФИО</TableCell>
                                  <TableCell align="center">Должность</TableCell>
                                  <TableCell align="center">Телефон</TableCell>
                                  <TableCell align="center">Почта</TableCell>
                                  <TableCell align="center">День рождения</TableCell>
                                  <TableCell align="center">Действия</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {client?.Contacts?.map((contact) => (
                                    <TableRow
                                        key={contact.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        {contact.name}
                                      </TableCell>
                                      <TableCell align="center">{contact.job}</TableCell>
                                      <TableCell align="center">{contact.phone}</TableCell>
                                      <TableCell align="center">{contact.email}</TableCell>
                                      <TableCell align="center">
                                        {contact.birthday && format(new Date(contact.birthday), 'dd/MM/yyyy')}
                                      </TableCell>
                                      <TableCell align="center">
                                        <Button>Редактировать</Button>
                                        <Button>Удалить</Button>
                                      </TableCell>
                                    </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                      )
                  }
                  <Button variant="contained" sx={{ marginTop: "1rem" }}>Добавить контактное лицо</Button>
                </Box>
              </Grid>
              <Grid xs={12}>
                <Box sx={CARD}>
                  <Typography variant="h6" sx={{ marginBottom: "1rem" }}>Документы</Typography>
                  {isLoading && !client?.Contacts
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
                                {client?.Contracts?.map((contract) => (
                                    <>
                                      <TableRow
                                          key={contract?.number}
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

                                                // format(
                                                //     new Date(contract?.ContractTransactions[0].createdAt),
                                                //     'dd/MM/yyyy'
                                                // )
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
                                      {isLoading && !contract?.Agreements
                                          ? ""
                                          : (
                                              <TableRow>
                                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                  <Box sx={{ margin: 1 }}>
                                                    <Typography gutterBottom component="div"
                                                                sx={{ margin: "1.5rem 0" }}>
                                                      Дополнительные соглашения к договору
                                                    </Typography>
                                                    <TableContainer
                                                        sx={{ border: "1px solid", borderColor: "lightgray" }}>
                                                      <Table size="small" aria-label="a dense table">
                                                        <TableHead>
                                                          <TableRow>
                                                            <TableCell>Номер</TableCell>
                                                            <TableCell align="center">Дата подписания</TableCell>
                                                            <TableCell align="center">Статус</TableCell>
                                                            <TableCell align="center">Дата присвоения
                                                              статуса</TableCell>
                                                            <TableCell align="center">Ссылка на последнюю
                                                              версию</TableCell>
                                                            <TableCell align="center">Действия</TableCell>
                                                          </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                          {contract?.Agreements?.map((agreement) => (
                                                                  <TableRow
                                                                      key={agreement?.number}
                                                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                  >
                                                                    <TableCell component="th" scope="row">
                                                                      {agreement?.number}
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                      {agreement?.signDate && format(new Date(agreement?.signDate), 'dd/MM/yyyy')}
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                      {agreement?.AgreementTransactions
                                                                          && agreement?.AgreementTransactions[0].DocumentStatus?.stage}
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                      {agreement?.AgreementTransactions &&
                                                                      agreement?.AgreementTransactions?.length > 0
                                                                          ? formatLastTransactionDate(agreement?.AgreementTransactions)
                                                                          // format(
                                                                          //     new Date(findLastStatusChange(agreement?.AgreementTransactions).createdAt),
                                                                          //     'dd/MM/yyyy'
                                                                          // )
                                                                          : ""
                                                                      }
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                      {<HtmlLink
                                                                          href={contract?.linkToFileOnDisk}>Ссылка</HtmlLink>}
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                      <Button>Редактировать</Button>
                                                                      <Button>Удалить</Button>
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
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                      )
                  }
                  {!isLoading && JSON.stringify(client?.Contracts)}
                </Box>
              </Grid>
            </Grid>
          </Box>


        </Layout>
      </RequireAuth>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  }
}

export async function getStaticProps({ locale } : { locale : string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "clients"])),
    },
  };
}

export default Client;

