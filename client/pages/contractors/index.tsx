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

const Contractors : NextPage = () => {
  const { t } = useTranslation("clients");
  let { team } = useAuth();
  const router = useRouter();

  const {
    data: counterparties,
    isLoading
  } = useFetch<CounterpartyFromDB[]>("/counterparties", [], { teamId: team, type: "contractor" });

  return (
      <RequireAuth>
        <Layout title={"Подрядчики"} heading={"Подрядчики"}>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={7}>
                <Box sx={CARD}>
                  <Typography variant="h6">{t("inWork.heading")}</Typography>
                  <Box>{!isLoading && (
                      <div>
                        {counterparties.map(client => (
                            <Box sx={{ border: "1px solid blue", marginBottom: "1rem" }}
                                 key={client.name}>
                              <Link href={`/clients/${client.id}`}>
                                <a>ССЫЛКА</a>
                              </Link>
                              <div>{client.name}</div>
                              <div>{client.phone}</div>
                              <div>{JSON.stringify(client.Contacts)}</div>
                              <div>
                                {client?.Contracts?.map(contract => (
                                    <Box sx={{ border: "1px solid red", marginBottom: "1rem" }}
                                         key={contract.number}>
                                      <Link href={`/contracts/${contract.id}`}>
                                        <a>ССЫЛКА</a>
                                      </Link>
                                      Договор № {contract.number}
                                      Статус: {contract?.ContractTransactions && JSON.stringify(contract?.ContractTransactions[0]?.DocumentStatus?.stage)}
                                      <div>
                                        {contract?.Agreements?.map(agreement => (
                                            <Box sx={{ border: "1px solid green", marginBottom: "1rem" }}
                                                 key={agreement.number}>
                                              <Link href={`/agreements/${agreement.id}`}>
                                                <a>ССЫЛКА</a>
                                              </Link>
                                              Дополнительное соглашение № {agreement.number}
                                              Счет № {agreement.Invoice && agreement.Invoice.number}
                                              Статус: {agreement?.AgreementTransactions && JSON.stringify(agreement?.AgreementTransactions[0].DocumentStatus?.stage)}
                                            </Box>
                                        ))}
                                      </div>
                                    </Box>
                                ))}
                              </div>

                            </Box>
                        ))}
                      </div>
                  )}</Box>
                </Box>
              </Grid>
              <Grid xs={5}>
                <Box sx={CARD}>
                  <Typography variant="h6">{t("contacts.heading")}</Typography>
                  <Box>Список с телефонами, ФИО, имейлами, должностью. Скрытое конкретно здесь: дни рождения и
                    предпочтения по подаркам, основной или дополнительный. Но основные подчеркиваются</Box>
                </Box>
              </Grid>
            </Grid>
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

export default Contractors;