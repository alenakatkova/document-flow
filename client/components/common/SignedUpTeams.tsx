import React from "react";
import { useTranslation } from "next-i18next";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { TeamFromDB } from "../../interfaces/team";
import useFetch from "../../api/useFetch";

const SignedUpTeams = () => {
  const { data: teams, isLoading } = useFetch<TeamFromDB[]>("/teams", []);
  const { t } = useTranslation("common");
  return (
      <Box>
        <Typography variant="h6">{t("auth.teamsHeading")}</Typography>
        {isLoading
            ? <div>Loading...</div>
            : <List>
              {teams.map(team => {
                return (
                    <ListItem key={team.id + team.managerName}>
                      <ListItemText primary={team.managerName} />
                    </ListItem>
                )
              })}
            </List>
        }
      </Box>
  )
};

export default SignedUpTeams;