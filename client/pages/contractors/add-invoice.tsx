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
import { Typography } from "@mui/material";
import { RadioButtonChoice } from "../../components/RadioButtonChoice";

const AddContractorInvoice : NextPage = () => {
  const router = useRouter();
  let { team } = useAuth();
  const [chosenContractor, setChosenContractor] = useState<number|undefined>(undefined);

  const {
    data: contractors,
    isLoading: isContractorsLoading
  } = useFetch<CounterpartyFromDB[]>("/counterparties/names", [], { teamId: team, type: "contractor" });

  const contractorsDataForRadioBtns = contractors.map(contractor => {
    return {
      value: contractor.name,
      label: contractor.name,
      id: contractor.id
    }
  });

  return (
      <RequireAuth>
        <Layout title="Форма добавления счета с подрядчиком"
                heading={"Форма добавления счета с подрядчиком"}>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={12}>
                <Box sx={CARD}>
                  {isContractorsLoading && contractors.length !== 0
                      ?
                      <Typography>Ни одного клиента не найдено. Чтобы добавить договор, добавьте сначала
                        клиента</Typography>
                      : <pre>{JSON.stringify(contractors, null, 2)}</pre>}

                  <RadioButtonChoice
                      options={contractorsDataForRadioBtns}
                      heading="Выберите клиента"
                      setChosenOption={setChosenContractor}
                  />
                  {chosenContractor}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Layout>
      </RequireAuth>
  )
}

export default AddContractorInvoice;