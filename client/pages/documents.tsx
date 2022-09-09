import React from "react";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Layout from "../components/layout";
import { CARD, CARD_SPACING } from "../styles/constants";
import useFetch from "../api/useFetch";
import { useAuth } from "../contexts/authProvider";
import RequireAuth from "../components/RequireAuth";
import { CounterpartyFromDB } from "../interfaces/counterparty";
import { DocumentStatusFromDB } from "../interfaces/documentStatus";
import { formDocumentsList } from "../utils/formDocumentsList";

const Documents : NextPage = () => {
  let { team } = useAuth();

  const {
    data: counterparties
  } = useFetch<CounterpartyFromDB[]>("/counterparties/get-statuses", [], { teamId: team });

  const { data: documentStatuses } = useFetch<DocumentStatusFromDB[]>("/document-statuses", []);

  const docs = formDocumentsList(counterparties, documentStatuses);

  return (
      <RequireAuth>
        <Layout title={"fff"} heading={"fff"}>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={6}>
                <Box sx={CARD}>
                  <pre>
                  {JSON.stringify(docs.filter(doc => doc.isPriority && doc.isAssistantsResponsibility), null, 2)}
                </pre>
                </Box>
              </Grid>
              <Grid xs={6}>
                <Box sx={CARD}>
                  <pre>
                  {JSON.stringify(docs.filter(doc => doc.isPriority && !doc.isAssistantsResponsibility), null, 2)}
                </pre>
                </Box>
              </Grid>
              <Grid xs={6}>
                <Box sx={CARD}>
                  <pre>
                  {JSON.stringify(docs.filter(doc => !doc.isPriority && doc.isAssistantsResponsibility), null, 2)}
                </pre>
                </Box>
              </Grid>
              <Grid xs={6}>
                <Box sx={CARD}>
                  <pre>
                  {JSON.stringify(docs.filter(doc => !doc.isPriority && !doc.isAssistantsResponsibility), null, 2)}
                </pre>
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

export default Documents;