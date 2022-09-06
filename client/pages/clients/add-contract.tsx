// TODO сюда надо запросить клиентов залогиненной команды, вывести их радиобатоннами
// TODO надо сделать добавление блоба

import React, { useEffect } from "react";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Layout from "../../components/layout";
// import { Team as Inputs, TeamFromDB } from "../../interfaces/team";
import { Client, ClientFromDB } from "../../interfaces/client";
import { ClientContract, ClientContractFromDB } from "../../interfaces/clientContract";
import { CARD_SPACING, CARD } from "../../styles/constants";
import useFetch from "../../api/useFetch";
import { useAuth } from "../../contexts/authProvider";
import RequireAuth from "../../components/RequireAuth";
import { createContract } from "../../api/client";

type NumberFieldValue = number|""

interface Inputs {
  number : string,
  startDateDay : NumberFieldValue,
  startDateMonth : NumberFieldValue,
  startDateYear : NumberFieldValue,
  endDateDay : NumberFieldValue,
  endDateMonth : NumberFieldValue,
  endDateYear : NumberFieldValue,
  linkToFile? : string
}

const AddClientContract : NextPage = () => {
  const { handleSubmit, reset, formState: { isSubmitSuccessful }, control, watch, register } = useForm<Inputs>({
    defaultValues: {
      number: "",
      startDateDay: "",
      startDateMonth: "",
      startDateYear: "",
      endDateDay: "",
      endDateMonth: "",
      endDateYear: "",
      linkToFile: undefined
    }
  });
  const { t } = useTranslation("clients");
  const auth = useAuth();

  const {
    data: clients,
    fetchData: refetchClients,
    isLoading,
    error
  } = useFetch<ClientFromDB[]>("/clients", [], { teamId: 1 }); // TODO поменять на { teamId: auth.team } после добавление функции авторизации

  //
  // useEffect(() => {
  //   reset();
  // }, [reset, isSubmitSuccessful])

  const onSubmit : SubmitHandler<Inputs> = data => {
    const startDate = new Date(Number(data.startDateYear), Number(data.startDateMonth) - 1, Number(data.startDateDay));
    const endDate = new Date(Number(data.endDateYear), Number(data.endDateMonth) - 1, Number(data.endDateDay));
    const formData : ClientContract = {
      number: data.number,
      linkToFile: data.linkToFile,
      startDate,
      endDate
    }
    createContract(formData, 1);
    console.log(formData);
  };

  return (
      <RequireAuth>
        <Layout title={t("addContract.title")}>
          <Typography variant="body1" sx={{
            fontWeight: 300,
            textTransform: "uppercase",
            letterSpacing: "0.1rem"
          }}>{t("addContract.heading")}</Typography>
          <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
            <Grid container spacing={CARD_SPACING}>
              <Grid xs={6}>
                <Box sx={CARD}>
                  <Box
                      component="form"
                      encType="multipart/form-data"
                      noValidate
                      sx={{
                        width: "auto",
                        display: "flex",
                        flexDirection: "column",
                        "& > :not(style)": {
                          marginBottom: "1rem"
                        },
                      }}
                      onSubmit={handleSubmit(onSubmit)}
                  >
                    <Controller
                        control={control}
                        name="number"
                        rules={{ required: true }}
                        render={({ field: { ref, ...field } }) => (
                            <TextField
                                {...field}
                                inputRef={ref}
                                label={t("addContract.form.number")}
                                variant="outlined"
                                required
                            />
                        )}
                    />
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                      <Box sx={{ display: "flex", flexDirection: "column", width: "48%" }}>
                        <Box sx={{ width: "100%", paddingBottom: "0.5rem" }}>
                          {t("addContract.form.startDate")}
                        </Box>
                        <Box sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}>
                          <Box sx={{ width: "30%" }}>
                            <Controller
                                control={control}
                                name="startDateDay"
                                render={({ field: { ref, ...field } }) => (
                                    <TextField
                                        {...field}
                                        inputRef={ref}
                                        label={t("addContract.form.day")}
                                        variant="outlined"
                                        type="number"
                                    />
                                )}
                            />
                          </Box>
                          <Box sx={{ width: "30%" }}>
                            <Controller
                                control={control}
                                name="startDateMonth"
                                render={({ field: { ref, ...field } }) => (
                                    <TextField
                                        {...field}
                                        inputRef={ref}
                                        label={t("addContract.form.month")}
                                        variant="outlined"
                                        type="number"
                                    />
                                )}
                            />
                          </Box>
                          <Box sx={{ width: "30%" }}>
                            <Controller
                                control={control}
                                name="startDateYear"
                                render={({ field: { ref, ...field } }) => (
                                    <TextField
                                        {...field}
                                        inputRef={ref}
                                        label={t("addContract.form.year")}
                                        variant="outlined"
                                        type="number"
                                    />
                                )}
                            />
                          </Box>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", flexDirection: "column", width: "48%" }}>
                        <Box sx={{ width: "100%", paddingBottom: "0.5rem" }}>
                          {t("addContract.form.endDate")}
                        </Box>
                        <Box sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}>
                          <Box sx={{ width: "30%" }}>
                            <Controller
                                control={control}
                                name="endDateDay"
                                render={({ field: { ref, ...field } }) => (
                                    <TextField
                                        {...field}
                                        inputRef={ref}
                                        label={t("addContract.form.day")}
                                        variant="outlined"
                                        type="number"
                                    />
                                )}
                            />
                          </Box>
                          <Box sx={{ width: "30%" }}>
                            <Controller
                                control={control}
                                name="endDateMonth"
                                render={({ field: { ref, ...field } }) => (
                                    <TextField
                                        {...field}
                                        inputRef={ref}
                                        label={t("addContract.form.month")}
                                        variant="outlined"
                                        type="number"
                                    />
                                )}
                            />
                          </Box>
                          <Box sx={{ width: "30%" }}>
                            <Controller
                                control={control}
                                name="endDateYear"
                                render={({ field: { ref, ...field } }) => (
                                    <TextField
                                        {...field}
                                        inputRef={ref}
                                        label={t("addContract.form.year")}
                                        variant="outlined"
                                        type="number"
                                    />
                                )}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Controller
                        control={control}
                        name="linkToFile"
                        render={({ field: { ref, ...field } }) => (
                            <TextField
                                {...field}
                                inputRef={ref}
                                label={t("addContract.form.linkToFile")}
                                variant="outlined"
                            />
                        )}
                    />

                    <Button type="submit" variant="contained"
                            sx={{
                              width: "auto",
                              margin: "0 auto"
                            }}
                    >
                      {t("addContract.form.submit")}
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid xs={6}>
                <Grid container spacing={CARD_SPACING}>
                  <Grid xs={12}>
                    <Box sx={CARD}>
                      <Typography>{t("instruction.text")}</Typography>
                    </Box>
                  </Grid>
                  <Grid xs={12}>
                    <Box sx={CARD}>
                      <Typography variant="h6">{t("teams.heading")}</Typography>
                      {/*{isLoading*/}
                      {/*    ? <div>Loading...</div>*/}
                      {/*    : <List>*/}
                      {/*      {teams.map(team => {*/}
                      {/*        return (*/}
                      {/*            <ListItem key={team.id + team.name}>*/}
                      {/*              <ListItemText primary={team.name}/>*/}
                      {/*            </ListItem>*/}
                      {/*        )*/}
                      {/*      })}*/}
                      {/*    </List>*/}
                      {/*}*/}
                    </Box>
                  </Grid>
                </Grid>
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

export default AddClientContract;