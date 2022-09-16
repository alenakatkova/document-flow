import React from "react";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Layout from "../components/layout";
import useFetch from "../api/useFetch";
import RequireAuth from "../components/RequireAuth";
import { TeamFromDB } from "../interfaces/team";
import { CARD_SPACING, CARD, PAGE_CONTAINER } from "../styles/constants";
import TeamList from "../components/teams/TeamList";

const Teams : NextPage = () => {
  const { t } = useTranslation("teams");

  const { data: teams, isLoading } = useFetch<TeamFromDB[]>("/teams", []);

  return (
      <RequireAuth>
        <Layout title={t("title")} heading={t("heading")}>
          <Box sx={PAGE_CONTAINER}>
            {isLoading && "Loading..."}
            {!isLoading &&
                <Grid container spacing={CARD_SPACING}>
                  <Grid xs={12}>
                    <Box sx={CARD}>
                      <TeamList teams={teams} />
                    </Box>
                  </Grid>
                </Grid>
            }
          </Box>
        </Layout>
      </RequireAuth>
  )
};

export async function getStaticProps({ locale } : { locale : string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [ "common", "teams" ])),
    },
  };
}

export default Teams;