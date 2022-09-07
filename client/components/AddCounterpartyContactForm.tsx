import { useRouter } from "next/router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { generateDateFromYYYYMMDD } from "../utils/functions";
import { createContact } from "../api/counterparty";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DateInput } from "./DateInput";
import Button from "@mui/material/Button";
import React from "react";

type NumberFieldValue = number|"";

interface Inputs {
  year : NumberFieldValue|undefined;
  month : NumberFieldValue|undefined;
  day : NumberFieldValue|undefined;
  name : string;
  phone : string|undefined;
  email : string|undefined;
  job : string|undefined;
}

interface AddCounterpartyContactFormProps {
  closeForm : () => void;
}

export const AddCounterpartyContactForm = ({ closeForm } : AddCounterpartyContactFormProps) => {
  const router = useRouter();

  const { handleSubmit, reset, formState: { isSubmitSuccessful }, control, watch, register } = useForm<Inputs>({
    defaultValues: {
      year: "",
      month: "",
      day: "",
      name: "",
      phone: "",
      email: "",
      job: ""
    }
  });

  const onSubmit : SubmitHandler<Inputs> = data => {
    const birthday = generateDateFromYYYYMMDD(data.year, data.month, data.day);
    const { name, phone, job, email } = data;
    const formData = {
      name,
      phone,
      job,
      email,
      birthday
    }

    createContact(formData, Number(router.query.id));
    reset();
    closeForm();
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
                    label={"ФИО"}
                    variant="outlined"
                    required
                />
            )}
        />

        <Controller
            control={control}
            name="job"
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
                <TextField
                    {...field}
                    inputRef={ref}
                    label={"Должность"}
                    variant="outlined"
                    required
                />
            )}
        />

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
            name="email"
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
                <TextField
                    {...field}
                    inputRef={ref}
                    label={"Электронная почта"}
                    variant="outlined"
                    required
                />
            )}
        />

        <DateInput dayInputName={"day"}
                   monthInputName={"month"}
                   yearInputName={"year"}
                   control={control}
                   heading="День рождения"/>
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