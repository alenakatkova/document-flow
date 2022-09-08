import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import useFetch from "../../api/useFetch";
import { CounterpartyFromDB } from "../../interfaces/counterparty";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { CARD_SPACING, CARD } from "../../styles/constants";
import RequireAuth from "../../components/RequireAuth";

const AddClient : NextPage = () => {
  const router = useRouter();

  // const { data: agreement, isLoading } = useFetch<CounterpartyFromDB>(`agreements/${router.query.id}`,
  //     {
  //       id: 0,
  //       name: ""
  //     }
  // );

  return (
      <RequireAuth>
        <Layout title="Форма добавления клиента" heading={"Форма добавления клиента"}>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={12}>
                <Box sx={CARD}>
                  boo
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Layout>
      </RequireAuth>
  )
}

export default AddClient;