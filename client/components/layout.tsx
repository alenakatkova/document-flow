import { ReactNode } from "react";
import Head from "next/head";
import SideMenu from "./SideMenu";

import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../styles/theme";
import { Typography } from "@mui/material";


interface LayoutProps {
  children : ReactNode;
  title : string;
  heading : string;
}

const Layout = ({ children, title, heading } : LayoutProps) => {
  return (
      <ThemeProvider theme={theme}>
        <Head>
          <title>{title}</title>
        </Head>
        <Grid container spacing={0} wrap="nowrap" minHeight="100vh">
          <Grid xs={3} lg={2} minWidth={230}>
            <Box
                sx={{
                  bgcolor: "accent.main",
                  height: "100%",
                  color: "accent.contrastText"
                }}
            >
              <SideMenu/>
            </Box>
          </Grid>
          <Grid xs={9} lg={10}>
            <Box
                sx={{
                  bgcolor: "neutral.main",
                  color: "neutral.contrastText",
                  height: "100%",
                  padding: "1rem"
                }}
            >
              <Typography variant="body1" sx={{
                fontWeight: 300,
                fontSize: "1.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.1rem"
              }}>{heading}</Typography>
              <Box>{children}</Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
  )
}

export default Layout;

