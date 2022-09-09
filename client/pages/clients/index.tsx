import React from "react";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Layout from "../../components/layout";
import { CARD_SPACING, CARD } from "../../styles/constants";
import useFetch from "../../api/useFetch";
import { useAuth } from "../../contexts/authProvider";
import { useRouter } from "next/router";
import RequireAuth from "../../components/RequireAuth";
import { CounterpartyFromDB } from "../../interfaces/counterparty";
import Link from "next/link";
import HtmlLink from "@mui/material/Link";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const Clients : NextPage = () => {
  const { t } = useTranslation("clients");
  let { team } = useAuth();
  const router = useRouter();

  const {
    data: clients,
    isLoading
  } = useFetch<CounterpartyFromDB[]>("/counterparties", [], { teamId: team, type: "client" });

  return (
      <RequireAuth>
        <Layout title={t("title")} heading={t("heading")}>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            {clients.map(client => (
                <Grid key={client.name} container spacing={CARD_SPACING}>
                  <Grid xs={8}>
                    <Box sx={CARD}>
                      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <Typography variant="h5">{client.name}</Typography>
                        <Box>
                          <Link href={`/clients/${client.id}`}>
                            <HtmlLink>Открыть в отдельном окне</HtmlLink>
                          </Link>
                        </Box>
                      </Box>
                      <Box sx={{ marginTop: "1rem" }}>Телефон: {client.phone}</Box>
                      <Box sx={{ marginTop: "1rem" }}>
                        <Typography variant="h6" sx={{ marginBottom: "0.5rem" }}>
                          Документы
                        </Typography>
                        <Box>
                          {client?.Contracts && client?.Contracts.length > 0
                              ? <List>
                                {client?.Contracts?.map(contract => (
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
                                              <Box>Счет № {agreement.Invoice && agreement.Invoice.number}</Box>
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
                      <Typography variant="h6">
                        Контакты
                      </Typography>
                      {client?.Contacts && client?.Contacts.length > 0
                          ? <List>
                            {client?.Contacts.map(contact => (
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
                  </Grid>
                </Grid>
            ))}
          </Box>
        </Layout>
      </RequireAuth>
  )
};

export async function getStaticProps({ locale } : { locale : string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "clients"])),
    },
  };
}

export default Clients;