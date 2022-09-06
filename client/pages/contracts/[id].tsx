import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout";

const Contract : NextPage = () => {

  const router = useRouter();
  console.log(router.query)
  return (<Layout title={""} heading={""}>ff</Layout>)
}

export default Contract;