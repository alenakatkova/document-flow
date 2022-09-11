import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import useFetch from "../../api/useFetch";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { CARD, CARD_SPACING } from "../../styles/constants";
import RequireAuth from "../../components/RequireAuth";
import format from "date-fns/format";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import { findLastStatusChange } from "../../utils/functions";
import HtmlLink from '@mui/material/Link';
import Link from "next/link";
import Button from "@mui/material/Button";
import { AddContractForm } from "../../components/AddContractForm";
import { AddStatusForm } from "../../components/addStatusForm";
import { AgreementFromDB } from "../../interfaces/agreement";
import { AddAgreementForm } from "../../components/AddAgreementForm";

const Agreement : NextPage = () => {
  const router = useRouter();

  const [isBeingEdited, setIsBeingEdited] = React.useState(false);

  const { data: agreement, isLoading } = useFetch<AgreementFromDB>(`agreements/${router.query.id}`,
      {
        id: 0,
        number: ""
      }
  );

  return (
      <RequireAuth>
        <Layout
            title={"Дополнительное соглашение №" + agreement?.number + " к договору №" + agreement?.Contract?.number}
            heading={"Дополнительное соглашение №" + agreement?.number + " к договору №" + agreement?.Contract?.number}>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={9}>
                <Box sx={{ ...CARD, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {agreement?.signDate
                        && <Box sx={{ marginBottom: "1rem" }}>
                          Дата подписания: {format(new Date(agreement?.signDate), 'dd/MM/yyyy')}
                        </Box>}
                    {agreement?.linkToFile
                        && <Box sx={{ marginBottom: "1rem" }}>
                          <HtmlLink href={agreement?.linkToFile}>Ссылка на документ на Google Disk</HtmlLink>
                        </Box>}

                    {!isBeingEdited
                        && <Box>
                          <Button onClick={() => setIsBeingEdited(true)} variant="contained">Редактировать</Button>
                        </Box>
                    }
                    {isBeingEdited && agreement?.contractId &&
                        <AddAgreementForm contractId={agreement?.contractId}
                                          agreement={agreement}
                                          finishEditing={() => setIsBeingEdited(false)}
                                          isEditMode={true}
                        />}
                  </Box>


                  <Box>
                    <Typography variant="h6" sx={{ marginBottom: "0.5rem" }}>
                      Вторая сторона:
                    </Typography>
                    <Link
                        href={`/${agreement?.Contract?.Counterparty?.type}s/${agreement?.Contract?.Counterparty?.id}`}>
                      <HtmlLink sx={{ cursor: "pointer" }}>{agreement?.Contract?.Counterparty?.name}</HtmlLink>
                    </Link>
                  </Box>
                </Box>
              </Grid>
              <Grid xs={3}>
                <Box sx={CARD}>
                  <Typography variant="h6" sx={{ marginBottom: "0.5rem" }}>
                    Текущий статус
                  </Typography>
                  {
                    agreement?.AgreementTransactions?.length === 0 || !agreement?.AgreementTransactions
                        ? "Статус не менялся"
                        : <Box>
                          <Typography>
                            {findLastStatusChange(agreement?.AgreementTransactions).DocumentStatus?.stage}
                          </Typography>
                        </Box>
                  }
                </Box>
              </Grid>

              <Grid xs={9}>
                <Box sx={CARD}>
                  <Box>
                    <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
                      История изменений статуса дополнительного соглашения
                    </Typography>
                    {agreement?.AgreementTransactions && <TableContainer>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Дата</TableCell>
                            <TableCell>Статус документа</TableCell>
                            <TableCell>Комментарий</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {agreement?.AgreementTransactions?.map(transaction => (
                              <TableRow key={transaction?.id}>
                                <TableCell>{transaction?.createdAt
                                    && format(new Date(transaction?.createdAt), 'dd/MM/yyyy')}</TableCell>
                                <TableCell>{transaction?.DocumentStatus?.stage}</TableCell>
                                <TableCell>{transaction?.comment}</TableCell>
                              </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>}
                  </Box>
                </Box>
              </Grid>
              <Grid xs={3}>
                <Box sx={CARD}>
                  <Typography variant="h6" sx={{ marginBottom: "0.5rem" }}>
                    Вторая сторона:
                  </Typography>
                  <Link href={`/${agreement?.Contract?.Counterparty?.type}s/${agreement?.Contract?.Counterparty?.id}`}>
                    <HtmlLink sx={{ cursor: "pointer" }}>{agreement?.Contract?.Counterparty?.name}</HtmlLink>
                  </Link>
                </Box>
              </Grid>

              <Grid xs={9}>
                <Box sx={CARD}>
                  <Typography variant="h6" sx={{ marginBottom: "0.5rem" }} id="change-status">
                    Форма для изменения статуса дополнительного соглашения
                  </Typography>
                  <AddStatusForm documentId={agreement.id} documentType="agreement"/>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Layout>
      </RequireAuth>
  )
};

export default Agreement;