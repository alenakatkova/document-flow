import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import { DateInput } from "../DateInput";
import { generateDateFromYYYYMMDD } from "../../utils/functions";
import { createAgreement, updateAgreement } from "../../api/agreement";
import { ContractFromDB } from "../../interfaces/contract";
import { AgreementFromDB } from "../../interfaces/agreement";

type NumberFieldValue = number | "";

interface Inputs {
  signYear : NumberFieldValue | undefined;
  signMonth : NumberFieldValue | undefined;
  signDay : NumberFieldValue | undefined;
  number : string;
  linkToFile : string | undefined;
}

interface AddAgreementFormProps {
  contractId : number;
  isEditMode? : boolean;
  agreement? : AgreementFromDB;
  finishEditing? : () => void;
}

export const AddAgreementShortForm = ({ contractId, isEditMode, agreement, finishEditing } : AddAgreementFormProps) => {
  const { handleSubmit, reset, formState: { isSubmitSuccessful }, control, watch, register } = useForm<Inputs>({
    defaultValues: {
      signYear: "",
      signMonth: "",
      signDay: "",
      number: "",
      linkToFile: "",
    }
  });

  const onSubmit : SubmitHandler<Inputs> = data => {
    const signDate = generateDateFromYYYYMMDD(data.signYear, data.signMonth, data.signDay);

    const formData = {
      number: data.number,
      linkToFile: data.linkToFile,
      contractId: contractId,
      signDate: signDate || null
    }

    if (isEditMode && agreement) updateAgreement(formData, agreement.id)
    else createAgreement(formData);
    finishEditing && finishEditing();
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
                    label={"Номер допсоглашения"}
                    variant="outlined"
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
                    label={"Ссылка на текст допсоглашения в облачном хранилище"}
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
              dayInputName={"signDay"}
              monthInputName={"signMonth"}
              yearInputName={"signYear"}
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
          {isEditMode ? "Сохранить" : "Добавить"}
        </Button>
      </Box>
  )
};