import { ReactNode } from "react";
import Head from "next/head";
import SideMenu from "./SideMenu";

import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../styles/theme";


interface LayoutProps {
  children : ReactNode;
  title : string;
}

const Layout = ({ children, title } : LayoutProps) => {
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
              {children}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
  )
}

export default Layout;

