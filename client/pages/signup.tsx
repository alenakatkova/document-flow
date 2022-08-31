import React, { useState, useEffect, useCallback } from "react";
import type { NextPage } from "next";
import Layout from "../components/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTranslation } from "next-i18next";

const Signup : NextPage = () => {
  const { t } = useTranslation("signup");

  return (
      <Layout title={t("title")}>
        <Typography variant="body1" sx={{
          fontWeight: 300,
          textTransform: "uppercase",
          letterSpacing: "0.1rem"
        }}>{t("heading")}</Typography>
        <Box sx={{ marginTop: "1rem", width: "100%", backgroundColor: "neutral.light", padding: "1rem" }}>Content</Box>
      </Layout>
  )
};

export async function getStaticProps({ locale } : { locale : string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "signup"])),
    },
  };
}

export default Signup;