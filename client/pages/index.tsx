import React, { useState, useEffect, useCallback } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Home : NextPage = () => {
  const { t } = useTranslation("dashboard");
  return (
      <Layout title={t("title.nonAuth")} heading={t("heading.nonAuth")}>
        <div className={styles.container}>
          <Head>
            <meta name="description"/>
          </Head>

          <main className={styles.main}>
            <h1 className={styles.title}>
              HOME PAGE
            </h1>
          </main>
        </div>
      </Layout>
  )
}

export async function getStaticProps({ locale } : { locale : string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "signup", "login", "dashboard"])),
    },
  };
}

export default Home;