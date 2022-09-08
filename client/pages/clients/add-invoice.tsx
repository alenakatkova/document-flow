import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import useFetch from "../../api/useFetch";
import { CounterpartyFromDB } from "../../interfaces/counterparty";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { CARD_SPACING, CARD } from "../../styles/constants";
import { useAuth } from "../../contexts/authProvider";
import { Typography } from "@mui/material";
import RequireAuth from "../../components/RequireAuth";
import { RadioButtonChoice } from "../../components/RadioButtonChoice";

const AddClientAgreement : NextPage = () => {
  const router = useRouter();
  let { team } = useAuth();
  const [chosenClient, setChosenClient] = useState<number|undefined>(undefined);

  const {
    data: clients,
    isLoading: isClientsLoading
  } = useFetch<CounterpartyFromDB[]>("/counterparties/names", [], { teamId: team, type: "client" });

  const clientsDataForRadioBtns = clients.map(client => {
    return {
      value: client.name,
      label: client.name,
      id: client.id
    }
  });

  return (
      <RequireAuth>
        <Layout title="Форма добавления счета с клиентом"
                heading={"Форма добавления счета с клиентом"}>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={12}>
                <Box sx={CARD}>
                  {isClientsLoading && clients.length !== 0
                      ?
                      <Typography>Ни одного клиента не найдено. Чтобы добавить договор, добавьте сначала
                        клиента</Typography>
                      : <pre>{JSON.stringify(clients, null, 2)}</pre>}

                  <RadioButtonChoice
                      options={clientsDataForRadioBtns}
                      heading="Выберите клиента"
                      setChosenOption={setChosenClient}
                  />

                  {chosenClient}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Layout>
      </RequireAuth>
  )
}

export default AddClientAgreement;
