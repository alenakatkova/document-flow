import React, { useState, useEffect, useCallback } from "react";
import type { NextPage } from "next";
import Layout from "../components/layout";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Signup : NextPage = () => {
  const { t } = useTranslation("signup");

  return (<Layout title="Регистрация проектной команды">{t("signup")}</Layout>)
};

export async function getStaticProps({ locale } : { locale : string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['signup'])),
      // Will be passed to the page component as props
    },
  };
}

export default Signup;

