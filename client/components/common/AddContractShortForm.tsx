import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React from "react";
import { DateInput } from "./DateInput";
import { generateDateFromYYYYMMDD } from "../../utils/functions";
import { createContract, updateContract } from "../../api/contract";
import { ContractFromDB } from "../../interfaces/contract";

type NumberFieldValue = number | "";

interface Inputs {
  startYear : NumberFieldValue | undefined;
  startMonth : NumberFieldValue | undefined;
  startDay : NumberFieldValue | undefined;
  endYear : NumberFieldValue | undefined;
  endMonth : NumberFieldValue | undefined;
  endDay : NumberFieldValue | undefined;
  signYear : NumberFieldValue | undefined;
  signMonth : NumberFieldValue | undefined;
  signDay : NumberFieldValue | undefined;
  number : string;
  linkToFileOnDisk : string | undefined;
}

interface AddContractFormProps {
  counterpartyId : number;
  isEditMode? : boolean;
  contract? : ContractFromDB;
  finishEditing? : () => void;
}

export const AddContractShortForm = ({
                                       counterpartyId,
                                       contract,
                                       finishEditing,
                                       isEditMode
                                     } : AddContractFormProps) => {
  const { handleSubmit, reset, formState: { isSubmitSuccessful }, control, watch, register } = useForm<Inputs>({
    defaultValues: {
      signYear: "",
      signMonth: "",
      signDay: "",
      startYear: "",
      startMonth: "",
      startDay: "",
      endYear: "",
      endMonth: "",
      endDay: "",
      number: "",
      linkToFileOnDisk: "",
    }
  });

  const onSubmit : SubmitHandler<Inputs> = data => {
    const startDate = generateDateFromYYYYMMDD(data.startYear, data.startMonth, data.startDay);
    const endDate = generateDateFromYYYYMMDD(data.endYear, data.endMonth, data.endDay);
    const signDate = generateDateFromYYYYMMDD(data.signYear, data.signMonth, data.signDay);


    const formData = {
      number: data.number,
      linkToFileOnDisk: data.linkToFileOnDisk,
      counterpartyId: counterpartyId,
      startDate: startDate || null,
      endDate: endDate || null,
      signDate: signDate || null
    };

    if (isEditMode && contract) updateContract(formData, contract.id)
    else createContract(formData);
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
                    label={"Номер договора"}
                    variant="outlined"
                    required
                />
            )}
        />

        <Controller
            control={control}
            name="linkToFileOnDisk"
            render={({ field: { ref, ...field } }) => (
                <TextField
                    {...field}
                    inputRef={ref}
                    label={"Ссылка на текст договора в облачном хранилище"}
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
              dayInputName={"startDay"}
              monthInputName={"startMonth"}
              yearInputName={"startYear"}
              control={control}
              heading={"Начало действия"}
          />
        </Box>
        <Box sx={{
          marginBottom: "1rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}>
          <DateInput
              dayInputName={"endDay"}
              monthInputName={"endMonth"}
              yearInputName={"endYear"}
              control={control}
              heading={"Окончание действия"}
          />
        </Box>
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