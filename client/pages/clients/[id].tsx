import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import useFetch from "../../api/useFetch";
import RequireAuth from "../../components/RequireAuth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Client : NextPage = () => {
  const router = useRouter();

  const { data: client, isLoading } = useFetch(`counterparties/${router.query.id}`, {})

  return (
      <RequireAuth>
        <Layout title={""} heading={""}>{!isLoading && JSON.stringify(client)}</Layout>
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
      ...(await serverSideTranslations(locale, ["common", "clients"])),
    },
  };
}

export default Client;

