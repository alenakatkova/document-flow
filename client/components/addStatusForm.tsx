import React from "react";
import useFetch from "../api/useFetch";
import { DocumentStatusFromDB } from "../interfaces/documentStatus";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { createAgreementTransaction, createContractTransaction } from "../api/transaction";
import Box from "@mui/material/Box";
import { RadioButtonChoice } from "./common/RadioButtonChoice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface AddStatusFormProps {
  documentType : "contract" | "agreement";
  documentId : number;
}

interface Inputs {
  comment : string | undefined;
}

export const AddStatusForm = ({ documentType, documentId } : AddStatusFormProps) => {
  const [ chosenStatus, setChosenStatus ] = React.useState<number | undefined>(undefined);

  const { data: documentStatuses, isLoading } = useFetch<DocumentStatusFromDB[]>("/document-statuses", []);

  const statusesDataForRadioBtns = documentStatuses.map(status => {
    return {
      value: status.stage || "",
      label: status.stage || "",
      id: status.id
    }
  });

  const { handleSubmit, reset, formState: { isSubmitSuccessful }, control, watch, register } = useForm<Inputs>({
    defaultValues: {
      comment: "",
    }
  });

  const onSubmit : SubmitHandler<Inputs> = data => {
    let formData;
    if (documentType === "contract") {
      formData = {
        documentStatusId: chosenStatus,
        comment: data.comment,
        contractId: documentId
      };
      createContractTransaction(formData)
    }
    if (documentType === "agreement") {
      formData = {
        documentStatusId: chosenStatus,
        comment: data.comment,
        agreementId: documentId
      };
      createAgreementTransaction(formData)
    }

    console.log(formData)
    reset();
  };

  return (
      <Box>
        {!isLoading && documentStatuses && documentStatuses.length > 0
            && <RadioButtonChoice options={statusesDataForRadioBtns}
                                  heading={"Выберите статус"}
                                  setChosenOption={setChosenStatus}
                                  whatToAdd={""}
                                  radioGroupName={"status"} />
        }
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
              name="comment"
              rules={{ required: true }}
              render={({ field: { ref, ...field } }) => (
                  <TextField
                      {...field}
                      inputRef={ref}
                      label={"Комментарий"}
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
      </Box>
  )
};