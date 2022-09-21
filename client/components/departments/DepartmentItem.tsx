import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import List from "@mui/material/List";
import React from "react";
import { InternalDepartmentFromDB } from "../../interfaces/internalDepartment";

interface DepartmentItemProps {
  department : InternalDepartmentFromDB;
}

export const DepartmentItem = ({ department } : DepartmentItemProps) => {
  return (
      <ListItem key={department.name}
                sx={{
                  display: "flex", flexDirection: "row",
                  ":not(:last-child)": {
                    borderBottom: "1px solid lightgray"
                  }
                }}>
        <Box sx={{ width: "35%" }}>
          <Typography variant="h6">{department.name}</Typography>
        </Box>
        <Box sx={{ width: "65%" }}>
          {department?.InternalContacts &&
              <List>
                {department.InternalContacts.map(contact => (
                    <ListItem
                        key={contact.name}
                        sx={{
                          display: "flex",
                          flexDirection: "column"
                        }}>
                      <Typography>{contact.name}</Typography>
                      <Typography>Внутренний номер: {contact.internalPhoneCode}</Typography>
                      <Typography>{contact.email}</Typography>
                      {/*<Typography>{contact.birthday && format(new Date(contact.birthday), 'dd/MM/yyyy')}</Typography>*/}
                    </ListItem>
                ))}
              </List>
          }
        </Box>
      </ListItem>
  )
};