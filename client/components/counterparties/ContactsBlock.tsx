import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import React from "react";
import { ContactFromDB } from "../../interfaces/contact";

interface ContactsBlock {
  contacts : ContactFromDB[];
}

export const ContactsBlock = ({ contacts } : ContactsBlock) => {
  return (
      <Box>
        <Typography variant="h6">
          Контакты
        </Typography>
        {contacts && contacts.length > 0
            ? <List>
              {contacts.map(contact => (
                  <ListItem key={"contact" + contact.id}>
                    <Box>
                      <Box>{contact?.name}</Box>
                      <Box>{contact?.job}</Box>
                      <Box>{contact?.phone}</Box>
                      <Box>{contact?.email}</Box>
                    </Box>
                  </ListItem>))}
            </List>
            : "Контакты не добавлены"
        }
      </Box>
  )
}