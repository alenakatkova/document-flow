import React from "react";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Layout from "../components/layout";
import { CARD_SPACING, CARD } from "../styles/constants";
import useFetch from "../api/useFetch";
import { useAuth } from "../contexts/authProvider";
import { useRouter } from "next/router";
import RequireAuth from "../components/RequireAuth";
import { CounterpartyFromDB } from "../interfaces/counterparty";
import Link from "next/link";
import HtmlLink from "@mui/material/Link";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ContractFromDB } from "../interfaces/contract";
import { findLastStatusChange } from "../utils/functions";
import { DocumentStatusFromDB } from "../interfaces/documentStatus";
import { AgreementTransactionFromDB, ContractTransactionFromDB } from "../interfaces/documentTransaction";

interface Document {
  isPriority : boolean;
  counterpartyName : string;
  counterpartyId : number;
  type : "invoice"|"contract"|"agreement";
  status : string;
  isAssistantsResponsibility : boolean;
  number : string;
  parentDocumentId : number|null;
  task : string;
}

const getStatusText = (
    transactions : ContractTransactionFromDB[]|AgreementTransactionFromDB[]|undefined,
    possibleStatuses : DocumentStatusFromDB[]
) => {
  if (transactions === undefined) return "Статус не задан";

  const statusId = transactions && transactions.length > 0
      ? findLastStatusChange(transactions).DocumentStatus.id
      : -1;

  let statusText : string;
  if (statusId === -1) {
    statusText = "Статус не задан"
  } else {
    statusText = possibleStatuses.find(item => item.id === statusId)?.stage || "Статус не задан";
  }

  return statusText;
};

const getIsAssistantResponsibility = (
    transactions : ContractTransactionFromDB[]|AgreementTransactionFromDB[]|undefined,
    possibleStatuses : DocumentStatusFromDB[]
) => {
  if (transactions === undefined) return true;

  const lastStatusId = transactions && transactions.length > 0
      ? findLastStatusChange(transactions).DocumentStatus.id
      : -1;

  let isAssistantResponsible : boolean;
  if (lastStatusId === -1) {
    isAssistantResponsible = true;
  } else {
    const boolFromDB = possibleStatuses.find(item => item.id === lastStatusId)?.isAssistantResponsibility
    isAssistantResponsible = boolFromDB === undefined ? true : boolFromDB;
  }

  return isAssistantResponsible;
};


const Tasks : NextPage = () => {
  const { t } = useTranslation("clients");
  let { team } = useAuth();
  const router = useRouter();

  const {
    data: counterparties
  } = useFetch<CounterpartyFromDB[]>("/counterparties/get-statuses", [], { teamId: team });

  const { data: documentStatuses } = useFetch<DocumentStatusFromDB[]>("/document-statuses", []);


  const docs : Document[] = counterparties.reduce((acc : Document[], curr) => {
    curr?.Contracts && curr.Contracts.forEach(contract => {
      const statusText = getStatusText(contract?.ContractTransactions, documentStatuses)
      const isAssistantResponsible = getIsAssistantResponsibility(contract?.ContractTransactions, documentStatuses)
      acc.push({
        isPriority: Boolean(curr.isPriority),
        counterpartyName: curr.name,
        counterpartyId: curr.id,
        type: "contract",
        status: statusText,
        isAssistantsResponsibility: isAssistantResponsible,
        number: contract.number
      });

      contract.Agreements && contract.Agreements.forEach(agreement => {
        const statusText = getStatusText(agreement?.AgreementTransactions, documentStatuses)
        const isAssistantResponsible = getIsAssistantResponsibility(agreement?.AgreementTransactions, documentStatuses)
        acc.push({
          isPriority: Boolean(curr.isPriority),
          counterpartyName: curr.name,
          counterpartyId: curr.id,
          type: "agreement",
          status: statusText,
          isAssistantsResponsibility: isAssistantResponsible,
          number: agreement.number
        });

        if (agreement.Invoice === null) {
          acc.push({
            isPriority: Boolean(curr.isPriority),
            counterpartyName: curr.name,
            counterpartyId: curr.id,
            type: "invoice",
            status: "Счет не занесен в систему",
            isAssistantsResponsibility: true,
            number: "Нет номера"
          });
        } else if (agreement.Invoice && agreement.Invoice?.status === "no invoice") {
          acc.push({
            isPriority: Boolean(curr.isPriority),
            counterpartyName: curr.name,
            counterpartyId: curr.id,
            type: "invoice",
            status: "Счет не выставлен",
            isAssistantsResponsibility: false,
            number: agreement.number
          });
        } else {
          const status = agreement.Invoice?.status;
          console.log(status)
          acc.push({
            isPriority: Boolean(curr.isPriority),
            counterpartyName: curr.name,
            counterpartyId: curr.id,
            type: "invoice",
            status: status || "Счет не выставлен",
            isAssistantsResponsibility: false,
            number: agreement.number
          });
        }

      });
    });
    return acc;
  }, [])

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
              <Grid xs={8}>
                <pre>
                  {JSON.stringify(docs, null, 2)}
                </pre>
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

export default Tasks;