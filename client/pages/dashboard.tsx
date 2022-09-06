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
import Layout from "../components/layout";
import { Team as Inputs, TeamFromDB } from "../interfaces/team";
import { CARD_SPACING, CARD } from "../styles/constants";
import useFetch from "../api/useFetch";
import { createTeam } from "../api/team";
import { useAuth } from "../contexts/authProvider";
import { useRouter } from "next/router";
import RequireAuth from "../components/RequireAuth";

const Dashboard : NextPage = () => {

  const { t } = useTranslation("dashboard");

  let { team } = useAuth();
  const router = useRouter();

  return (
      <RequireAuth>
        <Layout title={t("title")} heading={t("heading")}>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={7}>
                <Box sx={CARD}>
                  <Typography variant="h6">{t("inWork.heading")}</Typography>
                  <Box>содержание</Box>
                </Box>
              </Grid>
              <Grid xs={5}>
                <Grid container spacing={CARD_SPACING}>
                  <Grid xs={12}>
                    <Box sx={CARD}>
                      <Typography variant="h6">{t("birthdays.heading")}</Typography>
                      <Box>содержание</Box>
                    </Box>
                  </Grid>
                  <Grid xs={12}>
                    <Box sx={CARD}>
                      <Typography variant="h6">{t("tasks.heading")}</Typography>
                      <Box>содержание</Box>
                    </Box>
                  </Grid>
                </Grid>
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
      ...(await serverSideTranslations(locale, ["common", "dashboard"])),
    },
  };
}

export default Dashboard;