import React from "react";
import type { NextPage } from "next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Layout from "../components/layout";
import { CARD_SPACING, PAGE_CONTAINER } from "../styles/constants";
import AuthPageSideBlock from "../components/common/AuthPageSideBlock";
import { SignUpForm } from "../components/signup/SignUpForm";


const Signup : NextPage = () => {
  return (
      <Layout title="Регистрация проектных команд" heading="Регистрация проектных команд">
        <Box sx={PAGE_CONTAINER}>
          <Grid container spacing={CARD_SPACING}>
            <Grid xs={6}>
              <SignUpForm />
            </Grid>
            <Grid xs={6}>
              <AuthPageSideBlock />
            </Grid>
          </Grid>
        </Box>
      </Layout>
  )
};

export default Signup;


