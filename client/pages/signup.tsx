import React, { useState, useEffect, useCallback } from "react";
import type { NextPage } from "next";
import Layout from "../components/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import { useTranslation } from "next-i18next";
import { useForm, SubmitHandler } from "react-hook-form";
import { Team as Inputs } from "../interfaces/team";
import { CARD_SPACING, CARD } from "../styles/constants";

const Signup : NextPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const [repeatPassword, setRepeatPassword] = useState("");
  const { t } = useTranslation("signup");


  const onSubmit : SubmitHandler<Inputs> = data => console.log(data);
  
  function handleChange(event : React.ChangeEvent<HTMLInputElement>) {
    setRepeatPassword(event.target.value);
  }

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
                  {/* register your input into the hook by invoking the "register" function */}
                  <TextField label={t("form.name")} variant="outlined" {...register("name")} />
                  <TextField label={t("form.password")} variant="outlined" {...register("password")} />
                  <TextField label={t("form.repeatPassword")} value={repeatPassword}
                             onChange={handleChange}/>
                  {watch("password") !== repeatPassword ? "error" : ""}
                  <TextField label={t("form.assistantName")} variant="outlined" {...register("assistant_name")} />
                  <TextField label={t("form.assistantEmail")} variant="outlined" {...register("assistant_email")} />
                  <TextField label={t("form.juniorName")} variant="outlined" {...register("junior_name")} />
                  <TextField label={t("form.juniorEmail")} variant="outlined" {...register("junior_email")} />
                  <Button type="submit" variant="contained"
                          sx={{
                            width: "auto",
                            margin: "0 auto"
                          }}
                          disabled={watch("password") !== repeatPassword}
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