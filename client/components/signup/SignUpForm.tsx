import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Team as Inputs } from "../../interfaces/team";
import { useTranslation } from "next-i18next";
import { useAuth } from "../../contexts/authProvider";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { CARD } from "../../styles/constants";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const SignUpForm = () => {
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
  const auth = useAuth();

  useEffect(() => {
    reset();
  }, [ reset, isSubmitSuccessful ])

  const onSubmit : SubmitHandler<Inputs> = data => {
    auth.signUp(data);
  };

  return (
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
  )
}