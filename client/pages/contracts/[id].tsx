import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import useFetch from "../../api/useFetch";
import { CounterpartyFromDB } from "../../interfaces/counterparty";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { CARD_SPACING, CARD } from "../../styles/constants";
import { ContractFromDB } from "../../interfaces/contract";

const Contract : NextPage = () => {
  const router = useRouter();

  const { data: contract, isLoading } = useFetch<ContractFromDB>(`contracts/${router.query.id}`,
      {
        id: 0,
        number: ""
      }
  );

  return (<Layout title={"Договор №" + contract?.number + " с " + contract?.Counterparty?.name}
                  heading={"Договор №" + contract?.number + " с " + contract?.Counterparty?.name}>
    <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
      <Grid container spacing={CARD_SPACING}>
        <Grid xs={9}>
          <Box sx={CARD}>
            <pre>{JSON.stringify(contract, null, 2)}</pre>

            <Box></Box>

          </Box>
        </Grid>
        <Grid xs={3}>
          <Box sx={CARD}>
            {
              contract?.ContractTransactions?.length === 0
                  ? "Текущий статус не указан"
                  : <>ТЕКУЩИЙ СТАТУС</>
            }
          </Box>
        </Grid>
      </Grid>
    </Box>
  </Layout>)
}

export default Contract;