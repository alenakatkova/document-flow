import React from "react";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Layout from "../components/layout";
import { CARD_SPACING, CARD } from "../styles/constants";
import useFetch from "../api/useFetch";
import { useAuth } from "../contexts/authProvider";
import { useRouter } from "next/router";
import RequireAuth from "../components/RequireAuth";
import { CounterpartyFromDB } from "../interfaces/counterparty";
import Link from "next/link";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from '@mui/material/List';
import { InternalDepartment, InternalDepartmentFromDB } from "../interfaces/internalDepartment";
import format from "date-fns/format";

const Departments : NextPage = () => {
  const { t } = useTranslation("clients");
  let { team } = useAuth();
  const router = useRouter();

  const { data: departments } = useFetch<InternalDepartmentFromDB[]>("/departments", []);

  return (
      <RequireAuth>
        <Layout title={"Контакты в департаментах"} heading={"Контакты в департаментах"}>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={7}>
                <Box sx={CARD}>
                  <List>
                    {departments.map(department => (
                        <ListItem key={department.name}
                                  sx={{
                                    display: "flex", flexDirection: "row",
                                    ":not(:last-child)": {
                                      borderBottom: "1px solid lightgray"
                                    }
                                  }}>
                          <Box sx={{ width: "35%" }}>
                            <Typography variant="h6">{department.name}</Typography>
                          </Box>
                          <Box sx={{ width: "65%" }}>
                            <List>
                              {department?.InternalContacts?.map(contact => (
                                  <ListItem
                                      key={contact.name}
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column"
                                      }}>
                                    <Typography>{contact.name}</Typography>
                                    <Typography>Внутренний номер: {contact.internalPhoneCode}</Typography>
                                    <Typography>{contact.email}</Typography>
                                    {/*<Typography>{contact.birthday && format(new Date(contact.birthday), 'dd/MM/yyyy')}</Typography>*/}
                                  </ListItem>
                              ))}
                            </List>
                          </Box>
                        </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>
              <Grid xs={5}>
                <Box sx={CARD}>
                  Обращаться по вопросам согласования документов
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Layout>
      </RequireAuth>
  )
};

export async function getStaticProps({ locale } : { locale : string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "clients"])),
    },
  };
}

export default Departments;