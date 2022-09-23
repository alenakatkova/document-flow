import React from "react";
import { NextPage } from "next";
import Layout from "../../components/layout";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { CARD_SPACING, CARD } from "../../styles/constants";
import RequireAuth from "../../components/RequireAuth";
import { AddCounterpartyForm } from "../../components/addCounterparty/AddCounterpartyForm";

const AddContractor : NextPage = () => {
  return (
      <RequireAuth>
        <Layout title="Форма добавления подрядчика" heading={"Форма добавления подрядчика"}>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={12}>
                <Box sx={CARD}>
                  <AddCounterpartyForm type="contractor" />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Layout>
      </RequireAuth>
  )
}

export default AddContractor;