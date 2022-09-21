import { InvoiceFromDB } from "../../interfaces/invoice";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import HtmlLink from "@mui/material/Link";
import format from "date-fns/format";
import React from "react";

interface InvoiceProps {
  invoice? : InvoiceFromDB;
}

export const Invoice = ({ invoice } : InvoiceProps) => {
  return (
      <Box>
        <Typography variant="h6" sx={{ marginBottom: "0.5rem" }}>
          Счет:
        </Typography>
        {invoice && <Box>
          <Typography>Счет № {invoice.number}</Typography>
          {invoice.linkToFile
              && <Typography>
                <HtmlLink href={invoice.linkToFile}>
                  Ссылка на документ на Google Disk
                </HtmlLink>
              </Typography>
          }
          <Typography>Статус: {invoice.status ? invoice.status : "Не добавлен"}</Typography>
          {invoice.due &&
              <Typography>
                Оплатить до: {format(new Date(invoice.due), 'dd/MM/yyyy')}
              </Typography>
          }
        </Box>}
        {!invoice && <Box>Счет не добавлен</Box>}
      </Box>
  )
}