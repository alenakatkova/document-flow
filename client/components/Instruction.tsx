import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { CARD } from "../styles/constants";
import { Typography } from "@mui/material";
import React from "react";

interface InstructionProps {
  gridSpacing : number;
  paragraphs : string[];
}

const Instruction = ({ gridSpacing, paragraphs } : InstructionProps) => {
  return (<Grid xs={gridSpacing}>
    <Box sx={CARD}>
      {JSON.stringify(paragraphs)}
      {/*{paragraphs.map(paragraph => <Typography key={paragraph}>ggg</Typography>}*/}

    </Box>
  </Grid>)
}

export default Instruction