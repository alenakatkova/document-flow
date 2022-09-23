import React, { useEffect, useState } from "react";
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
import { Doc, formDocumentsList } from "../utils/formDocumentsList";
import { AllDocumentsTable } from "../components/documents/AllDocumentsTable";


const Documents : NextPage = () => {
  let { team } = useAuth();

  const {
    data: counterparties
  } = useFetch<CounterpartyFromDB[]>("/counterparties/get-statuses", [], { teamId: team });

  const { data: documentStatuses } = useFetch<DocumentStatusFromDB[]>("/document-statuses", []);

  const [ initialDocs, setInitialDocs ] = useState<Doc[]>([])
  const [ docsToRender, setDocsToRender ] = useState<Doc[]>([])

  useEffect(() => {
    let docs = formDocumentsList(counterparties, documentStatuses);
    setInitialDocs(docs)
    setDocsToRender(docs);
  }, [ counterparties, documentStatuses ])

  const [ isPriorityChecked, setIsPriorityChecked ] = useState(false);
  const [ searchInput, setSearchInput ] = useState("");

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

                  <AllDocumentsTable documents={docsToRender} />
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
      ...(await serverSideTranslations(locale, [ "common", "clients" ])),
    },
  };
}

export default Documents;