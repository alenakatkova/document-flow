import React from "react";
import Box from "@mui/material/Box";
import { CARD } from "../../styles/constants";
import { Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import format from "date-fns/format";
import { ContactFromDB } from "../../interfaces/contact";
import { AddCounterpartyContactForm } from "./AddCounterpartyContactForm";
import { deleteContact } from "../../api/contact";

interface CounterpartyContactsBigBlockProps {
  isLoading : boolean;
  contacts : ContactFromDB[] | undefined;
}

const CounterpartyContactsBigBlock = ({ isLoading, contacts } : CounterpartyContactsBigBlockProps) => {
  const [ isFormOpen, setIsFormOpen ] = React.useState(false);
  // const [idOfContactToEdit, setIdOfContactToEdit] = React.useState<null|number>(null);

  const toggleFormOpen = () => {
    setIsFormOpen(!isFormOpen);
  };

  const onDeleteButtonClick = async (contactId : number) => {
    await deleteContact(contactId);
  }

  return (
      <>
        <Box sx={CARD}>
          <Typography variant="h6" sx={{ marginBottom: "1rem" }}>Контакты</Typography>
          {isLoading || (contacts === undefined) || (contacts.length === 0)
              ? ""
              : (
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>ФИО</TableCell>
                          <TableCell align="center">Должность</TableCell>
                          <TableCell align="center">Телефон</TableCell>
                          <TableCell align="center">Почта</TableCell>
                          <TableCell align="center">День рождения</TableCell>
                          <TableCell align="center">Действия</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {contacts?.map((contact) => (
                            <TableRow
                                key={"contact" + contact.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {contact.name}
                              </TableCell>
                              <TableCell align="center">{contact.job}</TableCell>
                              <TableCell align="center">{contact.phone}</TableCell>
                              <TableCell align="center">{contact.email}</TableCell>
                              <TableCell align="center">
                                {contact.birthday && format(new Date(contact.birthday), 'dd/MM/yyyy')}
                              </TableCell>
                              <TableCell align="center">
                                {/*<Button onClick={editContact}>Редактировать</Button>*/}
                                <Button onClick={() => onDeleteButtonClick(contact.id)}>Удалить</Button>
                              </TableCell>
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
              )
          }
          {isFormOpen
              ? <AddCounterpartyContactForm closeForm={toggleFormOpen} />
              : <Button variant="contained" sx={{ marginTop: "1rem" }} onClick={toggleFormOpen}>
                Добавить контактное лицо
              </Button>
          }
        </Box>
      </>
  )
}

export default CounterpartyContactsBigBlock;

