import React from "react";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Layout from "../components/layout";
import { CARD, CARD_SPACING } from "../styles/constants";
import useFetch from "../api/useFetch";
import { useAuth } from "../contexts/authProvider";
import RequireAuth from "../components/RequireAuth";
import { CounterpartyFromDB } from "../interfaces/counterparty";
import { DocumentStatusFromDB } from "../interfaces/documentStatus";
import { formDocumentsList } from "../utils/formDocumentsList";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Link from "next/link";
import HtmlLink from "@mui/material/Link";
import TableContainer from "@mui/material/TableContainer";
import { TYPES } from "../utils/constants"

const Documents : NextPage = () => {
  let { team } = useAuth();

  const {
    data: counterparties
  } = useFetch<CounterpartyFromDB[]>("/counterparties/get-statuses", [], { teamId: team });

  const { data: documentStatuses } = useFetch<DocumentStatusFromDB[]>("/document-statuses", []);

  const docs = formDocumentsList(counterparties, documentStatuses);

  return (
      <RequireAuth>
        <Layout title={"Все документы"} heading={"Все документы"}>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={12}>
                <Box sx={CARD}>
                  <Box sx={{ marginBottom: "1rem" }}>
                    <label>
                      <input
                          type="checkbox"
                      /> Приоритетные документы
                    </label>
                  </Box>

                  <TableContainer>
                    <Table size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Приоритет</TableCell>
                          <TableCell>Документ</TableCell>
                          <TableCell>Статус</TableCell>
                          <TableCell>Родительский документ</TableCell>
                          <TableCell>Контрагент</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {docs.map(doc => (
                            <TableRow
                                key={doc.type + doc.number}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell>{doc.isPriority ? "Высокий" : "Низкий"}</TableCell>
                              <TableCell>
                                {doc.type !== "invoice"
                                    ? <Link href={doc.link}>
                                      <HtmlLink sx={{ cursor: "pointer" }}>{TYPES[doc.type]} №{doc.number}</HtmlLink>
                                    </Link>
                                    : `${TYPES[doc.type]} №${doc.number}`}
                              </TableCell>
                              <TableCell>{doc.status}</TableCell>
                              <TableCell>
                                {doc.parentDocumentLink && <Link href={doc.parentDocumentLink}>
                                  <HtmlLink sx={{ cursor: "pointer" }}>{doc.parentDocumentName}</HtmlLink>
                                </Link>}
                              </TableCell>
                              <TableCell>
                                {doc.counterpartyLink && <Link href={doc.counterpartyLink}>
                                  <HtmlLink sx={{ cursor: "pointer" }}>{doc.counterpartyName}</HtmlLink>
                                </Link>}
                              </TableCell>
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Grid>

              <Grid xs={12}>
                <Box sx={CARD}>
                  <pre>
                    {JSON.stringify(docs, null, 2)}
                  </pre>
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

export default Documents;