import React from "react";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Box from "@mui/material/Box";
import Layout from "../../components/layout";
import useFetch from "../../api/useFetch";
import { useAuth } from "../../contexts/authProvider";
import RequireAuth from "../../components/RequireAuth";
import { CounterpartyFromDB } from "../../interfaces/counterparty";
import { CounterpartyInfo } from "../../components/counterparties/CounterpartyInfo";

const Contractors : NextPage = () => {
  let { team } = useAuth();

  const {
    data: contractors,
    isLoading
  } = useFetch<CounterpartyFromDB[]>("/counterparties", [], { teamId: team, type: "contractor" });

  return (
      <RequireAuth>
        <Layout title={"Подрядчики"} heading={"Подрядчики"}>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            {contractors.map(contractor => (
                <CounterpartyInfo counterparty={contractor} key={contractor.name} />
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

export default Contractors;