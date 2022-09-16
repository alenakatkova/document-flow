import React from "react";
import TeamItem from "./TeamItem";
import List from "@mui/material/List";
import { TeamFromDB } from "../../interfaces/team";

interface TeamListProps {
  teams : TeamFromDB[];
}

const TeamList = ({ teams } : TeamListProps) => {
  return (
      <List sx={{ padding: 0 }}>
        {teams.map(team => (
            <TeamItem
                key={team?.username}
                managerName={team?.managerName}
                assistantName={team?.assistantName}
                assistantEmail={team?.assistantEmail}
            />
        ))}
      </List>
  )
};

export default TeamList;