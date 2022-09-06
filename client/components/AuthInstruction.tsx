import React from "react";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { TeamFromDB } from "../interfaces/team";
import { CARD_SPACING, CARD } from "../styles/constants";
import useFetch from "../api/useFetch";

const AuthInstruction : NextPage = () => {
  const { data: teams, fetchData: refetchTeams, isLoading, error } = useFetch<TeamFromDB[]>("/teams", []);
  const { t } = useTranslation("common");
  return (
      <Grid container spacing={CARD_SPACING}>
        <Grid xs={12}>
          <Box sx={CARD}>
            <Typography>{t("auth.instruction")}</Typography>
          </Box>
        </Grid>
        <Grid xs={12}>
          <Box sx={CARD}>
            <Typography variant="h6">{t("auth.teamsHeading")}</Typography>
            {isLoading
                ? <div>Loading...</div>
                : <List>
                  {teams.map(team => {
                    return (
                        <ListItem key={team.id + team.managerName}>
                          <ListItemText primary={team.managerName}/>
                        </ListItem>
                    )
                  })}
                </List>
            }
          </Box>
        </Grid>
      </Grid>

  )
};

export default AuthInstruction;