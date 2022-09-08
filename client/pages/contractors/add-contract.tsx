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
        <Layout title="Форма добавления договора с клиентом"
                heading={"Форма добавления договора с клиентом"}>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={12}>
                <Box sx={CARD}>
                  {contractors && <RadioButtonChoice
                      options={contractorsDataForRadioBtns}
                      heading="Выберите подрядчика"
                      setChosenOption={setChosenContractor}
                      whatToAdd="подрядчика"
                      radioGroupName="contractor"
                  />}
                  {chosenContractor !== undefined && <AddContractForm counterpartyId={chosenContractor}/>}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Layout>
      </RequireAuth>
  )
}

export default AddClientContract;