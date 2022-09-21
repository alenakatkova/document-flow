import React from "react";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Box from "@mui/material/Box";
import Layout from "../../components/layout";
import { PAGE_CONTAINER } from "../../styles/constants";
import useFetch from "../../api/useFetch";
import { useAuth } from "../../contexts/authProvider";
import RequireAuth from "../../components/RequireAuth";
import { CounterpartyFromDB } from "../../interfaces/counterparty";
import { CounterpartyInfo } from "../../components/counterparties/CounterpartyInfo";

const Clients : NextPage = () => {
  let { team } = useAuth();

  const {
    data: clients,
    isLoading
  } = useFetch<CounterpartyFromDB[]>("/counterparties", [], { teamId: team, type: "client" });

  return (
      <RequireAuth>
        <Layout title={"Клиенты"} heading={"Клиенты"}>
          <Box sx={PAGE_CONTAINER}>
            {clients.map(client => (
                <CounterpartyInfo key={client.name} counterparty={client} />
            ))}
          </Box>
        </Layout>
      </RequireAuth>
  )
};

export async function getStaticProps({ locale } : { locale : string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [ "common", "clients" ])),
    },
  };
}

export default Clients;