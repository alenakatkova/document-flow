import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import useFetch from "../../api/useFetch";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { CARD_SPACING, CARD } from "../../styles/constants";
import { ContractFromDB } from "../../interfaces/contract";
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
import TextField from "@mui/material/TextField";
import { CounterpartyFromDB } from "../../interfaces/counterparty";


// stage
//     [VisAssistantResponsibility
// 123 internalDepartmentld
// TODO FETCH INTERNAL DEPS

interface AddStatusFormProps {
  id : number;
  documentType : "contract"|"agreement";
}

const AddStatusForm = ({ id, documentType } : AddStatusFormProps) => {
  const {
    data: departments,
    isLoading
  } = useFetch<CounterpartyFromDB[]>("/departments", []);
  return (
      <pre>
        {JSON.stringify(departments, null, 2)}
      </pre>
  )
};

const Contract : NextPage = () => {
  const router = useRouter();

  const [isBeingEdited, setIsBeingEdited] = React.useState(false);

  const { data: contract, isLoading, fetchData } = useFetch<ContractFromDB>(`contracts/${router.query.id}`,
      {
        id: 0,
        number: ""
      }
  );

  return (
      <RequireAuth>
        <Layout title={"Договор №" + contract?.number + " с " + contract?.Counterparty?.name}
                heading={"Договор №" + contract?.number + " с " + contract?.Counterparty?.name}>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={9}>
                <Box sx={CARD}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    {contract?.startDate
                        && <Box sx={{ marginBottom: "0.8rem" }}>
                          Начало действия: {format(new Date(contract?.startDate), 'dd/MM/yyyy')}
                        </Box>}
                    {contract?.endDate
                        && <Box sx={{ marginBottom: "0.8rem" }}>
                          Конец действия: {format(new Date(contract?.endDate), 'dd/MM/yyyy')}
                        </Box>}
                    {contract?.signDate
                        && <Box sx={{ marginBottom: "1rem" }}>
                          Дата подписания: {format(new Date(contract?.signDate), 'dd/MM/yyyy')}
                        </Box>}
                    {contract?.linkToFileOnDisk
                        && <Box sx={{ marginBottom: "1rem" }}>
                          <HtmlLink href={contract?.linkToFileOnDisk}>Ссылка на документ на Google Disk</HtmlLink>
                        </Box>}

                    {!isBeingEdited
                        && <Box>
                          <Button onClick={() => setIsBeingEdited(true)} variant="contained">Редактировать</Button>
                        </Box>
                    }
                    {isBeingEdited && contract?.counterpartyId &&
                        <AddContractForm counterpartyId={contract?.counterpartyId}
                                         contract={contract}
                                         finishEditing={() => setIsBeingEdited(false)}
                                         isEditMode={true}
                        />}
                  </Box>
                </Box>
              </Grid>
              <Grid xs={3}>
                <Box sx={CARD}>
                  <Typography variant="h6" sx={{ marginBottom: "0.5rem" }}>
                    Текущий статус
                  </Typography>
                  {
                    contract?.ContractTransactions?.length === 0 || !contract?.ContractTransactions
                        ? "Статус не менялся"
                        : <Box>
                          <Typography>
                            {findLastStatusChange(contract?.ContractTransactions).DocumentStatus?.stage}
                          </Typography>
                        </Box>
                  }
                </Box>
              </Grid>

              <Grid xs={9}>
                <Box sx={CARD}>
                  <Box>
                    <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
                      История изменений статуса договора
                    </Typography>
                    {contract?.ContractTransactions && <TableContainer>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Дата</TableCell>
                            <TableCell>Статус</TableCell>
                            <TableCell>Комментарий</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {contract?.ContractTransactions?.map(transaction => (
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
                    Дополнительные соглашения
                  </Typography>
                  {
                    contract?.Agreements && contract?.Agreements?.length > 0
                        ? <Box>
                          {contract?.Agreements?.map(agreement => (
                              <Box key={agreement.id + agreement.number} sx={{ marginBottom: "0.2rem" }}>
                                <Link href={`/agreements/${agreement.id}`}>
                                  <HtmlLink>ДС №{agreement.number}</HtmlLink>
                                </Link>
                              </Box>
                          ))}
                        </Box>
                        : "Дополнительных соглашений нет"
                  }

                </Box>
              </Grid>

              <Grid xs={9}>
                <Box sx={CARD}>
                  <AddStatusForm id={contract.id} documentType="cotract"/>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Layout>
      </RequireAuth>
  )
};

export default Contract;