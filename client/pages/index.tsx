import React, { useState, useEffect, useCallback } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Grid from "@mui/material/Unstable_Grid2";
import { CARD, CARD_SPACING } from "../styles/constants";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const Home : NextPage = () => {
  const { t } = useTranslation("dashboard");
  return (
      <Layout title={"Главная"} heading={"Система для учета докумендов проектных команд"}>

        <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
          <Grid container spacing={CARD_SPACING}>
            <Grid xs={12}>
              <Box sx={CARD}>
                <Typography sx={{ marginBottom: "1rem" }}>В данной системе ведется учет договоров и дополнительных
                  соглашений, над которыми работают проектные команды.</Typography>
                <Typography sx={{ marginBottom: "1rem" }}>Вся информация вносится в систему ассистенами
                  проектных команд либо системным администратором.</Typography>
                <Typography>По всеми вопросам, связанным с работой системы, обращайтесь к системному
                  администратору.</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

      </Layout>
  )
}

export async function getStaticProps({ locale } : { locale : string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "signup", "login", "dashboard", "teams", "internal-departments"])),
    },
  };
}

export default Home;