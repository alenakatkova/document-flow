import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import useFetch from "../../api/useFetch";
import { CounterpartyFromDB } from "../../interfaces/counterparty";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { CARD_SPACING, CARD } from "../../styles/constants";

const Agreement : NextPage = () => {
  const router = useRouter();

  const { data: agreement, isLoading } = useFetch<CounterpartyFromDB>(`agreements/${router.query.id}`,
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
            {JSON.stringify(agreement)}
          </Box>
        </Grid>
        <Grid xs={3}>
          <Box sx={CARD}>fff</Box>
        </Grid>
      </Grid>
    </Box>
  </Layout>)
}

export default Agreement;


// import React from "react";
// import type { NextPage } from "next";
// import { useRouter } from "next/router";
// import Layout from "../../components/layout";
//
// const Agreement : NextPage = () => {
//
//   const router = useRouter();
//   console.log(router.query)
//   return (<Layout title={""} heading={""}>ff</Layout>)
// }
//
// export default Agreement;