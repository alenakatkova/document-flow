import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import useFetch from "../../api/useFetch";
import RequireAuth from "../../components/RequireAuth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { CARD_SPACING, CARD } from "../../styles/constants";
import { CounterpartyFromDB } from "../../interfaces/counterparty";
import CounterpartyContactsBigBlock from "../../components/counterparty/CounterpartyContactsBigBlock";
import DocumentsFullTable from "../../components/counterparty/DocumentsFullTable";

const Client : NextPage = () => {
  const router = useRouter();

  const { data: client, isLoading } = useFetch<CounterpartyFromDB>(`counterparties/${router.query.id}`,
      {
        id: 0,
        name: ""
      }
  );

  return (
      <RequireAuth>
        <Layout title={client.name + ": страница клиента"} heading={client.name}>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={12}>
                <CounterpartyContactsBigBlock isLoading={isLoading} contacts={client?.Contacts} />
              </Grid>
              <Grid xs={12}>
                <DocumentsFullTable isLoading={isLoading} contracts={client?.Contracts} />
              </Grid>
            </Grid>
          </Box>
        </Layout>
      </RequireAuth>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  }
}

export async function getStaticProps({ locale } : { locale : string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [ "common", "clients" ])),
    },
  };
}

export default Client;

