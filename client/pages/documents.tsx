import React, { ChangeEvent, useEffect, useState } from "react";
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
import { Doc } from "../utils/formDocumentsList"

interface AllDocumentsFormProps {
  documents : Doc[];
}

const AllDocumentsForm = ({ documents } : AllDocumentsFormProps) => {
  return (
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Приоритет</TableCell>
              <TableCell>Документ</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Родительский документ</TableCell>
              <TableCell>Контрагенты</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map(doc => (
                <TableRow
                    key={JSON.stringify(doc)}
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
  )
}

const docTypeOptions = [
  {
    label: "Договор",
    value: "contract",
    id: 0
  },
  {
    label: "Счет",
    value: "invoice",
    id: 1
  },
  {
    label: "Дополнительное соглашение",
    value: "agreement",
    id: 2
  },
  {
    label: "Все",
    value: "all",
    id: 3
  }
];


const Documents : NextPage = () => {
  let { team } = useAuth();

  const {
    data: counterparties
  } = useFetch<CounterpartyFromDB[]>("/counterparties/get-statuses", [], { teamId: team });

  const { data: documentStatuses } = useFetch<DocumentStatusFromDB[]>("/document-statuses", []);

  const [initialDocs, setInitialDocs] = useState<Doc[]>([])
  const [docsToRender, setDocsToRender] = useState<Doc[]>([])

  useEffect(() => {
    let docs = formDocumentsList(counterparties, documentStatuses);
    setInitialDocs(docs)
    setDocsToRender(docs);
  }, [counterparties, documentStatuses])

  const [isPriorityChecked, setIsPriorityChecked] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const onSearchInput = (e : React.ChangeEvent<HTMLInputElement>) => {
    setIsPriorityChecked(false);
    setSearchInput(e.target.value)
    let docs = initialDocs
        .filter(doc => {
          if (
              doc.counterpartyName.toLowerCase().includes(e.target.value.toLowerCase())
              || doc.rusType.toLowerCase().includes(e.target.value.toLowerCase())
              || doc.status.toLowerCase().includes(e.target.value.toLowerCase())
          ) {
            return true
          }
        })
    setDocsToRender(docs);
  }

  const onPriorityToggle = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput("");
    setIsPriorityChecked(e.target.checked)
    let docs = initialDocs
    if (e.target.checked) {
      docs = initialDocs.filter(doc => {
        return doc.isPriority === e.target.checked
      })
    }
    setDocsToRender(docs)
  }

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
                          checked={isPriorityChecked}
                          onChange={(e) => onPriorityToggle(e)}
                      /> Приоритетные документы
                    </label>
                  </Box>
                  <Box sx={{ marginBottom: "1rem" }}>
                    <label>
                      <input
                          type="text"
                          value={searchInput}
                          onChange={(e) => onSearchInput(e)}
                      /> Поиск по типу документа, статусу или контрагенту
                    </label>
                  </Box>

                  <AllDocumentsForm documents={docsToRender}/>
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