import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import { DateInput } from "./DateInput";
import { generateDateFromYYYYMMDD } from "../utils/functions";
import { createInvoice } from "../api/invoice";
import { Invoice } from "../interfaces/invoice";

type NumberFieldValue = number|"";

interface Inputs {
  dueYear : NumberFieldValue|undefined;
  dueMonth : NumberFieldValue|undefined;
  dueDay : NumberFieldValue|undefined;
  number : string;
  linkToFile : string|undefined;
  status : "Оплачен"|"Не ввыставлен"|"Требуется оплата"|"";
}

interface AddInvoiceFormProps {
  agreementId : number;
}

export const AddInvoiceForm = ({ agreementId } : AddInvoiceFormProps) => {
  const { handleSubmit, reset, formState: { isSubmitSuccessful }, control, watch, register } = useForm<Inputs>({
    defaultValues: {
      dueYear: "",
      dueMonth: "",
      dueDay: "",
      number: "",
      linkToFile: "",
      status: ""
    }
  });

  const onSubmit : SubmitHandler<Inputs> = data => {
    const due = generateDateFromYYYYMMDD(data.dueYear, data.dueMonth, data.dueDay);
    const formData : Invoice = {
      number: data.number,
      linkToFile: data.linkToFile,
      status: data.status,
      agreementId: agreementId,
      due
    };

    createInvoice(formData);
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
            name="number"
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
                <TextField
                    {...field}
                    inputRef={ref}
                    label={"Номер счета"}
                    variant="outlined"
                    required
                />
            )}
        />

        <Controller
            control={control}
            name="status"
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
                <TextField
                    {...field}
                    inputRef={ref}
                    label={"Статус"}
                    variant="outlined"
                    placeholder={"Оплачен / Не ввыставлен / Требуется оплата"}
                    required
                />
            )}
        />

        <Controller
            control={control}
            name="linkToFile"
            render={({ field: { ref, ...field } }) => (
                <TextField
                    {...field}
                    inputRef={ref}
                    label={"Ссылка на файл счета в облачном хранилище"}
                    variant="outlined"
                />
            )}
        />

        <Box sx={{
          marginBottom: "1rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}>
          <DateInput
              dayInputName={"dueDay"}
              monthInputName={"dueMonth"}
              yearInputName={"dueYear"}
              control={control}
              heading={"Дата подписания"}
          />
        </Box>

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