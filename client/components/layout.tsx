import {ReactNode} from "react";
import Head from "next/head";
import Link from "next/link";
import SideMenu from "./SideMenu";

import * as React from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

// example from Next.js https://github.com/vercel/next-learn/blob/master/basics/typescript-final/components/layout.tsx

interface LayoutProps {
  children : ReactNode;
  title : string;
}

const Layout = ({children, title} : LayoutProps) => {
  return (
      <div>
        <Head>
          <title>{title}</title>
        </Head>
        <Grid container spacing={0} wrap="nowrap" minHeight="100vh">
          <Grid xs={3} lg={2} minWidth={230}>
            <SideMenu/>
          </Grid>
          <Grid xs={9} lg={10}>
            {children}
          </Grid>
        </Grid>
      </div>
  )
}

export default Layout;