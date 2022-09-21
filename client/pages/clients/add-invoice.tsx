import React from "react";
import { NextPage } from "next";
import Layout from "../../components/layout";
import useFetch from "../../api/useFetch";
import { CounterpartyFromDB } from "../../interfaces/counterparty";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { CARD, CARD_SPACING } from "../../styles/constants";
import { useAuth } from "../../contexts/authProvider";
import RequireAuth from "../../components/RequireAuth";
import { AddInvoiceFullForm } from "../../components/addInvoice/AddInvoiceFullForm";


const AddClientInvoice : NextPage = () => {
  let { team } = useAuth();

  const {
    data: clients,
    isLoading: isClientsLoading
  } = useFetch<CounterpartyFromDB[]>("/counterparties/names", [], { teamId: team, type: "client" });

  return (
      <RequireAuth>
        <Layout title="Форма добавления дополнительного соглашения с клиентом"
                heading={"Форма добавления дополнительного соглашения с клиентом"}>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={12}>
                <Box sx={CARD}>
                  <AddInvoiceFullForm counterparties={clients} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Layout>
      </RequireAuth>
  )
}

export default AddClientInvoice;