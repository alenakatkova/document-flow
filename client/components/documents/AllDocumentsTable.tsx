import { Doc } from "../../utils/formDocumentsList";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Link from "next/link";
import HtmlLink from "@mui/material/Link";
import { TYPES } from "../../utils/constants";
import React from "react";

interface AllDocumentsFormProps {
  documents : Doc[];
}

export const AllDocumentsTable = ({ documents } : AllDocumentsFormProps) => {
  return (
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Приоритет</TableCell>
              <TableCell>Документ</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Родительский документ</TableCell>
              <TableCell>Контрагенты</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map(doc => (
                <TableRow
                    key={JSON.stringify(doc)}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{doc.isPriority ? "Высокий" : "Низкий"}</TableCell>
                  <TableCell>
                    {doc.type !== "invoice"
                        ? <Link href={doc.link}>
                          <HtmlLink
                              sx={{ cursor: "pointer" }}>{TYPES[doc.type]} {doc.number === "Нет номера" ? "" : "№" + doc.number}</HtmlLink>
                        </Link>
                        : <div>{TYPES[doc.type]} {doc.number === "Нет номера" ? "" : "№" + doc.number}</div>}
                  </TableCell>
                  <TableCell>{doc.status}</TableCell>
                  <TableCell>
                    {doc.parentDocumentLink && <Link href={doc.parentDocumentLink}>
                      <HtmlLink sx={{ cursor: "pointer" }}>{doc.parentDocumentName}</HtmlLink>
                    </Link>}
                  </TableCell>
                  <TableCell>
                    {doc.counterpartyLink && <Link href={doc.counterpartyLink}>
                      <HtmlLink sx={{ cursor: "pointer" }}>{doc.counterpartyName}</HtmlLink>
                    </Link>}
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  )
}
const docTypeOptions = [
  {
    label: "Договор",
    value: "contract",
    id: 0
  },
  {
    label: "Счет",
    value: "invoice",
    id: 1
  },
  {
    label: "Дополнительное соглашение",
    value: "agreement",
    id: 2
  },
  {
    label: "Все",
    value: "all",
    id: 3
  }
];