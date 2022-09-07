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
                  <Typography variant="h6">Контакты</Typography>
                  {isLoading
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
                                        {contact.birthday && format(new Date(contact.birthday), 'MM/dd/yyyy')}
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
                  <Button variant="contained">Добавить новый контакт</Button>
                </Box>
              </Grid>
              <Grid xs={12}>
                <Box sx={CARD}>
                  <Typography variant="h6">Документы</Typography>
                  {!isLoading && JSON.stringify(client)}
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

