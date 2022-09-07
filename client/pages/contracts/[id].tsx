import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import useFetch from "../../api/useFetch";
import { CounterpartyFromDB } from "../../interfaces/counterparty";

const Contract : NextPage = () => {
  const router = useRouter();

  const { data: contract, isLoading } = useFetch<CounterpartyFromDB>(`contracts/${router.query.id}`,
      {
        id: 0,
        name: ""
      }
  );
  console.log(router.query)
  return (<Layout title={""} heading={""}>{JSON.stringify(contract)}</Layout>)
}

export default Contract;