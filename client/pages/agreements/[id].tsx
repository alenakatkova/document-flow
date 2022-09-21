import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import useFetch from "../../api/useFetch";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { CARD, CARD_SPACING } from "../../styles/constants";
import RequireAuth from "../../components/RequireAuth";
import { Typography } from "@mui/material";
import { AddStatusForm } from "../../components/common/AddStatusForm";
import { AgreementFromDB } from "../../interfaces/agreement";
import { AgreementInfo } from "../../components/agreement/AgreementInfo";
import { CurrentStatus } from "../../components/agreement/CurrentStatus";
import { StatusChangeHistory } from "../../components/agreement/StatusChangeHistory";
import { Invoice } from "../../components/agreement/Invoice";

const Agreement : NextPage = () => {
  const router = useRouter();

  const { data: agreement, isLoading } = useFetch<AgreementFromDB>(`agreements/${router.query.id}`,
      {
        id: 0,
        number: ""
      }
  );

  return (
      <RequireAuth>
        <Layout
            title={"Дополнительное соглашение №" + agreement?.number + " к договору №" + agreement?.Contract?.number}
            heading={"Дополнительное соглашение №" + agreement?.number + " к договору №" + agreement?.Contract?.number}>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={9}>
                <Box sx={CARD}>
                  <AgreementInfo agreement={agreement} />
                </Box>
              </Grid>
              <Grid xs={3}>
                <Box sx={CARD}>
                  <CurrentStatus transactions={agreement.AgreementTransactions} />
                </Box>
              </Grid>

              <Grid xs={9}>
                <Box sx={CARD}>
                  <StatusChangeHistory transactions={agreement.AgreementTransactions} />
                </Box>
              </Grid>
              <Grid xs={3}>
                <Box sx={CARD}>
                  <Invoice invoice={agreement.Invoice} />
                </Box>
              </Grid>

              <Grid xs={9}>
                <Box sx={CARD}>
                  <Typography variant="h6" sx={{ marginBottom: "0.5rem" }} id="change-status">
                    Форма для изменения статуса дополнительного соглашения
                  </Typography>
                  <AddStatusForm documentId={agreement.id} documentType="agreement" />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Layout>
      </RequireAuth>
  )
};

export default Agreement;