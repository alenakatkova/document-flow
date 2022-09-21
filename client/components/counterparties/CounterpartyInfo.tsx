import { CounterpartyFromDB } from "../../interfaces/counterparty";
import Grid from "@mui/material/Unstable_Grid2";
import { CARD, CARD_SPACING } from "../../styles/constants";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Link from "next/link";
import HtmlLink from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ContactsBlock } from "./ContactsBlock";
import React from "react";

interface CounterpartyInfoProps {
  counterparty : CounterpartyFromDB;
}

export const CounterpartyInfo = ({ counterparty } : CounterpartyInfoProps) => {
  return (
      <Grid container spacing={CARD_SPACING}>
        <Grid xs={8}>
          <Box sx={CARD}>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <Typography variant="h5">{counterparty.name}</Typography>
              <Box>
                <Link href={`/clients/${counterparty.id}`}>
                  <HtmlLink sx={{ cursor: "pointer" }}>Открыть в отдельном окне</HtmlLink>
                </Link>
              </Box>
            </Box>
            <Box sx={{ marginTop: "1rem" }}>Телефон: {counterparty.phone}</Box>
            <Box sx={{ marginTop: "1rem" }}>Реквизиты: </Box>
            <Box sx={{ marginTop: "1rem", whiteSpace: "pre-wrap", }}>{counterparty.bankDetails}</Box>
            <Box sx={{ marginTop: "1rem" }}>
              <Typography variant="h6" sx={{ marginBottom: "0.5rem" }}>
                Документы
              </Typography>
              <Box>
                {counterparty?.Contracts && counterparty?.Contracts.length > 0
                    ? <List>
                      {counterparty?.Contracts?.map(contract => (
                          <ListItem key={"contract" + contract.number}
                                    sx={{ border: "1px solid lightgray", marginTop: "-1px" }}>
                            <ListItemText sx={{ whiteSpace: "nowrap" }}>
                              <Link href={`/contracts/${contract.id}`}>
                                <HtmlLink sx={{ cursor: "pointer" }}>Договор № {contract.number}</HtmlLink>
                              </Link>
                            </ListItemText>
                            <List>
                              {contract?.Agreements?.map(agreement => (
                                  <ListItem key={agreement.number}>
                                    <Link href={`/agreements/${agreement.id}`}>
                                      <HtmlLink sx={{ cursor: "pointer", marginRight: "1rem" }}>
                                        Дополнительное соглашение № {agreement.number}
                                      </HtmlLink>
                                    </Link>
                                    <Box>{agreement.Invoice && "Счет № " + agreement.Invoice.number}</Box>
                                  </ListItem>
                              ))}
                            </List>
                          </ListItem>
                      ))}
                    </List>
                    : "Не добавлено ни одного документа"
                }
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid xs={4}>
          <Box sx={CARD}>
            <ContactsBlock contacts={counterparty?.Contacts || []} />
          </Box>
        </Grid>
      </Grid>
  )
};