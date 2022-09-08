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
import RequireAuth from "../../components/RequireAuth";
import { RadioButtonChoice } from "../../components/RadioButtonChoice";
import { AddContractForm } from "../../components/AddContractForm";

const AddClientContract : NextPage = () => {
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
        <Layout title="Форма добавления договора с клиентом"
                heading={"Форма добавления договора с клиентом"}>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={12}>
                <Box sx={CARD}>
                  {clients && <RadioButtonChoice
                      options={clientsDataForRadioBtns}
                      heading="Выберите клиента"
                      setChosenOption={setChosenClient}
                      whatToAdd="клиента"
                      radioGroupName="client"
                  />}
                  {chosenClient !== undefined && <AddContractForm counterpartyId={chosenClient}/>}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Layout>
      </RequireAuth>
  )
}

export default AddClientContract;