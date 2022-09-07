import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import useFetch from "../../api/useFetch";
import { CounterpartyFromDB } from "../../interfaces/counterparty";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { CARD_SPACING, CARD } from "../../styles/constants";

const AddInvoice : NextPage = () => {
  const router = useRouter();

  // const { data: agreement, isLoading } = useFetch<CounterpartyFromDB>(`agreements/${router.query.id}`,
  //     {
  //       id: 0,
  //       name: ""
  //     }
  // );

  return (<Layout title="Форма добавления счета" heading={"Форма добавления счета"}>
    <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
      <Grid container spacing={CARD_SPACING}>
        <Grid xs={12}>
          <Box sx={CARD}>
            boo
          </Box>
        </Grid>
      </Grid>
    </Box>
  </Layout>)
}

export default AddInvoice;