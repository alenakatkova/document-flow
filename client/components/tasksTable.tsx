import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Link from "next/link";
import HtmlLink from "@mui/material/Link";
import React from "react";
import { Doc } from "../utils/formDocumentsList";
import { TYPES } from "../utils/constants";

interface TasksTableProps {
  documents : Doc[];
}

export const TasksTable = ({ documents } : TasksTableProps) => {
  return (
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Документ</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Родительский документ</TableCell>
              <TableCell>Контрагент</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map(task => (
                <TableRow
                    key={task.type + task.number}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    {task.type !== "invoice"
                        ? <Link href={task.link}>
                          <HtmlLink
                              sx={{ cursor: "pointer" }}>{TYPES[task.type]} {task.number === "Нет номера" ? "" : "№" + task.number}</HtmlLink>
                        </Link>
                        : <div>{TYPES[task.type]} {task.number === "Нет номера" ? "" : "№" + task.number}</div>}
                  </TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>
                    {task.parentDocumentLink && <Link href={task.parentDocumentLink}>
                      <HtmlLink sx={{ cursor: "pointer" }}>{task.parentDocumentName}</HtmlLink>
                    </Link>}
                  </TableCell>
                  <TableCell>
                    {task.counterpartyLink && <Link href={task.counterpartyLink}>
                      <HtmlLink sx={{ cursor: "pointer" }}>{task.counterpartyName}</HtmlLink>
                    </Link>}
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  )
}