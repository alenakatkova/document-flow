import React from "react";
import { useTranslation } from "next-i18next";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

interface TeamItemProps {
  managerName : string;
  assistantName : string | undefined;
  assistantEmail : string | undefined;
}

const LINE_MARGIN = { margin: "0.5rem 1rem" };

const TeamItem = ({
                    managerName,
                    assistantName,
                    assistantEmail
                  } : TeamItemProps) => {
  const { t } = useTranslation("teams");
  return (
      <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            ":not(:last-child)": {
              borderBottom: "1px solid lightgray",
              paddingBottom: "1rem"
            },
            ":not(:first-child)": {
              paddingTop: "1rem",
            }
          }}>
        <Typography variant="h6">{t("manager")}: {managerName}</Typography>
        {assistantName &&
            <Box sx={LINE_MARGIN}>
              {t("assistant.name")}: {assistantName}
            </Box>}
        {assistantEmail &&
            <Box sx={LINE_MARGIN}>
              {t("assistant.email")}: {assistantEmail}
            </Box>}
      </Box>
  )
};

export default TeamItem;