import React from "react";
import type { NextPage } from "next";
import Layout from "../components/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { CARD, CARD_SPACING } from "../styles/constants";
import InstructionBlock from "../components/common/InstructionBlock";

const INSTRUCTIONS = [
  "В данной системе ведется учет договоров и дополнительных соглашений, над которыми работают проектные команды.",
  "Вся информация вносится в систему ассистенами проектных команд либо системным администратором.",
  "По всеми вопросам, связанным с работой системы, обращайтесь к системному администратору."
];

const Home : NextPage = () => {
  return (
      <Layout title={"Главная"} heading={"Система для учета докумендов проектных команд"}>
        <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
          <Grid container spacing={CARD_SPACING}>
            <Grid xs={12}>
              <Box sx={CARD}>
                <InstructionBlock paragraphs={INSTRUCTIONS} />
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
      ...(await serverSideTranslations(locale, [ "common", "signup", "login", "dashboard", "teams", "internal-departments" ])),
    },
  };
}

export default Home;