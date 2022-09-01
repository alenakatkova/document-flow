import React, { useState, useEffect, useCallback } from "react";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Layout from "../components/layout";
import { Team as Inputs } from "../interfaces/team";
import { CARD_SPACING, CARD } from "../styles/constants";

const Signup : NextPage = () => {
  const { handleSubmit, reset, formState: { isSubmitSuccessful }, control } = useForm<Inputs>({
    defaultValues: {
      name: "",
      password: "",
      assistant_name: "",
      assistant_email: "",
      junior_name: "",
      junior_email: ""
    }
  });
  const { t } = useTranslation("signup");

  useEffect(() => {
    reset();
  }, [reset, isSubmitSuccessful])

  const onSubmit : SubmitHandler<Inputs> = data => {
    console.log(data);
  };

  return (
      <Layout title={t("title")}>
        <Typography variant="body1" sx={{
          fontWeight: 300,
          textTransform: "uppercase",
          letterSpacing: "0.1rem"
        }}>{t("heading")}</Typography>
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
                      name="name"
                      rules={{ required: true }}
                      render={({ field: { ref, ...field } }) => (
                          <TextField
                              {...field}
                              inputRef={ref}
                              label={t("form.name")}
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
                      name="assistant_name"
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
                      name="assistant_email"
                      render={({ field: { ref, ...field } }) => (
                          <TextField
                              {...field}
                              inputRef={ref}
                              label={t("form.assistantEmail")}
                              variant="outlined"
                          />
                      )}
                  />
                  <Controller
                      control={control}
                      name="junior_name"
                      render={({ field: { ref, ...field } }) => (
                          <TextField
                              {...field}
                              inputRef={ref}
                              label={t("form.juniorName")}
                              variant="outlined"
                          />
                      )}
                  />
                  <Controller
                      control={control}
                      name="junior_email"
                      render={({ field: { ref, ...field } }) => (
                          <TextField
                              {...field}
                              inputRef={ref}
                              label={t("form.juniorEmail")}
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
            <Grid xs={3}>
              <Grid container spacing={CARD_SPACING}>
                <Grid xs={12}>
                  <Box sx={CARD}>
                    <Typography>{t("instruction.callAdmin")}</Typography>
                    <Typography>{t("instruction.ifExists")}</Typography>
                    <Typography>{t("instruction.ifCantCreate")}</Typography>
                  </Box>
                </Grid>
                <Grid xs={12}>
                  <Box sx={CARD}>
                    <Typography>{t("teams.heading")}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

          </Grid>
        </Box>
      </Layout>
  )
};

export async function getStaticProps({ locale } : { locale : string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "signup"])),
    },
  };
}

export default Signup;