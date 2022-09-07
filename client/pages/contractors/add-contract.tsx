import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import useFetch from "../../api/useFetch";
import { CounterpartyFromDB } from "../../interfaces/counterparty";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { CARD_SPACING, CARD } from "../../styles/constants";
import { useAuth } from "../../contexts/authProvider";

const AddContractorContract : NextPage = () => {
  const router = useRouter();
  let { team } = useAuth();

  const {
    data: clients,
    isLoading: isClientsLoading
  } = useFetch<CounterpartyFromDB[]>("/counterparties/names", [], { teamId: team, type: "contractor" });

  return (<Layout title="Форма добавления договора с подрядчиком"
                  heading={"Форма добавления договора с подрядчиком"}>
    <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
      <Grid container spacing={CARD_SPACING}>
        <Grid xs={12}>
          <Box sx={CARD}>
            {JSON.stringify(clients)}
          </Box>
        </Grid>
      </Grid>
    </Box>
  </Layout>)
}

export default AddContractorContract;