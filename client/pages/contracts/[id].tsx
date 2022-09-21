import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import useFetch from "../../api/useFetch";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { CARD, CARD_SPACING, PAGE_CONTAINER } from "../../styles/constants";
import { ContractFromDB } from "../../interfaces/contract";
import RequireAuth from "../../components/RequireAuth";
import { Typography } from "@mui/material";
import HtmlLink from '@mui/material/Link';
import Link from "next/link";
import { AddStatusForm } from "../../components/common/AddStatusForm";
import { CurrentStatus } from "../../components/contract/CurrentStatus";
import { ContractInfo } from "../../components/contract/ContractInfoProps";
import { StatusChangeHistory } from "../../components/contract/StatusChangeHistory";
import { AgreementFromDB } from "../../interfaces/agreement";

interface AgreementsProps {
  agreements? : AgreementFromDB[];
}

const Agreements = ({ agreements } : AgreementsProps) => {
  return (
      <Box>
        <Typography variant="h6" sx={{ marginBottom: "0.5rem" }}>
          Дополнительные соглашения
        </Typography>
        {
          agreements && agreements.length > 0
              ? <Box>
                {agreements?.map(agreement => (
                    <Box key={agreement.id + agreement.number} sx={{ marginBottom: "0.2rem" }}>
                      <Link href={`/agreements/${agreement.id}`}>
                        <HtmlLink sx={{ cursor: "pointer" }}>ДС №{agreement.number}</HtmlLink>
                      </Link>
                    </Box>
                ))}
              </Box>
              : "Дополнительных соглашений нет"
        }
      </Box>
  )
}

const Contract : NextPage = () => {
  const router = useRouter();


  const { data: contract, isLoading, fetchData } = useFetch<ContractFromDB>(`contracts/${router.query.id}`,
      {
        id: 0,
        number: ""
      }
  );

  return (
      <RequireAuth>
        <Layout title={"Договор №" + contract?.number + " с " + contract?.Counterparty?.name}
                heading={"Договор №" + contract?.number + " с " + contract?.Counterparty?.name}>
          <Box sx={PAGE_CONTAINER}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={9}>
                <Box sx={CARD}>
                  <ContractInfo contract={contract} />
                </Box>
              </Grid>
              <Grid xs={3}>
                <Box sx={CARD}>
                  <CurrentStatus contractTransactions={contract?.ContractTransactions || []} />
                </Box>
              </Grid>

              <Grid xs={9}>
                <Box sx={CARD}>
                  <StatusChangeHistory transactions={contract.ContractTransactions} />
                </Box>
              </Grid>

              <Grid xs={3}>
                <Box sx={CARD}>
                  <Agreements agreements={contract.Agreements} />
                </Box>
              </Grid>

              <Grid xs={9}>
                <Box sx={CARD}>
                  <Typography variant="h6" sx={{ marginBottom: "0.5rem" }} id="change-status">
                    Форма для изменения статуса договора
                  </Typography>
                  <AddStatusForm documentId={contract.id} documentType="contract" />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Layout>
      </RequireAuth>
  )
};

export default Contract;