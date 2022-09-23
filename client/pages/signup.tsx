import React from "react";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Layout from "../components/layout";
import { CARD_SPACING } from "../styles/constants";
import AuthPageSideBlock from "../components/common/AuthPageSideBlock";
import { SignUpForm } from "../components/signup/SignUpForm";


const Signup : NextPage = () => {
  const { t } = useTranslation("signup");

  return (
      <Layout title={t("title")} heading={t("heading")}>
        <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
          <Grid container spacing={CARD_SPACING}>
            <Grid xs={6}>
              <SignUpForm />
            </Grid>
            <Grid xs={6}>
              <AuthPageSideBlock />
            </Grid>
          </Grid>
        </Box>
      </Layout>
  )
};

export async function getStaticProps({ locale } : { locale : string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [ "common", "signup" ])),
    },
  };
}

export default Signup;