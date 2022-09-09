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
import { formDocumentsList, Doc } from "../utils/formDocumentsList";
import { Typography } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import format from "date-fns/format";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import HtmlLink from "@mui/material/Link";
import Link from "next/link";

const TYPES = {
  "contract": "Договор",
  "agreement": "ДС",
  "invoice": "Счет"
};

interface TasksTableProps {
  documents : Doc[];
}

const TasksTable = ({ documents } : TasksTableProps) => {
  return (
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Документ</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Родительский документ</TableCell>
              <TableCell>Контрагент</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map(task => (
                <TableRow
                    key={task.type + task.number}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    {task.type !== "invoice"
                        ? <Link href={task.link}>
                          <HtmlLink sx={{ cursor: "pointer" }}>{TYPES[task.type]} №{task.number}</HtmlLink>
                        </Link>
                        : `${TYPES[task.type]} №${task.number}`}
                  </TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>
                    {task.parentDocumentLink && <Link href={task.parentDocumentLink}>
                      <HtmlLink sx={{ cursor: "pointer" }}>{task.parentDocumentName}</HtmlLink>
                    </Link>}
                  </TableCell>
                  <TableCell>
                    {task.counterpartyLink && <Link href={task.counterpartyLink}>
                      <HtmlLink sx={{ cursor: "pointer" }}>{task.counterpartyName}</HtmlLink>
                    </Link>}
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  )
}

const Tasks : NextPage = () => {
  let { team } = useAuth();

  const {
    data: counterparties
  } = useFetch<CounterpartyFromDB[]>("/counterparties/get-statuses", [], { teamId: team });

  const { data: documentStatuses } = useFetch<DocumentStatusFromDB[]>("/document-statuses", []);

  const docs = formDocumentsList(counterparties, documentStatuses);
  const highPriorityTasks = docs.filter(doc => doc.isPriority
      && doc.isAssistantsResponsibility
      && doc.status !== "Отменен"
      && doc.status !== "Подписан" &&
      doc.status !== "Оплачен");

  const highPriorityNotTasks = docs.filter(doc => doc.isPriority
      && !doc.isAssistantsResponsibility
      && doc.status !== "Отменен"
      && doc.status !== "Подписан" &&
      doc.status !== "Оплачен");

  const lowPriorityTasks = docs.filter(doc => !doc.isPriority
      && doc.isAssistantsResponsibility
      && doc.status !== "Отменен"
      && doc.status !== "Подписан"
      && doc.status !== "Оплачен");

  const lowPriorityNotTasks = docs.filter(doc => !doc.isPriority
      && !doc.isAssistantsResponsibility
      && doc.status !== "Отменен"
      && doc.status !== "Подписан"
      && doc.status !== "Оплачен");

  return (
      <RequireAuth>
        <Layout title={"Задачи"} heading={"Задачи"}>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={6}>
                <Box sx={CARD}>
                  <Typography variant="h6">Срочные задачи по приоритетным контрагентам</Typography>
                  <TasksTable documents={highPriorityTasks}/>
                </Box>
              </Grid>
              <Grid xs={6}>
                <Box sx={CARD}>
                  <Typography variant="h6">Другие приоритетные документы</Typography>
                  <Box sx={{ margin: "0.5rem 0" }}>В работе у контрагентов или других департаметов. До изменения статуса
                    документа действия не
                    требуются</Box>
                  <TasksTable documents={highPriorityNotTasks}/>
                </Box>
              </Grid>
              <Grid xs={6}>
                <Box sx={CARD}>
                  <Typography variant="h6">Неприоритетные задачи</Typography>
                  <TasksTable documents={lowPriorityTasks}/>
                </Box>
              </Grid>
              <Grid xs={6}>
                <Box sx={CARD}>
                  <Typography variant="h6">Другие неприоритетные документы</Typography>
                  <Box sx={{ margin: "0.5rem 0" }}>В работе у контрагентов или других департаметов. До изменения статуса
                    документа действия не
                    требуются</Box>
                  <TasksTable documents={lowPriorityNotTasks}/>
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

export default Tasks;