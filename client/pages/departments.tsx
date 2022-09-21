import React from "react";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Layout from "../components/layout";
import { CARD, CARD_SPACING, PAGE_CONTAINER } from "../styles/constants";
import useFetch from "../api/useFetch";
import RequireAuth from "../components/RequireAuth";
import { InternalDepartmentFromDB } from "../interfaces/internalDepartment";
import InstructionBlock from "../components/common/InstructionBlock";
import DepartmentList from "../components/departments/DepartmentList";

const INSTRUCTIONS = [ "Обращаться по вопросам согласования документов" ];

const Departments : NextPage = () => {
  const { t } = useTranslation("internal-departments");
  const { data: departments, isLoading } = useFetch<InternalDepartmentFromDB[]>("/departments", []);

  return (
      <RequireAuth>
        <Layout title={t("title")} heading={t("heading")}>
          <Box sx={PAGE_CONTAINER}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={7}>
                <Box sx={CARD}>
                  {isLoading
                      ? "Loading..."
                      : <DepartmentList departments={departments} />
                  }
                </Box>
              </Grid>
              <Grid xs={5}>
                <Box sx={CARD}>
                  <InstructionBlock paragraphs={INSTRUCTIONS} />
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
      ...(await serverSideTranslations(locale, [ "common", "internal-departments" ])),
    },
  };
}

export default Departments;