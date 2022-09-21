import { AgreementFromDB } from "../../interfaces/agreement";
import React from "react";
import Box from "@mui/material/Box";
import format from "date-fns/format";
import HtmlLink from "@mui/material/Link";
import Button from "@mui/material/Button";
import { AddAgreementShortForm } from "../common/AddAgreementShortForm";
import { AddInvoiceShortForm } from "../common/AddInvoiceShortForm";
import { Typography } from "@mui/material";
import Link from "next/link";

interface AgreementInfoProps {
  agreement : AgreementFromDB;
}

export const AgreementInfo = ({ agreement } : AgreementInfoProps) => {
  const [ isAgreementBeingEdited, setIsAgreementBeingEdited ] = React.useState(false);
  const [ isInvoiceBeingEdited, setIsInvoiceBeingEdited ] = React.useState(false);

  return (
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {agreement?.signDate
              && <Box sx={{ marginBottom: "1rem" }}>
                Дата подписания: {format(new Date(agreement?.signDate), 'dd/MM/yyyy')}
              </Box>}
          {agreement?.linkToFile
              && <Box sx={{ marginBottom: "1rem" }}>
                <HtmlLink href={agreement?.linkToFile}>Ссылка на документ на Google Disk</HtmlLink>
              </Box>}

          {!isAgreementBeingEdited
              && <Box>
                <Button onClick={() => setIsAgreementBeingEdited(true)} variant="contained">Редактировать
                  ДС</Button>
              </Box>
          }

          {isAgreementBeingEdited && agreement?.contractId &&
              <AddAgreementShortForm contractId={agreement?.contractId}
                                     agreement={agreement}
                                     finishEditing={() => setIsAgreementBeingEdited(false)}
                                     isEditMode={true}
              />
          }

          {agreement?.Invoice && !isInvoiceBeingEdited
              && <Box sx={{ marginTop: "1rem" }}>
                <Button onClick={() => setIsInvoiceBeingEdited(true)} variant="contained">Редактировать
                  счет</Button>
              </Box>
          }

          {isInvoiceBeingEdited && agreement?.Invoice && agreement?.contractId &&
              <Box sx={{ marginTop: "1rem" }}>
                <AddInvoiceShortForm
                    agreementId={agreement.id}
                    invoice={agreement?.Invoice}
                    finishEditing={() => setIsInvoiceBeingEdited(false)}
                    isEditMode={true}
                />
              </Box>
          }
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <Typography variant="h6" sx={{ marginBottom: "0.5rem" }}>
            Вторая сторона:
          </Typography>
          <Link
              href={`/${agreement?.Contract?.Counterparty?.type}s/${agreement?.Contract?.Counterparty?.id}`}>
            <HtmlLink sx={{ cursor: "pointer" }}>{agreement?.Contract?.Counterparty?.name}</HtmlLink>
          </Link>
        </Box>
      </Box>
  )
}