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
                  <Grid xs={7}>
                    <Box sx={CARD}>
                      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <Box>{client.name}</Box>
                        <Box>
                          <Link href={`/clients/${client.id}`}>
                            <HtmlLink>Открыть в отдельном окне</HtmlLink>
                          </Link>
                        </Box>
                      </Box>
                      <Box sx={{ marginTop: "1rem" }}>Телефон: {client.phone}</Box>
                      <Box sx={{ marginTop: "1rem" }}>
                        {client?.Contracts && client?.Contracts.le && ngth > 0
                            && <Typography variant="h6" sx={{ marginBottom: "0.5rem" }}>
                              Документы
                            </Typography>
                        }
                        <ul>
                          {client?.Contracts?.map(contract => (
                              <li sx={{ border: "1px solid red", marginBottom: "1rem" }}
                                  key={contract.number}>
                                <Link href={`/contracts/${contract.id}`}>
                                  <a>ССЫЛКА</a>
                                </Link>
                                Договор № {contract.number}
                                Статус: {contract?.ContractTransactions && JSON.stringify(contract?.ContractTransactions[0]?.DocumentStatus?.stage)}
                                <ol>
                                  {contract?.Agreements?.map(agreement => (
                                      <li sx={{ border: "1px solid green", marginBottom: "1rem" }}
                                          key={agreement.number}>
                                        <Link href={`/agreements/${agreement.id}`}>
                                          <a>ССЫЛКА</a>
                                        </Link>
                                        Дополнительное соглашение № {agreement.number}
                                        Счет № {agreement.Invoice && agreement.Invoice.number}
                                        Статус: {agreement?.AgreementTransactions && JSON.stringify(agreement?.AgreementTransactions[0]?.DocumentStatus?.stage)}
                                      </li>
                                  ))}
                                </ol>
                              </li>
                          ))}
                        </ul>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid xs={5}>
                    <Box sx={CARD}>
                      <div>{JSON.stringify(client.Contacts)}</div>
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