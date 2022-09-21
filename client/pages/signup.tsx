import React, { useEffect } from "react";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Layout from "../components/layout";
import { Team as Inputs, TeamFromDB } from "../interfaces/team";
import { CARD, CARD_SPACING } from "../styles/constants";
import useFetch from "../api/useFetch";
import { useAuth } from "../contexts/authProvider";
import AuthPageSideBlock from "../components/common/AuthPageSideBlock";

const Signup : NextPage = () => {
  const { handleSubmit, reset, formState: { isSubmitSuccessful }, control } = useForm<Inputs>({
    defaultValues: {
      username: "",
      managerName: "",
      password: "",
      assistantName: "",
      assistantEmail: ""
    }
  });

  const { t } = useTranslation("signup");
  const { data: teams, fetchData: refetchTeams, isLoading, error } = useFetch<TeamFromDB[]>("/teams", []);
  const auth = useAuth();

  useEffect(() => {
    reset();
  }, [ reset, isSubmitSuccessful ])

  const onSubmit : SubmitHandler<Inputs> = data => {
    auth.signUp(data);
  };

  return (
      <Layout title={t("title")} heading={t("heading")}>
        <Box sx={{ flexGrow: 1, marginTop: "1rem" }}>
          <Grid container spacing={CARD_SPACING}>
            <Grid xs={6}>
              <Box sx={CARD}>
                <Box
                    component="form"
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
                      name="username"
                      rules={{ required: true }}
                      render={({ field: { ref, ...field } }) => (
                          <TextField
                              {...field}
                              inputRef={ref}
                              label={t("form.username")}
                              variant="outlined"
                              required
                          />
                      )}
                  />
                  <Controller
                      control={control}
                      name="managerName"
                      rules={{ required: true }}
                      render={({ field: { ref, ...field } }) => (
                          <TextField
                              {...field}
                              inputRef={ref}
                              label={t("form.managerName")}
                              variant="outlined"
                              required
                          />
                      )}
                  />
                  <Controller
                      control={control}
                      name="password"
                      rules={{ required: true }}
                      render={({ field: { ref, ...field } }) => (
                          <TextField
                              {...field}
                              inputRef={ref}
                              label={t("form.password")}
                              variant="outlined"
                              required
                          />
                      )}
                  />
                  <Controller
                      control={control}
                      name="assistantName"
                      render={({ field: { ref, ...field } }) => (
                          <TextField
                              {...field}
                              inputRef={ref}
                              label={t("form.assistantName")}
                              variant="outlined"
                          />
                      )}
                  />
                  <Controller
                      control={control}
                      name="assistantEmail"
                      render={({ field: { ref, ...field } }) => (
                          <TextField
                              {...field}
                              inputRef={ref}
                              label={t("form.assistantEmail")}
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
                    {t("form.submit")}
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid xs={6}>
              <AuthPageSideBlock />
            </Grid>
          </Grid>
        </Box>
      </Layout>
  )
};

export async function getStaticProps({ locale } : { locale : string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [ "common", "signup" ])),
    },
  };
}

export default Signup;