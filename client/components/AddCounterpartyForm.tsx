import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import { createCounterparty } from "../api/counterparty";
import { useAuth } from "../contexts/authProvider";

interface Inputs {
  isPriority : boolean;
  name : string;
  phone : string|undefined;
  bankDetails : string|undefined;
}

interface AddCounterpartyFormProps {
  type : string;
}

export const AddCounterpartyForm = ({ type } : AddCounterpartyFormProps) => {
  let { team } = useAuth();
  const { handleSubmit, reset, formState: { isSubmitSuccessful }, control, watch, register } = useForm<Inputs>({
    defaultValues: {
      name: "",
      isPriority: false,
      phone: "",
      bankDetails: ""
    }
  });

  const onSubmit : SubmitHandler<Inputs> = data => {
    !!team && createCounterparty({ type, ...data }, team)
    reset();
  };

  return (
      <Box
          component="form"
          encType="multipart/form-data"
          noValidate
          sx={{
            width: "50%",
            minWidth: "500px",
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
                    label={"Название"}
                    variant="outlined"
                    required
                />
            )}
        />

        <Box sx={{ marginBottom: "1rem" }}>
          <label>
            <input
                {...register("isPriority")}
                type="checkbox"
            /> Приоритетный контрагент
          </label>
        </Box>

        <Controller
            control={control}
            name="phone"
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
                <TextField
                    {...field}
                    inputRef={ref}
                    label={"Телефон"}
                    variant="outlined"
                    required
                />
            )}
        />

        <Controller
            control={control}
            name="bankDetails"
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
                <TextField
                    {...field}
                    inputRef={ref}
                    multiline
                    rows={4}
                    label={"Реквизиты"}
                    variant="outlined"
                    required
                />
            )}
        />

        <Button type="submit" variant="contained"
                sx={{
                  width: "auto",
                  margin: "0 auto"
                }}
        >
          Добавить
        </Button>
      </Box>
  )
};