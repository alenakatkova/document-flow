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

const Contractors : NextPage = () => {
  const { t } = useTranslation("clients");
  let { team } = useAuth();
  const router = useRouter();

  const { data: departments } = useFetch<CounterpartyFromDB[]>("/departments", []);

  return (
      <RequireAuth>
        <Layout title={"Подрядчики"} heading={"Подрядчики"}>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={7}>
                <Box sx={CARD}>
                  <pre>
        {JSON.stringify(departments, null, 2)}
      </pre>
                </Box>
              </Grid>
              <Grid xs={5}>
                <Box sx={CARD}>
                  <Typography variant="h6">{t("contacts.heading")}</Typography>

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

export default Contractors;