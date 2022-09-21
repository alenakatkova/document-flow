import Grid from "@mui/material/Unstable_Grid2";
import { CARD, CARD_SPACING } from "../../styles/constants";
import Box from "@mui/material/Box";
import InstructionBlock from "./InstructionBlock";
import SignedUpTeams from "../SignedUpTeams";
import React from "react";

const INSTRUCTIONS = [ `Обратитесь к администратору, если аккаунт вашей команды уже создан, 
но вы не знаете или забыли пароль или у вас не получается создать аккаунт команды` ];
const AuthPageSideBlock = () => {
  return (
      <Grid container spacing={CARD_SPACING}>
        <Grid xs={12}>
          <Box sx={CARD}>
            <InstructionBlock paragraphs={INSTRUCTIONS} />
          </Box>
        </Grid>
        <Grid xs={12}>
          <Box sx={CARD}>
            <SignedUpTeams />
          </Box>
        </Grid>
      </Grid>
  )
};

export default AuthPageSideBlock;