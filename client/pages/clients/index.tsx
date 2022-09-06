import React, { useEffect } from "react";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Layout from "../../components/layout";
import { Team as Inputs, TeamFromDB } from "../../interfaces/team";
import { CARD_SPACING, CARD } from "../../styles/constants";
import useFetch from "../../api/useFetch";
import { createTeam } from "../../api/team";
import { useAuth } from "../../contexts/authProvider";
import { useRouter } from "next/router";
import RequireAuth from "../../components/RequireAuth";

const Clients : NextPage = () => {
  const { t } = useTranslation("clients");
  let { team } = useAuth();
  const router = useRouter();

  const {
    data: clients,
    fetchData: refetchClients,
    isLoading,
    error
  } = useFetch<TeamFromDB[]>("/counterparties", [], { teamId: team, type: "client" });

  return (
      <RequireAuth>
        <Layout title={t("title")} heading={t("heading")}>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={7}>
                <Box sx={CARD}>
                  <Typography variant="h6">{t("inWork.heading")}</Typography>
                  <Box>{!isLoading && (
                      <div>
                        {clients.map(client => (
                            <Box sx={{ border: "1px solid blue", marginBottom: "1rem" }}
                                 key={client.name.toLowerCase()}>
                              {JSON.stringify(client)}
                            </Box>
                        ))}
                      </div>
                  )}</Box>
                </Box>
              </Grid>
              <Grid xs={5}>
                <Box sx={CARD}>
                  <Typography variant="h6">{t("contacts.heading")}</Typography>
                  <Box>Список с телефонами, ФИО, имейлами, должностью. Скрытое конкретно здесь: дни рождения и
                    предпочтения по подаркам, основной или дополнительный. Но основные подчеркиваются</Box>
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

export default Clients;