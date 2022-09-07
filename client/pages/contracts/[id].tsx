import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import useFetch from "../../api/useFetch";
import { CounterpartyFromDB } from "../../interfaces/counterparty";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { CARD_SPACING, CARD } from "../../styles/constants";

const Contract : NextPage = () => {
  const router = useRouter();

  const { data: contract, isLoading } = useFetch<CounterpartyFromDB>(`contracts/${router.query.id}`,
      {
        id: 0,
        name: ""
      }
  );
  
  return (<Layout title={""} heading={""}>
    <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
      <Grid container spacing={CARD_SPACING}>
        <Grid xs={9}>
          <Box sx={CARD}>
            {JSON.stringify(contract)}
          </Box>
        </Grid>
        <Grid xs={3}>
          <Box sx={CARD}>fff</Box>
        </Grid>
      </Grid>
    </Box>
  </Layout>)
}

export default Contract;