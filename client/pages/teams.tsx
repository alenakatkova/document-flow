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
import { TeamFromDB } from "../interfaces/team";

const Departments : NextPage = () => {
  const { t } = useTranslation("clients");
  let { team } = useAuth();
  const router = useRouter();

  const { data: teams } = useFetch<TeamFromDB[]>("/teams", []);

  return (
      <RequireAuth>
        <Layout title={"Проектные команды"} heading={"Проектные команды"}>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={12}>
                <Box sx={CARD}>
                  <List>
                    {teams.map(team => (
                        <Box key={team?.username}
                             sx={{

                               display: "flex",
                               flexDirection: "column",
                               ":not(:last-child)": {
                                 borderBottom: "1px solid lightgray",
                                 marginBottom: "2rem"
                               }
                             }}>

                          <Typography variant="h6">Проектный руководитель: {team?.managerName}</Typography>
                          <Box
                              sx={{ margin: "1rem" }}>{team?.assistantName && "Ассистент: " + team?.assistantName}</Box>
                          <Box
                              sx={{ margin: "1rem" }}>{team?.assistantEmail && "E-mail ассистента: " + team?.assistantEmail}</Box>
                        </Box>
                    ))}
                  </List>
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